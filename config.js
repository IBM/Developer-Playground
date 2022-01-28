const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  apiKey: process.env.API_KEY,
  Scoring_url:process.env.Scoring_url,
};