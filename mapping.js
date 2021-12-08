
// const stt = require('./speechtotext.json');
const wa = require('./watsonassistant.json');
const preurl = require('./previewurl.json');
// const wd = require('./watsondiscovery.json');

var axios = require('axios');
var data = JSON.stringify({
  "key": "APP_CONFIG",
  "output": {
    "WATSON_ASSISTANT": {
      "API_KEY": wa.apikey,
      "URL": wa.url,
      "ASSISTANTS": [
        {
          "name": "REPLACE_WITH_ASSISTANT_NAME",
          "id": "REPLACE_WITH_ASSISTANT_ID",
          "default": true
        }
      ]
    },
    "WATSON_DISCOVERY": {
      "ENABLE": false
    },
    // "WATSON_STT_API_KEY": stt.apikey ,
    "ENABLE_SLACK": true,
    "ENABLE_MS_BOT": false
  }
});

var config = {
  method: 'post',
  url: preurl.url+'api/Mappings',
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});