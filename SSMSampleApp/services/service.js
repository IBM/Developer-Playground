const request = require('request');
require('dotenv/config');

var env_var = JSON.stringify(process.env.PLAYGROUND_ENVIRONMENT);
env_var = env_var.substring(1,8);

function authService() {
  return new Promise(resolve => {
    const cli_id = process.env.CLIENT_ID
    const cli_sec = process.env.CLIENT_SECRET
    const basicAuth = Buffer.from(`${cli_id}:${cli_sec}`).toString('base64');
    const options = {
      method: 'POST',
      url: process.env[env_var.concat("_").concat("oauth")],
      headers: {
        'Authorization': `Basic ${basicAuth}`,

      },
      form: {
        'grant_type': 'password',
        'scope': '/sbs_orgaccess',
        'username': process.env.USERNAME,
        'password': process.env.PASSWORD
      }
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const jsonData = JSON.parse(body.toString());
      const au = `Bearer ${jsonData.access_token}`;
      resolve(au);
    });
  });

}


exports.getcustomerdetails = function () {

  return new Promise((resolve, reject) => {

    authService().then((authtoken) => {

      let opts = {
        method: 'GET',
        url: process.env[env_var.concat("_").concat("customer_details")],
        qs:{
          emailAddress: process.env.USERNAME,
          _namedQuery: 'getCustomersByContactEmail',
          _pageNumber: '1',
          _pageSize: '10'
        },
        headers: {
          'X-IBM-Client-Id': process.env.CLIENT_ID,
          'X-IBM-Client-Secret': process.env.CLIENT_SECRET,
          'Authorization': authtoken
        }
      };
      var cust_arr = {};

      request(opts, function (error, response) {
        if (error) reject(error);
        const jsonft = JSON.parse(response.body);
        cust_arr["Name"] = jsonft["List"][0]["Organization"]["OrgName"];
        cust_arr["ID"] = jsonft["List"][0]["Owner"];

        resolve(cust_arr);
      });

    })

  });
}

exports.getmysubscriptions = function () {

  return new Promise((resolve, reject) => {


    let mysubsp_dict = {}; // individual entries
    let mysubsp_list = {}; // final list of subscriptions
    let data;

    authService().then((authtoken) => {

      let c_options = {
        method: 'GET',
        url: process.env[env_var.concat("_").concat("subscriptions")],
        qs: {
          _namedQuery: 'getCustomersByContactEmail',
          _pageNumber: '1',
          _pageSize: '10',
          emailAddress: process.env.USERNAME
        },
        headers: {
          'X-IBM-Client-Id': process.env.CLIENT_ID,
          'X-IBM-Client-Secret': process.env.CLIENT_SECRET,
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
            'X-IBM-Client-Id': process.env.CLIENT_ID,
            'X-IBM-Client-Secret': process.env.CLIENT_SECRET,
            Authorization: authtoken,
            accept: 'application/json'
          }
        };

        request(options, function (error, res, body) {
          if (error) reject(error);

          data = JSON.parse(body)
          for (let i = 0; i < data["List"].length; i++) {
            mysubsp_dict["PartNumber"] = data["List"][i]["PartNumber"].toString();
            mysubsp_dict["Name"] = data["List"][i]["Name"].toString();
            mysubsp_dict["NumberOfAvailableSeats"] = data["List"][i]["NumberOfAvailableSeats"].toString();
            mysubsp_dict["SubscriptionState"] = data["List"][i]["SubscriptionState"].toString();
            mysubsp_dict["Id"] = data["List"][i]["Id"].toString();
            mysubsp_list[i] = mysubsp_dict
            mysubsp_dict = {}
          }
          resolve(mysubsp_list);
        });

      });

    })


  });
}


exports.getsubscribers = function (id) {
  return new Promise((resolve, reject) => {
    let data;
    let subs_dict = {}; // individual entries
    let subscribers_list = {}; // final list of subscribers

    authService().then((authtoken) => {
      let options = {
        method: 'GET',
        url: process.env[env_var.concat("_").concat("subscribers")],
        qs: {
          _namedQuery: 'getSubscriberListBySubscription',
          _pageNumber: '1',
          _pageSize: '10',
          subscriptionId: id,
        },
        headers: {
          'X-IBM-Client-Id': process.env.CLIENT_ID,
          'X-IBM-Client-Secret': process.env.CLIENT_SECRET,
          Authorization: authtoken,
          accept: 'application/json'
        }
      };

      request(options, function (error, res, body) {
        if (error) reject(error);

        data = JSON.parse(body);
        for (var i = 0; i < data["List"].length; i++) {

          subs_dict["OrgName"] = data["List"][i]["Person"]["OrgName"].toString();
          subs_dict["GivenName"] = data["List"][i]["Person"]["GivenName"].toString();
          subs_dict["SubscriberState"] = data["List"][i]["SubscriberState"].toString();
          subs_dict["SubscriberID"] = data["List"][i]["SeatSet"][0]["SubscriberId"].toString();
          subs_dict["SeatID"] = data["List"][i]["SeatSet"][0]["Id"].toString();

          subscribers_list[i] = subs_dict
          subs_dict = {}

        }
        resolve(subscribers_list);
      });

    })
  });
}


exports.inviteuser = function (sbpid = "", gname = "", uemail = "", fname = "") {

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

    authService().then((authtoken) => {
      let options = {
        method: 'POST',
        url: process.env[env_var.concat("_").concat("invite")],
        qs: {
          subscriptionId: sbpid
        },
        headers: {
          'X-IBM-Client-Id': process.env.CLIENT_ID,
          'X-IBM-Client-Secret': process.env.CLIENT_SECRET,
          Authorization: authtoken,
          'content-type': 'application/json',
          accept: 'application/json'
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

exports.revokesubscription = function (subid = "", seatid = "") {

  var subid = subid.toString();
  var seatid = seatid.toString();
  var fullUrl = process.env[env_var.concat("_").concat("revoke")].concat(subid).concat('/seat/').concat(seatid);

  console.log(fullUrl);

  return new Promise((resolve, reject) => {

    authService().then((authtoken) => {
      let options = {
        method: 'POST',
        url: fullUrl,
        headers: {
          'X-IBM-Client-Id': process.env.CLIENT_ID,
          'X-IBM-Client-Secret': process.env.CLIENT_SECRET,
          Authorization: authtoken,
          accept: 'application/json'
        }
      };

      request(options, function (error, response, body) {
        if (error) {
          console.log("Error: ", error)
          reject(error);

        }
        //console.log(body);
        resolve(body);

      });

    })


  });
}
