mod api;
mod config;
mod middlewares;
mod models;
use actix_cors::Cors;
use actix_files::{Files, NamedFile};
use actix_web::dev::{ServiceRequest, ServiceResponse};
use actix_web::{web, App, HttpServer};
use mongodb::Client;
extern crate dotenv;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let uri = std::env::var("MONGODB_URI").unwrap_or_else(|_| "mongodb://localhost:27017".into());

    let port = std::env::var("PORT")
        .unwrap_or_else(|_| "8000".to_string())
        .parse()
        .expect("PORT must be a number");

    println!("Starting server port: {}", port);

    let client = Client::with_uri_str(uri).await.expect("failed to connect");
    HttpServer::new(move || {
        let cors = Cors::permissive()
            .allow_any_origin()
            .allow_any_header()
            .allow_any_method();
        let api_controller = actix_web::web::scope("/api")
            .configure(api::users::config)
            .configure(api::histories::config)
            .configure(api::steps::config);
        App::new()
            .app_data(web::Data::new(client.clone()))
            .wrap(cors)
            .service(api_controller)
            .service(
                Files::new("/", "./dist/apps/webapp/")
                    .index_file("index.html")
                    .default_handler(|req: ServiceRequest| {
                        let (http_req, _payload) = req.into_parts();
                        async {
                            let response = NamedFile::open("./dist/apps/webapp/index.html")?
                                .into_response(&http_req);
                            Ok(ServiceResponse::new(http_req, response))
                        }
                    }),
            )
    })
    //actix_files::NamedFile::open("dist/apps/webapp/index.html")
    .bind(("0.0.0.0", port))?
    .run()
    .await
}
