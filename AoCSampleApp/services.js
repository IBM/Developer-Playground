require('dotenv').config();
const request = require('request');
const fs = require('fs');
var adminauthtoken = fs.readFileSync('src/auth/adminauth.txt').toString().split("\n")[0];
var userauthtoken = fs.readFileSync('src/auth/userauth.txt').toString().split("\n")[0];
var nuserauthtoken = fs.readFileSync('src/auth/nodeauth.txt').toString().split("\n")[0];

// console.log("adminauth: ", adminauthtoken);
// console.log("userauth: ", userauthtoken);
// console.log("nuserauth: ", nuserauthtoken);

exports.addworkspace = function (name = "", desc = "") {

  return new Promise((resolve, reject) => {

      let defnode_options = {
        'method': 'GET',
        'url': 'https://api.ibmaspera.com/api/v1/admin/nodes',
        'headers': {
          'accept': 'application/json',
          'Authorization': adminauthtoken
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
            'Authorization': adminauthtoken,
          },
          body: reqbody,
          json: true
        };

        request(options, function (error, res, body) {
          if (error) reject(error);
        //   console.log(body);
          resolve(body)

        });
      });
  });
}

exports.adduser = function (useremail = "") {

  return new Promise((resolve, reject) => {

    var reqbody = { "email": useremail, "auth_provider_id": null };
      let options =
      {
        method: 'POST',
        url: 'https://api.ibmaspera.com/api/v1/admin/users',
        headers:
        {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': adminauthtoken,
        },
        body: reqbody,
        json: true
      };

      request(options, function (error, res, body) {
        if (error) reject(error);
        console.log(body);
        resolve(body);
      });
  });
}

exports.deluser = function (userid = "") {

  return new Promise((resolve, reject) => {

    var uid = userid.toString();
    var fullUrl = 'https://api.ibmaspera.com/api/v1/admin/users/'.concat(uid);
      let options =
      {
        method: 'DELETE',
        url: fullUrl,
        headers:
        {
          'accept': 'application/json',
          'Authorization': adminauthtoken,
        }
      };

      request(options, function (error, res, body) {
        if (error) reject(error);
        //console.log(body);
        resolve(body);
      });
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
      let options =
      {
        method: 'POST',
        url: 'https://api.ibmaspera.com/api/v1/admin/workspace_memberships',
        headers:
        {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': adminauthtoken,
        },
        body: reqbody,
        json: true
      };

      request(options, function (error, res, body) {
        if (error) reject(error);
        resolve(body);
      });
  });
}

exports.sendpackages = function (pkgname = "", filepkg = "", userid = "") {

  return new Promise((resolve, reject) => {
      let wk_options = {
        'method': 'GET',
        'url': 'https://api.ibmaspera.com/api/v1/admin/workspaces',
        'headers': {
          'Authorization': adminauthtoken
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

          let options =
          {
            method: 'POST',
            url: 'https://api.ibmaspera.com/api/v1/packages',
            headers:
            {
              'content-type': 'application/json',
              'accept': 'application/json',
              'Authorization': userauthtoken,
            },
            body: reqbody,
            json: true
          };

          request(options, function (error, res, body) {
            if (error) throw reject(error);
            console.log("Body: ", body);
            
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
                'Authorization': userauthtoken,
              },
              body: reqbody1,
              json: true
            };


            request(opts, function (error, res, body) {
              if (error) throw reject(error);
              console.log(body);
              resolve(body)

            });


          });
      });
  });
}

exports.getfiles = function () {

  return new Promise((resolve, reject) => {

      var nodeurl;
      const options =
      {
        method: 'GET',
        url: 'https://api.ibmaspera.com/api/v1/admin/nodes',
        headers:
        {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': adminauthtoken,
        }
      };


      request(options, function (error, res, body) {
        if (error) throw reject(error);
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
            'Authorization': adminauthtoken,
          }
        };

        request(options01, function (error, res, body) {
          if (error) throw reject(error);
          const jsonform01 = JSON.parse(body.toString());
          var homefileid = jsonform01[0]["home_file_id"].toString();


          var finalurl = nodeurl.concat('/files/').concat(homefileid).concat('/files');

            let options02 =
            {
              method: 'GET',
              url: finalurl,
              headers:
              {
                'X-Aspera-AccessKey': process.env.REACT_APP_ASPERA_ACCESS_KEY,
                'Authorization': nuserauthtoken
              }
            };

            var file_list = [{id:"", name:"Choose File"}];
            request(options02, function (error, res, body) {
              if (error) throw reject(error);
              const jsonform02 = JSON.parse(body.toString());
              for (var i = 0; i < jsonform02.length; i++) {
                let file_names = {};
                file_names["id"] = jsonform02[i]["name"]
                file_names["name"] = jsonform02[i]["name"];
                file_list.push(file_names);
              }
              resolve(file_list);
            });
        });
      });
  });
}

exports.getworkspace = function () {

  return new Promise((resolve, reject) => {

    let workspace_arr = [{id:"",value:"Choose Workspace"}];
    // workspace id and name
      let options =
      {
        method: 'GET',
        url: 'https://api.ibmaspera.com/api/v1/admin/workspaces',
        headers:
        {
          'accept': 'application/json',
          'Authorization': adminauthtoken,
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
  });
}

exports.getusers = function () {
  return new Promise((resolve, reject) => {
    let user_arr = [{id:"",value:"Choose User"}];
    // user id and email 
      let options =
      {
        method: 'GET',
        url: 'https://api.ibmaspera.com/api/v1/admin/users',
        headers:
        {
          'accept': 'application/json',
          'Authorization': adminauthtoken,
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
  });
}

exports.getpackages = function () {
  return new Promise((resolve, reject) => {

    let pkg_arr = [];
    let options =
      {
        method: 'GET',
        url: 'https://api.ibmaspera.com/api/v1/admin/packages',
        headers:
        {
          'accept': 'application/json',
          'Authorization': adminauthtoken,
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
  });
}
