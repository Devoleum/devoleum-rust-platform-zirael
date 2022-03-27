use actix_web::{get, post, web, HttpResponse};
use crate::middlewares::auth::AuthorizationService;

use crate::models::{histories::History};
use mongodb::{bson::doc, Client, Collection};
const DB_NAME: &str = "devoleumdb";

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("api/histories")
        .service(get_public_histories)
        .service(get_history_by_id)
        .service(get_histories_by_merchant)
    );
}

#[get("/public")]
async fn get_public_histories(client: web::Data<Client>) -> HttpResponse {
    use futures_util::StreamExt;
    let collection: Collection<History> = client.database(DB_NAME).collection("histories");
    let mut cursor = collection.find(doc! {"public": true}, None).await.unwrap();
    let mut results = Vec::new();
    while let Some(result) = cursor.next().await {
        match result {
            Ok(document) => {
                results.push(document);
            }
            _ => {
                return HttpResponse::InternalServerError().finish();
            }
        }
    }
    HttpResponse::Ok().json(results)
}

#[get("/{id}")]
async fn get_history_by_id(client: web::Data<Client>, id: web::Path<String>) -> HttpResponse {
    let id = id.into_inner();
    let collection: Collection<History> = client.database(DB_NAME).collection("histories");
    match collection
        .find_one(
            doc! { "_id": bson::oid::ObjectId::parse_str(&id).unwrap() },
            None,
        )
        .await
    {
        Ok(Some(result)) => HttpResponse::Ok().json(result),
        Ok(None) => HttpResponse::NotFound().body(format!("No user found with id {}", id)),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[get("/merchant/{id}")]
async fn get_histories_by_merchant(client: web::Data<Client>, id: web::Path<String>) -> HttpResponse {
    use futures_util::StreamExt;
    let id = id.into_inner();
    let collection: Collection<History> = client.database(DB_NAME).collection("histories");
    let mut cursor = collection.find(doc! {"user": bson::oid::ObjectId::parse_str(&id).unwrap()}, None).await.unwrap();
    let mut results = Vec::new();
    while let Some(result) = cursor.next().await {
        match result {
            Ok(document) => {
                results.push(document);
            }
            _ => {
                return HttpResponse::InternalServerError().finish();
            }
        }
    }
    HttpResponse::Ok().json(results)
}

/* #[post("/histories")]
async fn user_informations(_req: AuthorizationService, hist: web::Json<History>, client: web::Data<Client>) -> HttpResponse {
    let collection: Collection<Document> = client.database(DB_NAME).collection("histories");
    let _ex = collection.insert_one(doc! {"isAdmin:": false, "uri": hist.uri, "name": user.name, "email": user.email, "password": hash_pw,  "createdAt": Utc::now().to_string(), "updatedAt": Utc::now().to_string(), "__v": "0"}, None);
    HttpResponse::Ok().json("success")
} */