mod models;
use actix_cors::Cors;
use actix_files::Files;
use actix_web::{get, post, web, App, HttpResponse, HttpServer};
use models::{histories::History, users::User};
use mongodb::{bson::doc, options::IndexOptions, Client, Collection, IndexModel};

const DB_NAME: &str = "devoleumdb";

/// Gets the merchant with the supplied id.
#[get("/api/users/merchant/{id}")]
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
        Ok(None) => HttpResponse::NotFound().body(format!("No user found with id {}", id)),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

/// Gets the merchant with the supplied id.
#[get("/api/histories/public")]
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

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let uri = std::env::var("MONGODB_URI").unwrap_or_else(|_| "mongodb://localhost:27017".into());

    let client = Client::with_uri_str(uri).await.expect("failed to connect");
    HttpServer::new(move || {
        let cors = Cors::permissive()
            .allow_any_origin()
            .allow_any_header()
            .allow_any_method();
        println!("Starting server");

        App::new()
            .app_data(web::Data::new(client.clone()))
            .wrap(cors)
            .service(get_merchant)
            .service(get_public_histories)
            .service(
                Files::new("/", "./frontend/build/")
                    .index_file("index.html")
                    .show_files_listing(),
            )
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
