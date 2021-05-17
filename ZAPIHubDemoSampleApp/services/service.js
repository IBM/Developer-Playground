const request = require('request');
require('dotenv/config');


exports.getatmlocation = function (zipcode = "") {

  return new Promise((resolve, reject) => {

    var szipcode = zipcode.toString();
    var fullUrl = 'https://dev.api.ibm.com/apihubdemo/test/bankapis/atm/zipcode/'.concat(szipcode);

      let options =
      {
        method: 'GET',
        url: fullUrl,
        headers:
        {
          'X-IBM-Client-Id': process.env.CLIENT_ID,
          'accept': 'application/json',
        }
      };

      var atm_details = {};
      //var atms = {};
      var temp = [];

      request(options, function (error, response) {
        if (error) reject(error);
        const jsonform1 = JSON.parse(response.body);
      
        //for(var i = 0; i<jsonform1.length;i++){
        
          atm_details["code"] = jsonform1["code"];
          atm_details["name"] = jsonform1["name"];
          atm_details["city"] = jsonform1["cityName"];
          atm_details["landmark"] = jsonform1["landmark"];
          atm_details["zipcode"] = jsonform1["zipCode"];
          temp.push(jsonform1["latitude"])
          temp.push(jsonform1["longitude"])
          atm_details["location"] = temp;
          temp = [];
          
          //atms[i] = atm_details;
          //atm_details = {};
      
      //}
      
      resolve(atm_details);
        // resolve(atms);
      });      

  });
}

exports.calcloanpayable = function (emi = "",tenure = "") {

  return new Promise((resolve, reject) => {

    var semi = emi.toString();
    var stenure = tenure.toString();
    var fullUrl = 'https://dev.api.ibm.com/apihubdemo/test/bankapis/loan/emi/'.concat(semi).concat('/tenure/').concat(stenure);

      let options =
      {
        method: 'POST',
        url: fullUrl,
        headers:
        {
          'X-IBM-Client-Id': process.env.CLIENT_ID,
          'accept': 'application/json',
        }
      };

      request(options, function (error, response) {
        if (error) reject(error);
        resolve(response.body);
      });

  });
}
