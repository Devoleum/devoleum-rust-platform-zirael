use bson::serde_helpers::chrono_datetime_as_bson_datetime;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    #[serde(rename = "_id")]
    pub id: bson::oid::ObjectId,
    pub isAdmin: bool,
    pub uri: String,
    pub name: String,
    pub email: String,
    pub password: String,
    #[serde(with = "chrono_datetime_as_bson_datetime")]
    pub created_at: DateTime<Utc>,
    #[serde(with = "chrono_datetime_as_bson_datetime")]
    pub updated_at: DateTime<Utc>,
    #[serde(rename = "__v")]
    pub v: i64,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Register {
    pub name: String,
    pub isAdmin: bool,
    pub email: String,
    pub password: String,
    pub uri: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    #[serde(rename = "_id")]
    pub id: bson::oid::ObjectId,
    pub isAdmin: bool,
    pub sub: String,
    pub exp: usize,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Login {
    pub email: String,
    pub password: String,
    #[serde(default)]
    pub remember_me: bool,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct FoundUserResponse {
    #[serde(rename = "_id")]
    pub id: bson::oid::ObjectId,
    pub email: String,
    pub password: String,
    pub isAdmin: bool,
}

#[derive(Deserialize)]
pub struct Token {
    pub token: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GetOwner {
    pub user: bson::oid::ObjectId,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct LoginUpdate {
    pub email: String,
    pub password: String,
    pub uri: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct MerchantUri {
    pub uri: String,
}
