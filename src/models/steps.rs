use serde::{Deserialize, Serialize};

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Step {
    #[serde(rename = "_id")]
    pub id: Id,
    pub public: Option<bool>,
    pub featured: Option<bool>,
    #[serde(rename = "main_eth_notarization")]
    pub main_eth_notarization: Option<String>,
    #[serde(rename = "test_algo_notarization")]
    pub test_algo_notarization: Option<String>,
    #[serde(rename = "bitcoin_notarization")]
    pub bitcoin_notarization: Option<String>,
    pub user: User,
    pub name: String,
    pub uri: Option<String>,
    pub randomize_proof: Option<String>,
    #[serde(rename = "historyId")]
    pub history_id: Option<HistoryId>,
    pub created_at: Option<CreatedAt>,
    pub updated_at: Option<UpdatedAt>,
    #[serde(rename = "__v")]
    pub v: i64,
    pub hash: String,
    #[serde(rename = "test_eth_notarization")]
    pub test_eth_notarization: Option<String>,
    #[serde(rename = "main_algo_notarization")]
    pub main_algo_notarization: Option<String>,
    #[serde(rename = "polygon_matic_notarization")]
    pub polygon_matic_notarization: Option<String>,
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
pub struct HistoryId {
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
