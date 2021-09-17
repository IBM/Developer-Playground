const request = require('request');
const OAuth = require('oauth-1.0a')
const crypto = require('crypto'); 

const fs = require('fs');
require('dotenv').config()


function generateToken() {
  const oauth = OAuth({
      consumer: {
          key: process.env.REACT_APP_CLIENT_ID,
          secret: process.env.REACT_APP_CLIENT_SECRET,
      },
      signature_method: 'HMAC-SHA256',
      hash_function(base_string, key) {
          return crypto
              .createHmac('sha256', key)
              .update(base_string)
              .digest('base64')
      },
  });
  const request_data = {
      url: 'https://account.api.here.com/oauth2/token',
      method: 'POST',
      data: { grant_type: 'client_credentials' },
  };

  request(
      {
          url: request_data.url,
          method: request_data.method,
          form: request_data.data,
          headers: oauth.toHeader(oauth.authorize(request_data)),
      },
      function (error, response, body) {

          if (response.statusCode === 200) {
            let result = JSON.parse(response.body);
            let auth = 'Bearer '.concat(result["access_token"].toString());

            fs.writeFile('src/components/auth.txt', auth, function (err) {
                if (err) return console.log(err);
                });

            //console.log(auth);
              
          }
      }
  );

}

generateToken();

    
