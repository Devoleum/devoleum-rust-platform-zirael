use actix_web::{get, post, web, App, HttpResponse, HttpServer};
use crate::models::{users::User};
use mongodb::{bson::doc, Client, Collection};
const DB_NAME: &str = "devoleumdb";

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("api/users/merchant")
        .service(get_merchant)
    );
}

#[get("/{id}")]
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