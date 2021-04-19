const request = require('request');
const fs = require('fs');
const https = require('https');
const jwt = require('njwt');
const NodeCache = require("node-cache");
const myCache = new NodeCache();
require('dotenv').config()

function authService() {
  return new Promise(resolve => {

    let successtoken;
    value = myCache.get("AuthKey");
    console.log("Start: Cache Value:", value);

    if (value == undefined) {

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
          if (data.toString() && JSON.parse(data.toString())) {
            const jsonData = JSON.parse(data.toString());
            const au = `Bearer ${jsonData.access_token}`;
            successtoken = myCache.set("AuthKey", au, 3600);
            if (successtoken) {
              console.log("Successful Cache ");
              resolve(au)
            }
            else {
              console.log("Error in cache");
            }

          }
          else {
            console.log("Failed getting token", data);
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


function user_authService() {
  return new Promise(resolve => {

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
        const jsonData = JSON.parse(data.toString());
        const au = `Bearer ${jsonData.access_token}`;
        resolve(au);

      });
    });

    req.on('error', error => {
      console.error(error);
    });


    req.end();


  });

}

function nuser_authService() {
  return new Promise(resolve => {

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

        console.log('data:', data.toString());
        const jsonData = JSON.parse(data.toString());
        const au = `Bearer ${jsonData.access_token}`;
        resolve(au);

      });
    });

    req.on('error', error => {
      console.error(error);
    });


    req.end();


  });

}


exports.addworkspace = function (name = "", desc = "") {

  return new Promise((resolve, reject) => {

    authService().then((authtoken) => {

      let defnode_options = {
        'method': 'GET',
        'url': 'https://api.ibmaspera.com/api/v1/admin/nodes',
        'headers': {
          'accept': 'application/json',
          'Authorization': authtoken
        }
      };

      request(defnode_options, function (error, response) {
        if (error) throw new Error(error);
        const jsonbody = JSON.parse(response.body)
        // Default Workspace's Node ID
        var def_wksp_node = jsonbody[0]["id"]

        var reqbody = { "name": name, "description": desc, "node_id": def_wksp_node }
        let options =
        {
          method: 'POST',
          url: 'https://api.ibmaspera.com/api/v1/admin/workspaces',
          headers:
          {
            'content-type': 'application/json',
            'accept': 'application/json',
            'Authorization': authtoken,
          },
          body: reqbody,
          json: true
        };

        request(options, function (error, res, body) {
          if (error) reject(error);
          console.log(body);
          resolve(body)

        });
      });
    })

  });
}

exports.adduser = function (useremail = "") {

  return new Promise((resolve, reject) => {

    var reqbody = { "email": useremail, "auth_provider_id": null };

    authService().then((authtoken) => {
      let options =
      {
        method: 'POST',
        url: 'https://api.ibmaspera.com/api/v1/admin/users',
        headers:
        {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': authtoken,
        },
        body: reqbody,
        json: true
      };

      request(options, function (error, res, body) {
        if (error) reject(error);
        console.log(body);
        resolve(body);
      });
    })

  });
}

exports.deluser = function (userid = "") {

  return new Promise((resolve, reject) => {

    var uid = userid.toString();
    var fullUrl = 'https://api.ibmaspera.com/api/v1/admin/users/'.concat(uid);

    authService().then((authtoken) => {
      let options =
      {
        method: 'DELETE',
        url: fullUrl,
        headers:
        {
          'accept': 'application/json',
          'Authorization': authtoken,
        }
      };

      request(options, function (error, res, body) {
        if (error) reject(error);
        console.log(body);
        resolve(body);
      });

    })

  });
}

exports.addmember = function (workspaceID = "", userperms = "", userid = "") {

  return new Promise((resolve, reject) => {

    var reqbody = {
      can_invite_by_email: false,
      manager: userperms,
      member_id: userid,
      member_type: 'user',
      storage_allowed: false,
      workspace_id: workspaceID
    };

    authService().then((authtoken) => {
      let options =
      {
        method: 'POST',
        url: 'https://api.ibmaspera.com/api/v1/admin/workspace_memberships',
        headers:
        {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': authtoken,
        },
        body: reqbody,
        json: true
      };

      request(options, function (error, res, body) {
        if (error) reject(error);
        resolve(body);
      });
    })

  });
}

