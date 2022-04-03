pub trait IConfig {
    fn get_config_with_key(&self, key: &str) -> String;
}

pub struct Config {}

impl IConfig for Config {
    fn get_config_with_key(&self, key: &str) -> String {
        dotenv::var(key).unwrap()
    }
}
