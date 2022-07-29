use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Step {
    #[serde(rename = "_id")]
    pub id: bson::oid::ObjectId,
    pub user: bson::oid::ObjectId,
    pub public: bool,
    pub featured: bool,
    #[serde(rename = "main_eth_notarization")]
    pub main_eth_notarization: String,
    #[serde(rename = "test_algo_notarization")]
    pub test_algo_notarization: String,
    #[serde(rename = "bitcoin_notarization")]
    pub bitcoin_notarization: String,
    pub name: String,
    pub uri: String,
    pub randomizeProof: String,
    #[serde(rename = "historyId")]
    pub history_id: bson::oid::ObjectId,
    #[serde(with = "bson::serde_helpers::chrono_datetime_as_bson_datetime")]
    pub createdAt: DateTime<Utc>,
    #[serde(with = "bson::serde_helpers::chrono_datetime_as_bson_datetime")]
    pub updatedAt: DateTime<Utc>,
    #[serde(rename = "__v")]
    pub v: i64,
    pub hash: String,
    #[serde(rename = "test_eth_notarization")]
    pub test_eth_notarization: String,
    #[serde(rename = "main_algo_notarization")]
    pub main_algo_notarization: String,
    #[serde(rename = "polygon_matic_notarization")]
    pub polygon_matic_notarization: String,
    #[serde(rename = "polygon_matic_v2_notarization")]
    pub polygon_matic_v2_notarization: String,
    #[serde(rename = "sepolia_test_eth_notarization")]
    pub sepolia_test_eth_notarization: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct PostStep {
    pub public: bool,
    pub randomizeProof: String,
    pub featured: bool,
    pub name: String,
    pub uri: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct NotarizeStep {
    pub txurl: String,
    pub hash: String,
    pub chain_name: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ListSteps {
    #[serde(rename = "_id")]
    pub id: bson::oid::ObjectId,
    pub user: bson::oid::ObjectId,
    pub name: String,
    pub uri: String,
    #[serde(rename = "historyId")]
    pub history_id: bson::oid::ObjectId,
    pub randomizeProof: String,
    #[serde(rename = "test_eth_notarization")]
    pub test_eth_notarization: String,
    #[serde(rename = "polygon_matic_notarization")]
    pub polygon_matic_notarization: String,
    #[serde(rename = "polygon_matic_v2_notarization")]
    pub polygon_matic_v2_notarization: String,
    #[serde(rename = "sepolia_test_eth_notarization")]
    pub sepolia_test_eth_notarization: String,
}
