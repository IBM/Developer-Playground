const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  apiKey: process.env.API_Key,
  Scoring_url:process.env.Scoring_url,
  mongoDb_url:process.env.mongoDb_url,
  host_name:process.env.host_name,
  user_name:process.env.user_name,
  password:process.env.api_key_mq,
  queue_manager_name:process.env.queue_manager_name,
};