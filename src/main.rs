mod api;
mod config;
mod middlewares;
mod models;
use actix_cors::Cors;
use actix_files::Files;
use actix_web::{web, App, HttpServer};
use api::{histories, steps, users};
use mongodb::Client;
extern crate dotenv;
use std::env;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let uri = std::env::var("MONGODB_URI").unwrap_or_else(|_| "mongodb://localhost:27017".into());

    dotenv::dotenv().expect("Failed to read env ");
    let PORT = std::env::var("PORT")
        .unwrap_or_else(|_| "8000".to_string())
        .parse()
        .expect("PORT must be a number");

    println!("Starting server port: {}", PORT);

    let client = Client::with_uri_str(uri).await.expect("failed to connect");
    HttpServer::new(move || {
        let cors = Cors::permissive()
            .allow_any_origin()
            .allow_any_header()
            .allow_any_method();

        App::new()
            .app_data(web::Data::new(client.clone()))
            .wrap(cors)
            .configure(api::users::config)
            .configure(api::histories::config)
            .configure(api::steps::config)
            .service(
                Files::new("/", "./frontend/dist/apps/webapp/")
                    .index_file("index.html")
                    .show_files_listing(),
            )
    })
    .bind(("0.0.0.0", PORT))?
    .run()
    .await
}