exports.sendpackages = function (pkgname = "", filepkg = "", userid = "") {

  return new Promise((resolve, reject) => {

    authService().then((authtoken) => {

      let wk_options = {
        'method': 'GET',
        'url': 'https://api.ibmaspera.com/api/v1/admin/workspaces',
        'headers': {
          'Authorization': authtoken
        }
      };
      request(wk_options, function (error, response) {
        if (error) throw new Error(error);
        const jsondataform = JSON.parse(response.body);
        var def_wksp_id = jsondataform[0]["id"];

        var pid;
        var reqbody =
        {
          "recipients": [{ "id": userid, "type": "user" }],
          "upload_notification_recipients": [],
          "download_notification_recipients": [], "bcc_recipients": [],
          "file_names": [filepkg],
          "name": pkgname,
          "workspace_id": def_wksp_id,
          "encryption_at_rest": false,
          "single_source": true,
          "read": true,
          "transfers_expected": 1
        }

        user_authService().then((authtoken) => {

          let options =
          {
            method: 'POST',
            url: 'https://api.ibmaspera.com/api/v1/packages',
            headers:
            {
              'content-type': 'application/json',
              'accept': 'application/json',
              'Authorization': authtoken,
            },
            body: reqbody,
            json: true
          };

          request(options, function (error, res, body) {
            if (error) throw new (error);
            pid = body["id"];

            var fullUrl = 'https://api.ibmaspera.com/api/v1/packages/'.concat(pid);

            var reqbody1 = {
              "sent": true,
              "transfers_expected": 1
            };

            const opts =
            {
              method: 'PUT',
              url: fullUrl,
              headers:
              {
                'accept': 'application/json',
                'Authorization': authtoken,
              },
              body: reqbody1,
              json: true
            };


            request(opts, function (error, res, body) {
              if (error) throw new (error);
              console.log(body);
              resolve(body)

            });


          });

        })
      });
    })

  });
}



exports.getfiles = function () {

  return new Promise((resolve, reject) => {

    authService().then((authtoken) => {

      var nodeurl;
      const options =
      {
        method: 'GET',
        url: 'https://api.ibmaspera.com/api/v1/admin/nodes',
        headers:
        {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': authtoken,
        }
      };


      request(options, function (error, res, body) {
        if (error) throw new (error);
        const jsondata = JSON.parse(body);
        nodeurl = jsondata[0]["url"].toString();
        var n = nodeurl.lastIndexOf(":");
        nodeurl = nodeurl.substring(0, n);

        let options01 =
        {
          method: 'GET',
          url: 'https://api.ibmaspera.com/api/v1/admin/workspaces',
          headers:
          {
            'accept': 'application/json',
            'Authorization': authtoken,
          }
        };

        request(options01, function (error, res, body) {
          if (error) throw new (error);
          const jsonform01 = JSON.parse(body.toString());
          var homefileid = jsonform01[0]["home_file_id"].toString();


          var finalurl = nodeurl.concat('/files/').concat(homefileid).concat('/files');
          nuser_authService().then((authtoken) => {

            let options02 =
            {
              method: 'GET',
              url: finalurl,
              headers:
              {
                'X-Aspera-AccessKey': process.env.ASPERA_ACCESS_KEY,
                'Authorization': authtoken
              }
            };

            var file_list = [];
            request(options02, function (error, res, body) {
              if (error) throw new (error);
              const jsonform02 = JSON.parse(body.toString());
              for (var i = 0; i < jsonform02.length; i++) {
                let file_names = {};
                file_names["name"] = jsonform02[i]["name"];
                file_list.push(file_names);
              }
              resolve(file_list);
            });
          })


        });


      });

    })

  });
}




exports.getworkspace = function () {

  return new Promise((resolve, reject) => {

    let workspace_arr = [];
    // workspace id and name

    authService().then((authtoken) => {
      let options =
      {
        method: 'GET',
        url: 'https://api.ibmaspera.com/api/v1/admin/workspaces',
        headers:
        {
          'accept': 'application/json',
          'Authorization': authtoken,
        }
      };

      request(options, function (error, res, body) {
        if (error) reject(error);
        const jsonform = JSON.parse(body.toString());
        for (var i = 0; i < jsonform.length; i++) {
          let list_wksp = {};
          list_wksp["id"] = jsonform[i]["id"];
          list_wksp["value"] = jsonform[i]["name"]
          workspace_arr.push(list_wksp)
        }
        resolve(workspace_arr);
      });

    })

  });
}

exports.getusers = function () {
  return new Promise((resolve, reject) => {
    let user_arr = [];
    // user id and email 

    authService().then((authtoken) => {
      let options =
      {
        method: 'GET',
        url: 'https://api.ibmaspera.com/api/v1/admin/users',
        headers:
        {
          'accept': 'application/json',
          'Authorization': authtoken,
        }
      };

      request(options, function (error, res, body) {
        if (error) reject(error);
        const jsonform = JSON.parse(body.toString());
        for (var i = 0; i < jsonform.length; i++) {
          let user_idemail = {};
          user_idemail["id"] = jsonform[i]["id"];
          user_idemail["value"] = jsonform[i]["email"]
          user_arr.push(user_idemail)
        }
        //console.log(user_idemail);
        resolve(user_arr);
      });
    })

  });
}

exports.getpackages = function () {
  return new Promise((resolve, reject) => {

    let pkg_arr = [];

    authService().then((authtoken) => {
      let options =
      {
        method: 'GET',
        url: 'https://api.ibmaspera.com/api/v1/admin/packages',
        headers:
        {
          'accept': 'application/json',
          'Authorization': authtoken,
        },
        qs: {
          'package_sent': true,
          'deleted': false,
          'include_draft': false,
          'received': true
        }

      };

      request(options, function (error, res, body) {
        if (error) reject(error);
        const jsonform = JSON.parse(body.toString());
        for (var i = 0; i < jsonform.length; i++) {
          let list_pkg = {};
          list_pkg["id"] = jsonform[i]["id"];
          list_pkg["value"] = jsonform[i]["name"]
          pkg_arr.push(list_pkg)
        }
        resolve(pkg_arr);
      });
    })

  });
}
