const request = require('request');

function authService () {
    return new Promise(resolve => {
      const cli_id = 'e443656a-43ed-439e-9288-13c3e0d8690e'
      const cli_sec = 'J4sR2hR5wB1iW4cS8lP1qD5sE3oR5pC1hY6jL6tV2nA1cC0aL0'
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
          'username': 'aishwarya0330@mailinator.com',
          'password': 'Saastart1234'
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

  exports.getmysubscriptions = function () {

    return new Promise((resolve, reject) => {


      let mysubsp_dict = {}; // individual entries
      let mysubsp_list = {}; // final list of subscriptions
      let data;

        authService().then((authtoken) => {
        let options = {
          method: 'GET',
          url: 'https://api.ibm.com/scx/run/sbs_orgaccess/subscription?_namedQuery=getSubscriptionByCustomer&customerId=512516232',
          qs: {
            _namedQuery: 'getSubscriptionByCustomer',
            _pageNumber: '1',
            _pageSize: '10',
            customerId: '512516232',
          },
          headers: {
            'X-IBM-Client-Id': 'e443656a-43ed-439e-9288-13c3e0d8690e',
            'X-IBM-Client-Secret': 'J4sR2hR5wB1iW4cS8lP1qD5sE3oR5pC1hY6jL6tV2nA1cC0aL0',
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

      })


    });
  }


  exports.getsubscribers = function (id) {
    return new Promise((resolve, reject) => {
      let data;
      let subs_dict = {}; // individual entries
      let subscribers_list = {}; // final list of subscribers
      console.log("id  : ",id)
      authService().then((authtoken) => {
        let options = {
          method: 'GET',
          url: 'https://api.ibm.com/scx/run/sbs_orgaccess/subscriber',
          qs: {
          _namedQuery: 'getSubscriberListBySubscription',
          _pageNumber: '1',
          _pageSize: '10',
          subscriptionId: id ,
          },
          headers: {
          'X-IBM-Client-Id': 'e443656a-43ed-439e-9288-13c3e0d8690e',
          'X-IBM-Client-Secret': 'J4sR2hR5wB1iW4cS8lP1qD5sE3oR5pC1hY6jL6tV2nA1cC0aL0',
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
        "Subscriber":{
           "Person":{
              "GivenName":gname,
              "EmailAddress":uemail,
              "FamilyName":fname,
              "RoleSet":[
                 "CustomerAdministrator",
                 "AppDeveloper"
              ]
           }
        }
     };
      
        authService().then((authtoken) => {
        let options = {
          method: 'POST',
          url: 'https://api.ibm.com/scx/run/sbs_orgaccess/subscriber/inviteUser',
          qs: {
            subscriptionId: sbpid
          },
          headers: {
            'X-IBM-Client-Id': 'e443656a-43ed-439e-9288-13c3e0d8690e',
            'X-IBM-Client-Secret': 'J4sR2hR5wB1iW4cS8lP1qD5sE3oR5pC1hY6jL6tV2nA1cC0aL0',
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
    var fullUrl = 'https://api.ibm.com/scx/run/sbs_orgaccess/subscriber/' .concat(subid). concat('/seat/') .concat(seatid);

    console.log(fullUrl);

    return new Promise((resolve, reject) => {

      authService().then((authtoken) => {
      let options = {
        method: 'POST',
        url: fullUrl,
        headers: {
          'X-IBM-Client-Id': 'e443656a-43ed-439e-9288-13c3e0d8690e',
          'X-IBM-Client-Secret': 'J4sR2hR5wB1iW4cS8lP1qD5sE3oR5pC1hY6jL6tV2nA1cC0aL0',
          Authorization: authtoken,
          accept: 'application/json'
        }
      };

      request(options, function (error, response, body) {
        if (error) {
          console.log("Error: " ,error)
          reject(error);
        
        }
          //console.log(body);
          resolve(body);
          
      });

    })


  });
  }