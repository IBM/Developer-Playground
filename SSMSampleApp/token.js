const request = require('request');
require('dotenv/config');
const fs = require('fs');

function generateToken() {
    
    var cli_id = process.env.REACT_APP_CLIENT_ID;
    var cli_sec = process.env.REACT_APP_CLIENT_SECRET;

    const basicAuth = Buffer.from(`${cli_id}:${cli_sec}`).toString('base64');
    const options = {
      method: 'POST',
      url: 'https://api.ibm.com/scx/sbs_orgaccess/oauth2/token',
      headers: {
        'Authorization': `Basic ${basicAuth}`,

      },
      form: {
        'grant_type': 'password',
        'scope': '/sbs_orgaccess',
        'username': process.env.REACT_APP_USERNAME,
        'password': process.env.REACT_APP_PASSWORD
      }
    };

  request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const jsonData = JSON.parse(body.toString());
      const au = `Bearer ${jsonData.access_token}`;
      fs.writeFile('src/components/auth.txt', au, function (err) {
        if (err) return console.log(err);
         });
    });
}

generateToken();