use serde::{Deserialize, Serialize};

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct User {
    #[serde(rename = "_id")]
    pub id: bson::oid::ObjectId,
    pub is_admin: bool,
    pub uri: String,
    pub name: String,
    pub email: String,
    pub password: String,
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
pub struct CreatedAt {
    #[serde(rename = "$date")]
    pub date: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct UpdatedAt {
    #[serde(rename = "$date")]
    pub date: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Register {
    pub name: String,
    pub isAdmin: bool,
    pub email: String,
    pub password: String,
    pub uri: String
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
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

#[derive(Deserialize)]
pub struct Token {
    pub token: String,
}
