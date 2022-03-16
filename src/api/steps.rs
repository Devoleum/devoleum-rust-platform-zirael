use actix_web::{get, post, web, App, HttpResponse, HttpServer};
use crate::models::{histories::History, users::User, steps::Step};
use mongodb::{bson::doc, Client, Collection};
const DB_NAME: &str = "devoleumdb";

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("api")
        .service(get_step_by_id)
        .service(get_steps_by_historyid)
    );
}

#[get("/steps/{id}")]
async fn get_step_by_id(client: web::Data<Client>, id: web::Path<String>) -> HttpResponse {
    let id = id.into_inner();
    let collection: Collection<Step> = client.database(DB_NAME).collection("steps");
    match collection
        .find_one(
            doc! { "_id": bson::oid::ObjectId::parse_str(&id).unwrap() },
            None,
        )
        .await
    {
        Ok(Some(result)) => HttpResponse::Ok().json(result),
        Ok(None) => HttpResponse::NotFound().body(format!("No step found with id {}", id)),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[get("/history/{historyId}/steps")]
async fn get_steps_by_historyid(client: web::Data<Client>, historyId: web::Path<String>) -> HttpResponse {
    use futures_util::StreamExt;
    let historyId = historyId.into_inner();
    let collection: Collection<Step> = client.database(DB_NAME).collection("steps");
    let mut cursor = collection.find(doc! {"historyId": bson::oid::ObjectId::parse_str(&historyId).unwrap() }, None).await.unwrap();
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
