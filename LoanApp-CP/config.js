const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  apiKey: process.env.API_Key,
  Scoring_url:process.env.Scoring_url,
  mongoDb_url:process.env.mongoDb_url,
  Broker_list:process.env.broker_list,
  Kafka_Api_key:process.env.kafka_Api_key,
  Topic_name:process.env.topic_name
};