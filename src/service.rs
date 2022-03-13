use mongodb::{error::Error, results::InsertOneResult, sync::Collection, sync::Cursor};

#[derive(Clone)]
pub struct UserService {
    collection: mongodb::sync::Collection<bson::Document>,
}

impl UserService {
    pub fn new(collection: Collection<bson::Document>) -> UserService {
        UserService { collection }
    }

    pub fn create(&self, name: &str) -> Result<InsertOneResult, Error> {
        self.collection.insert_one(bson::doc! {"name": name}, None)
    }

    pub fn get(&self) -> Result<Cursor<bson::Document>, Error> {
        self.collection.find(bson::doc! {"public": true}, None).try_collect()
    }
}
