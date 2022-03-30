use crate::config::{Config, IConfig};
use crate::middlewares::auth::AuthorizationService;
use crate::models::response::{LoginResponse, Response};
use crate::models::users::{Claims, FoundUserResponse, Login, LoginUpdate, Register, Token, User};
use actix_web::{get, post, put, web, App, HttpResponse, HttpServer};
use blake2::{Blake2b512, Digest};
use chrono::{DateTime, Duration, Utc};
use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
use mongodb::{bson::doc, bson::Document, error::Error, Client, Collection};

const DB_NAME: &str = "devoleumdb";

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("api/users")
            .service(get_merchant)
            .service(login)
            .service(register_controller)
            .service(update_user),
    );
}

async fn find_user_with_email(
    client: web::Data<Client>,
    email: String,
) -> Result<Option<FoundUserResponse>, String> {
    let collection: Collection<FoundUserResponse> = client.database(DB_NAME).collection("users");
    match collection.find_one(doc! {"email": email}, None).await {
        Ok(Some(result)) => Ok(Some(result)),
        Ok(None) => Ok(None),
        Err(err) => Err(err.to_string()),
    }
}

#[get("/merchant/{id}")]
async fn get_merchant(client: web::Data<Client>, id: web::Path<String>) -> HttpResponse {
    let id = id.into_inner();
    let collection: Collection<User> = client.database(DB_NAME).collection("users");
    match collection
        .find_one(
            doc! { "_id": bson::oid::ObjectId::parse_str(&id).unwrap() },
            None,
        )
        .await
    {
        Ok(Some(user)) => HttpResponse::Ok().json(user.uri),
        Ok(None) => HttpResponse::NotFound().body(format!("No merchant found with id {}", id)),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[post("/")]
async fn register_controller(user: web::Json<Register>, client: web::Data<Client>) -> HttpResponse {
    let user = user.into_inner();
    let collection: Collection<Document> = client.database(DB_NAME).collection("users");
    let _exist = find_user_with_email(client, (&user.email).parse().unwrap()).await;
    match _exist {
        Ok(Some(_)) => HttpResponse::Ok()
            .json("This e-mail is using by some user, please enter another e-mail."),
        Ok(None) => {
            let mut hasher = Blake2b512::new();
            hasher.update(user.password.as_str());
            let hash_pw: String = format!("{:x}", hasher.finalize());
            let _ex = collection.insert_one(doc! {"isAdmin": false, "uri": user.uri, "name": user.name, "email": user.email, "password": hash_pw,  "createdAt": Utc::now().to_string(), "updatedAt": Utc::now().to_string(), "__v": "0"}, None);
            match _ex.await {
                Ok(_) => HttpResponse::Ok().json("success"),
                Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
            }
        }
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[post("/login")]
async fn login(user: web::Json<Login>, client: web::Data<Client>) -> HttpResponse {
    println!("Starting login");

    match find_user_with_email(client, user.email.to_string()).await {
        Ok(Some(x)) => {
            let mut hasher = Blake2b512::new();
            hasher.update(user.password.as_str());
            let hash_pw: String = format!("{:x}", hasher.finalize());
            println!("Starting login some");
            if x.password == hash_pw {
                // JWT
                let _config: Config = Config {};
                let _var = _config.get_config_with_key("SECRET_KEY");
                let key = _var.as_bytes();

                let mut _date: DateTime<Utc>;
                // Remember Me
                if !user.remember_me {
                    _date = Utc::now() + Duration::hours(1);
                } else {
                    _date = Utc::now() + Duration::days(365);
                }
                let my_claims = Claims {
                    id: x.id,
                    isAdmin: x.isAdmin,
                    sub: user.email.to_string(),
                    exp: _date.timestamp() as usize,
                };
                let token = encode(
                    &Header::default(),
                    &my_claims,
                    &EncodingKey::from_secret(key),
                )
                .unwrap();
                let obj = LoginResponse {
                    status: true,
                    token,
                    message: "You have successfully logged in.".to_string(),
                };
                HttpResponse::Ok().json(obj)
            } else {
                HttpResponse::InternalServerError().body("error")
            }
        }
        Ok(None) => HttpResponse::InternalServerError().body("not found"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string() + " error login"),
    }
}

#[put("/{id}")]
async fn update_user(
    client: web::Data<Client>,
    id: web::Path<String>,
    user: web::Json<LoginUpdate>,
    _req: AuthorizationService,
) -> HttpResponse {
    let id = id.into_inner();
    let collection: Collection<Document> = client.database(DB_NAME).collection("users");
    if user.password.is_empty() {
        match collection
            .update_one(
                doc! { "_id": bson::oid::ObjectId::parse_str(&id).unwrap() },
                doc! {"$set": doc! {"name": user.email.to_string(), "uri": user.uri.to_string() ,"updatedAt": Utc::now()}},
                None,
            )
            .await
        {
            Ok(_) => HttpResponse::Ok().json("success"),
            Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
        }
    } else if user.email.is_empty() && user.uri.is_empty() {
        let mut hasher = Blake2b512::new();
        hasher.update(user.password.as_str());
        let hash_pw: String = format!("{:x}", hasher.finalize());
        match collection
            .update_one(
                doc! { "_id": bson::oid::ObjectId::parse_str(&id).unwrap() },
                doc! {"$set": doc! {"password": hash_pw, "updatedAt": Utc::now()}},
                None,
            )
            .await
        {
            Ok(_) => HttpResponse::Ok().json("success"),
            Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
        }
    } else {
        HttpResponse::InternalServerError().body("bad request update user")
    }
}
