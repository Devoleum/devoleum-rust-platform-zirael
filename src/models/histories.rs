use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

#[derive(Serialize, Deserialize, Debug)]
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
    #[serde(with = "bson::serde_helpers::chrono_datetime_as_bson_datetime")]
    pub createdAt: DateTime<Utc>,
    #[serde(with = "bson::serde_helpers::chrono_datetime_as_bson_datetime")]
    pub updatedAt: DateTime<Utc>,
    #[serde(rename = "__v")]
    pub v: i64,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct PostHistory {
    pub public: bool,
    pub featured: bool,
    pub name: String,
    pub uri: String,
    pub category: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GetHistory {
    #[serde(rename = "_id")]
    pub id: bson::oid::ObjectId,
    pub user: bson::oid::ObjectId,
}

