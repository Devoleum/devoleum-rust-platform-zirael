use actix_files::Files;

mod controller;
mod service;


pub struct ServiceContainer {
    user: service::UserService,
}

impl ServiceContainer {
    pub fn new(user: service::UserService) -> Self {
        ServiceContainer { user }
    }
}

pub struct AppState {
    service_container: ServiceContainer,
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{web, App, HttpServer};

    let client_options =
        mongodb::options::ClientOptions::parse("mongodb://localhost:27017").unwrap();
    let client = mongodb::sync::Client::with_options(client_options).unwrap();
    let db = client.database("devoleumdb");

    let histories = db.collection("histories");

    HttpServer::new(move || {
        let service_container =
            ServiceContainer::new(service::UserService::new(histories.clone()));

        App::new()
            .data(AppState { service_container })
            .route("/api/histories/public", web::get().to(controller::get))
            .service(Files::new("/", "./frontend/build/").index_file("index.html").show_files_listing())
    })
    .bind("0.0.0.0:3000")?
    .run()
    .await
}
