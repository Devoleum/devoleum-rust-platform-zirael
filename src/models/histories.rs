use serde::{Deserialize, Serialize};

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct History {
    pub public: bool,
    pub featured: Option<bool>,
    pub rating: i64,
    pub num_reviews: Option<i64>,
    #[serde(rename = "_id")]
    pub id: bson::oid::ObjectId,
    pub user: bson::oid::ObjectId,
    pub name: String,
    pub uri: String,
    pub category: String,
    pub created_at: Option<String>,
    pub updated_at: Option<String>,
    #[serde(rename = "__v")]
    pub v: i64,
}