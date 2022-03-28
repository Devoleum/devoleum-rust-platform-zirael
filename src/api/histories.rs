use crate::middlewares::auth::AuthorizationService;
use crate::models::histories::{History, PostHistory};
use actix_web::{get, post, put, web, HttpResponse, Error};
use chrono::{DateTime, Duration, Utc};
use mongodb::{bson::doc, bson::Document, Client, Collection};
use futures::future::{err, ok, Ready};

const DB_NAME: &str = "devoleumdb";

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("api/histories")
            .service(get_public_histories)
            .service(get_history_by_id)
            .service(get_histories_by_merchant)
            .service(create_history)
            .service(update_history),
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

async fn get_history_by_id_controller(
    client: &web::Data<Client>,
    id: &String,
) -> Result<History, String> {
    let id = id;
    let collection: Collection<History> = client.database(DB_NAME).collection("histories");
    match collection
        .find_one(doc! {"_id": bson::oid::ObjectId::parse_str(&id).unwrap()}, None)
        .await
    {     
        Ok(Some(history)) => Ok(history),
        Ok(None) => Err("not found".to_string()),
        Err(err) => Err(err.to_string()),
    }
}

#[get("/{id}")]
async fn get_history_by_id(client: web::Data<Client>, id: web::Path<String>) -> HttpResponse {
    let id = id.into_inner();
    get_history_by_id_controller(&client, &id).await.map(|history| HttpResponse::Ok().json(history))
        .unwrap_or_else(|err| HttpResponse::InternalServerError().body(err))
}

#[get("/merchant/{id}")]
async fn get_histories_by_merchant(
    client: web::Data<Client>,
    id: web::Path<String>,
) -> HttpResponse {
    use futures_util::StreamExt;
    let id = id.into_inner();
    let collection: Collection<History> = client.database(DB_NAME).collection("histories");
    let mut cursor = collection
        .find(
            doc! {"user": bson::oid::ObjectId::parse_str(&id).unwrap()},
            None,
        )
        .await
        .unwrap();
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

#[post("/")]
async fn create_history(
    _req: AuthorizationService,
    hist: web::Json<PostHistory>,
    client: web::Data<Client>,
) -> HttpResponse {
    let collection: Collection<Document> = client.database(DB_NAME).collection("histories");
    let _ex = collection.insert_one(doc! {"public": false, "featured": false, "user": bson::oid::ObjectId::parse_str(_req.user).unwrap(), "uri": hist.uri.to_string(), "name": hist.name.to_string(), "category": hist.category.to_string(),  "createdAt": Utc::now().to_string(), "updatedAt": Utc::now().to_string(), "__v": "0"}, None);
    match _ex.await {
        Ok(_) => HttpResponse::Ok().json("success create_history"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}


#[put("/{id}")]
async fn update_history(
    _req: AuthorizationService,
    hist: web::Json<PostHistory>,
    client: web::Data<Client>,
    id: web::Path<String>
) -> HttpResponse {
    let id = id.into_inner();
    let user_id = bson::oid::ObjectId::parse_str(_req.user).unwrap();
    let user_id_from_history = get_history_by_id_controller(&client, &id).await.unwrap().user;
    if user_id != user_id_from_history {
        return HttpResponse::Unauthorized().finish();
    }
    let collection: Collection<Document> = client.database(DB_NAME).collection("histories");
    let obj_update = doc! {
        "$set": {
            "public": hist.public,
            "featured": hist.featured,
            "uri": hist.uri.to_string(),
            "category": hist.category.to_string(),
            "name": hist.name.to_string(),
            "updatedAt": Utc::now().to_string(),
        }
    };
    
    let _ex = collection.update_one(doc! { "_id": bson::oid::ObjectId::parse_str(&id).unwrap() }, obj_update, None);
    match _ex.await {
        Ok(_) => HttpResponse::Ok().json("success update_history"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}
