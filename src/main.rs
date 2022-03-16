mod api;
mod models;

use actix_cors::Cors;
use actix_files::Files;
use actix_web::{web, App, HttpServer};
use api::{histories, steps, users};
use mongodb::Client;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let uri = std::env::var("MONGODB_URI").unwrap_or_else(|_| "mongodb://localhost:27017".into());
    
    let PORT = std::env::var("PORT")
        .unwrap_or_else(|_| "8080".to_string())
        .parse()
        .expect("PORT must be a number");

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
            //.service(get_merchant)
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
