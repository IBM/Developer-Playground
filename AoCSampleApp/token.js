// const request = require('request');
const fs = require('fs');
const https = require('https');
const jwt = require('njwt');
const NodeCache = require("node-cache");
const myCache = new NodeCache();
require('dotenv').config()

function authService() {
  return new Promise(resolve => {

    let successtoken;
    let value = myCache.get("AuthKey");
    console.log("Start: Cache Value:", value);

    if (value === undefined) {

      const clientData = {
        id: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET,
        email: process.env.EMAIL,
        org: process.env.ORG,
        server: 'api.ibmaspera.com',
        scope: 'admin:all'
      };

      // Get current time in Seconds (nbf and exp take Seconds)
      const now = new Date().getTime() / 1000;
      const privateKey = fs.readFileSync('jwtRS256.key');
      const claims = {
        iss: clientData.id,
        sub: clientData.email,
        aud: `https://api.ibmaspera.com/api/v1/oauth2/token`,
        nbf: now - 60000,
        exp: now + 60000,
      };

      // Specify alg here as RS256
      const jwtToken = jwt.create(claims, privateKey, 'RS256');
      const token = jwtToken.compact();

      // Make POST with Basic Auth
      const basicAuth = Buffer.from(`${clientData.id}:${clientData.secret}`).toString('base64');
      const options = {
        hostname: clientData.server,
        port: 443,
        path: `/api/v1/oauth2/${clientData.org}/token?grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&scope=${clientData.scope}&assertion=${token}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${basicAuth}`,
        },
      };


      const req = https.request(options, res => {
        res.on('data', data => {

          console.log("cache status: ", value);
          console.log("******");
          console.log("Auth Request commenced");
          try{

          if (data.toString() && JSON.parse(data.toString())) {
            const jsonData = JSON.parse(data.toString());
            
            const au = `Bearer ${jsonData.access_token}`;
            successtoken = myCache.set("AuthKey", au, 3600);
            if (successtoken) {
              console.log("Successful Cache ");
              fs.writeFile('src/auth/adminauth.txt', au, function (err) {
                if (err) return console.log(err);
                        console.log('written to file');
                });
              resolve(au)
            }
            else {
              console.log("Error in cache");
            }

          }
          else {
            console.log("Failed getting token", data);
          }

        }
          catch(err){
            console.log("caught token err");
            console.log("Make Auth Call NOW");
            authService();
          }

        });
      });

      req.on('error', error => {
        console.error(error);
      });


      req.end();




    }

    else {

      console.log("Cache Value: ", value);
      resolve(value);


    }



  });

}

authService();

function user_authService() {
  return new Promise(resolve => {
    
    let successtoken1;
    let value1 = myCache.get("AuthKey1");
    console.log("Start: Cache Value:", value1);

    if (value1 === undefined) {
    const clientData = {
      id: process.env.CLIENT_ID,
      secret: process.env.CLIENT_SECRET,
      email: process.env.EMAIL,
      org: process.env.ORG,
      server: 'api.ibmaspera.com',
      scope: 'user:all'
    };

    // Get current time in Seconds (nbf and exp take Seconds)
    const now = new Date().getTime() / 1000;
    const privateKey = fs.readFileSync('jwtRS256.key');
    const claims = {
      iss: clientData.id,
      sub: clientData.email,
      aud: `https://api.ibmaspera.com/api/v1/oauth2/token`,
      nbf: now - 60000,
      exp: now + 60000,
    };

    // Specify alg here as RS256
    const jwtToken = jwt.create(claims, privateKey, 'RS256');
    const token = jwtToken.compact();

    // Make POST with Basic Auth
    const basicAuth = Buffer.from(`${clientData.id}:${clientData.secret}`).toString('base64');
    const options = {
      hostname: clientData.server,
      port: 443,
      path: `/api/v1/oauth2/${clientData.org}/token?grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&scope=${clientData.scope}&assertion=${token}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicAuth}`,
      },
    };


    const req = https.request(options, res => {
      res.on('data', data => {
          
          console.log("user cache status: ", value1);
          console.log("******");
          console.log("user Auth Request commenced");
try{

   if (data.toString() && JSON.parse(data.toString())) {

        const jsonData = JSON.parse(data.toString());
        const au1 = `Bearer ${jsonData.access_token}`;

        successtoken1 = myCache.set("AuthKey1", au1, 3600);
            if (successtoken1) {
              console.log("Successful user Cache ");

              fs.writeFile('src/auth/userauth.txt', au1, function (err) {
                if (err) return console.log(err);
                        console.log('written to file');
                });

        resolve(au1);
}
            else {
              console.log("Error in cache");
            }
             }
          else {
            console.log("Failed getting token", data);
          }
           }
          catch(err){
            console.log("caught user auth token err");
            console.log("Make user Auth Call NOW");
            user_authService();
          }
      });
    });

    req.on('error', error => {
      console.error(error);
    });


    req.end();


  } 
  else {

      console.log("Cache User auth Value: ", value1);
      resolve(value1);


    }
  });
}

user_authService();


function nuser_authService() {
  return new Promise(resolve => {

    let successtoken2;
    let value2 = myCache.get("AuthKey2");
    console.log("Start: Cache Value:", value2);

    if (value2 === undefined) {
    const clientData = {
      id: process.env.CLIENT_ID,
      secret: process.env.CLIENT_SECRET,
      email: process.env.EMAIL,
      org: process.env.ORG,
      server: 'api.ibmaspera.com',
      scope: process.env.NODE_SCOPE
    };

    // Get current time in Seconds (nbf and exp take Seconds)
    const now = new Date().getTime() / 1000;
    const privateKey = fs.readFileSync('jwtRS256.key');
    const claims = {
      iss: clientData.id,
      sub: clientData.email,
      aud: `https://api.ibmaspera.com/api/v1/oauth2/token`,
      nbf: now - 60000,
      exp: now + 60000,
    };

    // Specify alg here as RS256
    const jwtToken = jwt.create(claims, privateKey, 'RS256');
    const token = jwtToken.compact();

    // Make POST with Basic Auth
    const basicAuth = Buffer.from(`${clientData.id}:${clientData.secret}`).toString('base64');
    const options = {
      hostname: clientData.server,
      port: 443,
      path: `/api/v1/oauth2/${clientData.org}/token?grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&scope=${clientData.scope}&assertion=${token}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicAuth}`,
      },
    };


    const req = https.request(options, res => {
      res.on('data', data => {

        console.log("node user cache status: ", value2);
        console.log("******");
        console.log("node user Auth Request commenced");

try{
     if (data.toString() && JSON.parse(data.toString())) {

        const jsonData = JSON.parse(data.toString());
        const au2 = `Bearer ${jsonData.access_token}`;

        successtoken2 = myCache.set("AuthKey2", au2, 3600);
        if (successtoken2) {
          console.log("Successful node user Cache ");


        fs.writeFile('src/auth/nodeauth.txt', au2, function (err) {
                if (err) return console.log(err);
                        console.log('written to file');
                });
        resolve(au2);
        }
            else {
              console.log("Error in cache");
            }
        }
          else {
            console.log("Failed getting token", data);
          }
          }
          catch(err){
            console.log("caught node user auth token err");
            console.log("Make node user Auth Call NOW");
            nuser_authService();
          }
      });
    });

    req.on('error', error => {
      console.error(error);
    });


    req.end();
} 
  else {

      console.log("Cache node User auth Value: ", value2);
      resolve(value2);


    }
  });

}
nuser_authService();