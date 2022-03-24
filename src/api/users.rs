use actix_web::{get, post, web, App, HttpResponse, HttpServer};
use mongodb::{bson::doc, Client, Collection,  error::Error, bson::Document};
use crate::models::response::{LoginResponse, Response};
use crate::models::users::{Claims, Login, Register, User};
use chrono::{DateTime, Duration, Utc};
use crypto::digest::Digest;
use crypto::sha2::Sha256;
use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};

const DB_NAME: &str = "devoleumdb";

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("api/users")
        .service(get_merchant)
        .service(register_controller)
    );
}

async fn find_user_with_email(client: web::Data<Client>, email: String) -> Result<Option<User>, Error> {
    let collection: Collection<Document> = client.database(DB_NAME).collection("users");
    let cursor =
    collection
        .find_one(doc! {"email": email}, None)
        .await;
    match cursor {
        Ok(Some(doc)) => match bson::from_bson(bson::Bson::Document(doc)) {
            Ok(model) => Ok(model),
            Err(e) => Err(Error::from(e)),
        },
        Ok(None) => Ok(None),
        Err(err) => Err(Error::from(err)),
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
    let _exist = find_user_with_email(client, (&user.email).parse().unwrap())
        .await;
    match _exist {
        Ok(Some(_)) => {
            HttpResponse::Ok().json("This e-mail is using by some user, please enter another e-mail.")
        }
        Ok(None) => {
            let mut sha = Sha256::new();
            sha.input_str(user.password.as_str());
            let hash_pw = sha.result_str();
            let _ex = collection.insert_one(doc! {"name": user.name, "email": user.email, "password": hash_pw, "isAdmin:": false}, None);
            match _ex.await {
                Ok(_) =>HttpResponse::Ok().json("success"),
                Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
            }
        }
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}