const request = require('request');
const fs = require('fs');
const https = require('https');
const jwt = require('njwt');

const NodeCache = require( "node-cache" );
const myCache = new NodeCache();


function authService() {
  return new Promise(resolve => {

    let successtoken;
    value = myCache.get( "AuthKey" );
    console.log("Start: Cache Value:", value);

    if ( value == undefined ){
            
      const clientData = {
        id: 'IWc2vCSzCQ',
        secret: 'U58HhVO3c9mO12bj2XFXRYajCtCN7mG2pxQeQK2B5NL6X0si6mB7ZNEoRaFhP1CWi9MUzd2dlkX8uOKMtDXGuO0blu0GWOgK',
        email: 'aishwarya0324@mailinator.com',
        org: '59919yozdcm',
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
          if(data.toString() && JSON.parse(data.toString())){
            
            const jsonData = JSON.parse(data.toString());
            const au = `Bearer ${jsonData.access_token}`;
            successtoken = myCache.set( "AuthKey", au, 3600 );
            if(successtoken){
              console.log("Successful Cache ");
              resolve(au)
            }
            else{
              console.log("Error in cache");
            }
            
          }
          else{
            console.log("Failed getting token", data);
        }
          
  
        });
      });
  
      req.on('error', error => {
        console.error(error);
      });
  
  
      req.end();
  
    
    
    
          }

  else{

    console.log("Cache Value: ", value);
    resolve(value);


  }



  });

}


function user_authService() {
  return new Promise(resolve => {

    const clientData = {
      id: 'IWc2vCSzCQ',
      secret: 'U58HhVO3c9mO12bj2XFXRYajCtCN7mG2pxQeQK2B5NL6X0si6mB7ZNEoRaFhP1CWi9MUzd2dlkX8uOKMtDXGuO0blu0GWOgK',
      email: 'aishwarya0324@mailinator.com',
      org: '59919yozdcm',
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
      id: 'IWc2vCSzCQ',
      secret: 'U58HhVO3c9mO12bj2XFXRYajCtCN7mG2pxQeQK2B5NL6X0si6mB7ZNEoRaFhP1CWi9MUzd2dlkX8uOKMtDXGuO0blu0GWOgK',
      email: 'aishwarya0324@mailinator.com',
      org: '59919yozdcm',
      server: 'api.ibmaspera.com',
      scope: 'node.guRrU4wfWtqdKstuKIPLb03l:user:all'
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

        console.log('data:',data.toString());
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

    var reqbody = { "name": name, "description": desc, "node_id": "46167" }

    authService().then((authtoken) => {
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

      //response.send("Workspace created");

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

      //response.send("User created");

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

      //response.send("User created");
      
    })

  });
}

exports.sendpackages = function (pkgname= "", filepkg = "", userid = "") {

  return new Promise((resolve, reject) => {

      var pid;
      var reqbody = 
        {
          "recipients":[{"id":userid,"type":"user"}],
          "upload_notification_recipients":[],
          "download_notification_recipients":[],"bcc_recipients":[],
          "file_names":[filepkg],
          "name":pkgname,
          "workspace_id":"52374",
          "encryption_at_rest":false,
          "single_source":true,
          "read":true,
          "transfers_expected":1
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
            if (error) throw new(error);
            //console.log(body["id"]);
            pid = body["id"];
        
            //const pid = await GetPackageId();
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
                    if (error) throw new(error);
                    console.log(body);
                    resolve(body)
        
                });
        
              
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
    if (error) throw new(error);
    const jsondata = JSON.parse(body);
    nodeurl = jsondata[0]["url"].toString();
    var n = nodeurl.lastIndexOf(":");
    nodeurl = nodeurl.substring(0,n);

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
        if (error) throw new(error);
        const jsonform01 = JSON.parse(body.toString());
        var homefileid = jsonform01[0]["home_file_id"].toString();
        

        var finalurl = nodeurl.concat('/files/').concat(homefileid).concat('/files');
        //console.log(finalurl);


        nuser_authService().then((authtoken) => {
          //console.log('Authtoken(user): ', authtoken);

          let options02 =
        {
          method: 'GET',
          url: finalurl,
          headers:
          {
            'X-Aspera-AccessKey': 'guRrU4wfWtqdKstuKIPLb03l',
            'Authorization': authtoken
          }
        };
  
        var file_list = [];
        request(options02, function (error, res, body) {
          if (error) throw new(error);
          const jsonform02 = JSON.parse(body.toString());
          for(var i = 0; i<jsonform02.length; i++){
            let file_names = {};
            file_names["name"] = jsonform02[i]["name"];
            file_list.push(file_names);
          }
          //console.log(file_list);
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
        qs:{
          'package_sent': true,
          'deleted' : false,
          'include_draft' : false,
          'received' : true
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

exports.gettransfers = function () {
  return new Promise((resolve, reject) => {
    let transfer_dict = {}; // individual entries
    let transfer_finallist = {};

    authService().then((authtoken) => {
      let options =
      {
        method: 'GET',
        url: 'https://api.ibmaspera.com/analytics/v2/organizations/59919/transfers',
        headers:
        {
          'accept': 'application/json',
          'Authorization': authtoken,
        }
      };

      request(options, function (error, res, body) {
        if (error) reject(error);
        const jsondata = JSON.parse(body.toString());
        //console.log(jsonform["total_transfers"]);

        for (var i = 0; i < jsondata["transfers"].length; i++) {

          transfer_dict["Transfer ID"] = jsondata["transfers"][i]["xfer_id"].toString();
          transfer_dict["Direction"] = jsondata["transfers"][i]["direction"].toString();
          transfer_dict["Status"] = jsondata["transfers"][i]["status"].toString();
          transfer_dict["Session Start"] = jsondata["transfers"][i]["session_started_at"].toString();
          transfer_dict["Session Stop"] = jsondata["transfers"][i]["session_stopped_at"].toString();

          transfer_finallist[i] = transfer_dict
          transfer_dict = {}

        }

        resolve(transfer_finallist);
      });
    })

  });
}

exports.getdataevents = function () {
  return new Promise((resolve, reject) => {
    let event_dict = {}; // individual entries
    let event_finallist = {};

    authService().then((authtoken) => {
      let options =
      {
        method: 'GET',
        url: 'https://api.ibmaspera.com/analytics/v2/organizations/59919/application_events',
        headers:
        {
          'accept': 'application/json',
          'Authorization': authtoken,
        }
      };

      request(options, function (error, res, body) {
        if (error) reject(error);
        const jsondata = JSON.parse(body.toString());

        for (var i = 0; i < jsondata["application_events"].length; i++) {

          event_dict["Event ID"] = jsondata["application_events"][i]["event_id"].toString();
          event_dict["Event Type"] = jsondata["application_events"][i]["event_type"].toString();
          event_dict["By User Name"] = jsondata["application_events"][i]["triggered_by_user_name"].toString();
          event_dict["By User Email"] = jsondata["application_events"][i]["triggered_by_user_email"].toString();
          event_dict["Event Start"] = jsondata["application_events"][i]["created_at"].toString();



          event_finallist[i] = event_dict
          event_dict = {}

        }

        resolve(event_finallist);
      });
    })

  });
}