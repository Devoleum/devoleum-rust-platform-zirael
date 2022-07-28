use crate::middlewares::auth::AuthorizationService;
use crate::models::users::GetOwner;
use crate::models::{steps::ListSteps, steps::NotarizeStep, steps::PostStep};
use actix_web::{get, post, put, web, HttpResponse};
use chrono::Utc;
use mongodb::{bson::doc, bson::Document, Client, Collection};

const DB_NAME: &str = "devoleumdb";

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("api/steps")
            .service(get_step_by_id)
            .service(get_steps_by_historyid)
            .service(create_step)
            .service(update_step)
            .service(update_notarized_step),
    );
}

#[get("/{id}")]
async fn get_step_by_id(client: web::Data<Client>, id: web::Path<String>) -> HttpResponse {
    let id = id.into_inner();
    let collection: Collection<Document> = client.database(DB_NAME).collection("steps");
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

#[get("/history/{id}")]
async fn get_steps_by_historyid(client: web::Data<Client>, id: web::Path<String>) -> HttpResponse {
    use futures_util::StreamExt;
    let id = id.into_inner();
    let collection: Collection<ListSteps> = client.database(DB_NAME).collection("steps");
    let mut cursor = collection
        .find(
            doc! {"historyId": bson::oid::ObjectId::parse_str(&id).unwrap()},
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

async fn user_id_check(
    client: &web::Data<Client>,
    id: &String,
    coll_name: String,
) -> Result<String, String> {
    let id = id;
    let collection: Collection<GetOwner> = client.database(DB_NAME).collection(&coll_name);
    match collection
        .find_one(
            doc! {"_id": bson::oid::ObjectId::parse_str(&id).unwrap()},
            None,
        )
        .await
    {
        Ok(Some(step)) => Ok(step.user.to_string()),
        Ok(None) => Err("not found".to_string()),
        Err(err) => Err(err.to_string()),
    }
}

#[post("/history/{history_id}")]
async fn create_step(
    _req: AuthorizationService,
    step: web::Json<PostStep>,
    history_id: web::Path<String>,
    client: web::Data<Client>,
) -> HttpResponse {
    let history_id = history_id.into_inner();
    let user_id = bson::oid::ObjectId::parse_str(_req.user).unwrap();
    let user_id_from_history = user_id_check(&client, &history_id, "histories".to_string())
        .await
        .unwrap();
    if user_id.to_string() != user_id_from_history {
        return HttpResponse::Unauthorized().finish();
    }
    let collection: Collection<Document> = client.database(DB_NAME).collection("histories");
    let obj_update = doc! {
        "public": false,
        "featured": false,
        "randomizeProof": step.randomizeProof.to_string(),
        "user": bson::oid::ObjectId::parse_str(user_id.to_string()).unwrap(),
        "historyId": bson::oid::ObjectId::parse_str(history_id).unwrap(),
        "uri": step.uri.to_string(),
        "name": step.name.to_string(),
        "createdAt": Utc::now(),
        "updatedAt": Utc::now(),
         "__v": "0"
    };
    let _ex = collection.insert_one(obj_update, None);
    match _ex.await {
        Ok(_) => HttpResponse::Ok().json("success create_history"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[put("/{id}")]
async fn update_step(
    _req: AuthorizationService,
    step: web::Json<PostStep>,
    client: web::Data<Client>,
    id: web::Path<String>,
) -> HttpResponse {
    let id = id.into_inner();
    let user_id = bson::oid::ObjectId::parse_str(_req.user).unwrap();
    let user_id_from_history = user_id_check(&client, &id, "steps".to_string())
        .await
        .unwrap();
    println!(
        "Starting match: {} and {}",
        user_id_from_history,
        user_id.to_string()
    );
    if user_id.to_string() != user_id_from_history {
        return HttpResponse::Unauthorized().finish();
    }
    let collection: Collection<Document> = client.database(DB_NAME).collection("steps");
    let obj_update = doc! {
        "$set": {
            "public": step.public,
            "featured": step.featured,
            "randomizeProof": step.randomizeProof.to_string(),
            "uri": step.uri.to_string(),
            "name": step.name.to_string(),
            "updatedAt": Utc::now(),
        }
    };

    let _ex = collection.update_one(
        doc! { "_id": bson::oid::ObjectId::parse_str(&id).unwrap() },
        obj_update,
        None,
    );
    match _ex.await {
        Ok(_) => HttpResponse::Ok().json("success update_history"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[put("/evm/{id}")]
async fn update_notarized_step(
    _req: AuthorizationService,
    step: web::Json<NotarizeStep>,
    client: web::Data<Client>,
    id: web::Path<String>,
) -> HttpResponse {
    let id = id.into_inner();

    if _req.is_admin == false {
        println!("not admin you punk!");
        return HttpResponse::Unauthorized().finish();
    }

    let collection: Collection<Document> = client.database(DB_NAME).collection("steps");
    let obj_update = doc! {
        "$set": {
            "hash": step.hash.to_string(),
            step.chain_name.to_string(): step.txurl.to_string(),
            "updatedAt": Utc::now(),
        }
    };

    let _ex = collection.update_one(
        doc! { "_id": bson::oid::ObjectId::parse_str(&id).unwrap() },
        obj_update,
        None,
    );
    match _ex.await {
        Ok(_) => HttpResponse::Ok().json("success updated notarized step"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}
