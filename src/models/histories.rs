use serde::{Deserialize, Serialize};

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct History {
    #[serde(rename = "_id")]
    pub id: bson::oid::ObjectId,
    pub public: bool,
    pub featured: Option<bool>,
    pub rating: i64,
    pub num_reviews: Option<i64>,
    pub user: User,
    pub name: String,
    pub uri: String,
    pub category: String,
    pub reviews: Vec<String>,
    pub created_at: Option<CreatedAt>,
    pub updated_at: Option<UpdatedAt>,
    #[serde(rename = "__v")]
    pub v: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Id {
    #[serde(rename = "$oid")]
    pub oid: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct User {
    #[serde(rename = "$oid")]
    pub oid: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct CreatedAt {
    #[serde(rename = "$date")]
    pub date: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct UpdatedAt {
    #[serde(rename = "$date")]
    pub date: String,
}
