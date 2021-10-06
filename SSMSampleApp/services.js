var request = require('request');
var fs = require('fs');
require('dotenv/config');
var array = fs.readFileSync('src/components/auth.txt').toString().split("\n");
var authtoken = array[0];

//var env_var = JSON.stringify(process.env.PLAYGROUND_ENVIRONMENT);
var env_var = "product"


var clientid = process.env.REACT_APP_CLIENT_ID;
var clientsecret = process.env.REACT_APP_CLIENT_SECRET;


exports.getcustomerdetails = function () {

  return new Promise((resolve, reject) => {

      let opts = {
        method: 'GET',
        url: process.env[env_var.concat("_").concat("customer_details")],
        qs:{
          emailAddress: process.env.REACT_APP_USERNAME,
          _namedQuery: 'getCustomersByContactEmail',
          _pageNumber: '1',
          _pageSize: '10'
        },
        headers: {
          'X-IBM-Client-Id': clientid,
          'X-IBM-Client-Secret': clientsecret,
          'Authorization': authtoken
        }
      };

      request(opts, function (error, response) {
        if (error) reject(error);
        
        try{
        const jsonft = JSON.parse(response.body);
        resolve(jsonft);
        }
          catch(err){
          console.log("error in inputs provided");
          }
      });
  }).catch(() => {});
}

exports.getmysubscriptions = function () {

  return new Promise((resolve, reject) => {

      let c_options = { 
        method: 'GET',
        url: process.env[env_var.concat("_").concat("subscriptions")],
        qs: {
          _namedQuery: 'getCustomersByContactEmail',
          _pageNumber: '1',
          _pageSize: '10',
          emailAddress: process.env.REACT_APP_USERNAME
        },
        headers: {
          'X-IBM-Client-Id': clientid,
          'X-IBM-Client-Secret': clientsecret,
          'Authorization': authtoken
        }
      };

      request(c_options, function (error, response) { 
        if (error) throw new Error(error);
        const jsonbody = JSON.parse(response.body);

        var cust_id = jsonbody["List"][0]["Id"]; 

        let options = {
          method: 'GET',
          url: process.env[env_var.concat("_").concat("subcrpt")],
          qs: {
            _namedQuery: 'getSubscriptionByCustomer',
            _pageNumber: '1',
            _pageSize: '10',
            customerId: cust_id, 
          },
          headers: {
            'X-IBM-Client-Id': clientid,
            'X-IBM-Client-Secret': clientsecret,
            Authorization: authtoken,
            accept: 'application/json'
          }
        };

        request(options, function (error, res, body) {
          if (error) reject(error);
        try{
          var data = JSON.parse(body);
          //console.log(body);
          resolve(data);
           }
          catch(err){
          console.log("error in inputs provided");
          }
        });

      });

  }).catch(() => {});
}


exports.getsubscribers = function (id) {
    
    id = id.toString();

  return new Promise((resolve, reject) => {

      let options = {
        method: 'GET',
        url: process.env[env_var.concat("_").concat("subscribers")],
        qs: {
          _namedQuery: 'getSubscriberListBySubscription',
          subscriptionId: id,
        },
        headers: {
          'X-IBM-Client-Id': clientid,
          'X-IBM-Client-Secret': clientsecret,
          Authorization: authtoken,
          accept: 'application/json'
        }
      };

      request(options, function (error, res, body) {
        if (error) reject(error);
        
        try{
        var data1 = JSON.parse(body);
        resolve(data1);
        }
          catch(err){
          console.log("error in inputs provided");
          }
      });

  }).catch(() => {});
}


exports.inviteuser = function (sbpid = "", gname = "", uemail = "", fname = "") {

  sbpid = sbpid.toString();
  gname = gname.toString();
  uemail = uemail.toString();
  fname = fname.toString();

  return new Promise((resolve, reject) => {

    var reqbody = {
      "Subscriber": {
        "Person": {
          "GivenName": gname,
          "EmailAddress": uemail,
          "FamilyName": fname,
          "RoleSet": [
            "CustomerAdministrator",
            "AppDeveloper"
          ]
        }
      }
    };

      let options = {
        method: 'POST',
        url: process.env[env_var.concat("_").concat("invite")],
        qs: {
          subscriptionId: sbpid
        },
        headers: {
          'X-IBM-Client-Id': clientid,
          'X-IBM-Client-Secret': clientsecret,
          Authorization: authtoken,
          'content-type': 'application/json',
          accept: 'application/json'
        },
        body: reqbody,
        json: true
      };

      request(options, function (error, res, body) {
        if (error) reject(error);
        try{
        
        var body1 = body
        console.log(body1);
        resolve(body1);
         }
          catch(err){
          console.log("error in inputs provided");
          }

      });

  }).catch(() => {});
}

exports.revokesubscription = function (subid = "", seatid = "") {

  subid = subid.toString();
  seatid = seatid.toString();
  var fullUrl = process.env[env_var.concat("_").concat("revoke")].concat(subid).concat('/seat/').concat(seatid);

  return new Promise((resolve, reject) => {

      let options = {
        method: 'POST',
        url: fullUrl,
        headers: {
          'X-IBM-Client-Id': clientid,
          'X-IBM-Client-Secret': clientsecret,
          Authorization: authtoken,
          accept: 'application/json'
        }
      };

      request(options, function (error, res, body) {
        if (error) reject(error);
        
        try{
            var body2 = body
            resolve(body2);
         }
          catch(err){
          console.log("error in inputs provided");
          }

      });

  }).catch(() => {});
}
