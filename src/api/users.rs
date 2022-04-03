use crate::config::{Config, IConfig};
use crate::middlewares::auth::AuthorizationService;
use crate::models::response::LoginResponse;
use crate::models::users::{Claims, FoundUserResponse, Login, LoginUpdate, MerchantUri, Register};
use actix_web::{get, post, put, web, HttpResponse};
use chrono::{DateTime, Duration, Utc};
use jsonwebtoken::{encode, EncodingKey, Header};
use mongodb::{bson::doc, bson::Document, Client, Collection};

const DB_NAME: &str = "devoleumdb";

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("api/users")
            .service(get_merchant)
            .service(login)
            .service(register_controller)
            .service(update_user)
            .service(protected),
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
    let collection: Collection<MerchantUri> = client.database(DB_NAME).collection("users");
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

use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};

#[post("/")]
async fn register_controller(user: web::Json<Register>, client: web::Data<Client>) -> HttpResponse {
    let user = user.into_inner();
    let collection: Collection<Document> = client.database(DB_NAME).collection("users");
    let _exist = find_user_with_email(client, (&user.email).parse().unwrap()).await;
    match _exist {
        Ok(Some(_)) => HttpResponse::Ok()
            .json("This e-mail is using by some user, please enter another e-mail."),
        Ok(None) => {
            let salt = SaltString::generate(&mut OsRng);
            let argon2 = Argon2::default();
            let password_hash: PasswordHash = argon2
                .hash_password(&user.password.as_bytes(), &salt)
                .unwrap();
            let _ex = collection.insert_one(doc! {"isAdmin": false, "uri": user.uri, "name": user.name, "email": user.email, "password": password_hash.to_string(),  "createdAt": Utc::now().to_string(), "updatedAt": Utc::now().to_string(), "__v": "0"}, None);
            match _ex.await {
                Ok(_) => HttpResponse::Ok().json("success"),
                Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
            }
        }
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

fn verify(password: &str, hash: &str) -> bool {
    let parsed = PasswordHash::new(&hash);
    if parsed.is_err() {
        return false;
    }
    Argon2::default()
        .verify_password(password.as_bytes(), &parsed.unwrap())
        .is_ok()
}

#[post("/login")]
async fn login(user: web::Json<Login>, client: web::Data<Client>) -> HttpResponse {
    println!("Starting login");

    match find_user_with_email(client, user.email.to_string()).await {
        Ok(Some(x)) => {
            if verify(&user.password, &x.password) {
                let mut _date: DateTime<Utc>;
                let _config: Config = Config {};
                let _var = _config.get_config_with_key("SECRET_KEY");
                let key = _var.as_bytes();
                if !user.remember_me {
                    _date = Utc::now() + Duration::hours(1);
                } else {
                    _date = Utc::now() + Duration::days(365);
                }
                let claims = Claims {
                    id: x.id,
                    isAdmin: x.isAdmin,
                    sub: user.email.to_string(),
                    exp: _date.timestamp() as usize,
                };
                let token =
                    encode(&Header::default(), &claims, &EncodingKey::from_secret(key)).unwrap();
                HttpResponse::Ok().json(LoginResponse {
                    token: token,
                    status: true,
                    message: "Login success".to_string(),
                })
            } else {
                HttpResponse::Ok().json(LoginResponse {
                    message: "Login failed".to_string(),
                    status: false,
                    token: "".to_string(),
                })
            }
        }
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
        Ok(None) => HttpResponse::Ok().json("Invalid email"),
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
        let salt = SaltString::generate(&mut OsRng);
        let argon2 = Argon2::default();
        let password_hash: PasswordHash = argon2
            .hash_password(&user.password.as_bytes(), &salt)
            .unwrap();
        match collection
            .update_one(
                doc! { "_id": bson::oid::ObjectId::parse_str(&id).unwrap() },
                doc! {"$set": doc! {"password": password_hash.to_string(), "updatedAt": Utc::now()}},
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

#[get("/protected")]
async fn protected(_req: AuthorizationService, _data: web::Data<Client>) -> HttpResponse {
    HttpResponse::Ok().json("protected")
}
