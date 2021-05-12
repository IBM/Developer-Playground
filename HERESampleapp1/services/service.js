/*****  
This file consists of all the API calls made to the HERE Server
If you'd like to quickly get started on customizing the application, head over to views -> components -> w-g-component.js
*****/

const request = require('request');
const OAuth = require('oauth-1.0a')
const crypto = require('crypto'); 
require('dotenv').config()

/* 
This function generates the Bearer Token Required for Authentication while making API calls
*/
function generateToken() {
  return new Promise(resolve => {
  const oauth = OAuth({
      consumer: {
          key: process.env.CLIENT_ID,
          secret: process.env.CLIENT_SECRET,
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

          if (response.statusCode == 200) {
            result = JSON.parse(response.body);
            let auth = 'Bearer '.concat(result["access_token"].toString());
              resolve(auth);
          }
      }
  );
});
}


/* 
This corresponds to the UI function: "Area -> Coordinates" under Location Details section
Refer: https://developer.ibm.com/apis/catalog/heremaps--geocoding-and-search-api-v7/api/API--heremaps--geocoding-and-search-api-v7#get-931594696
*/
  exports.addrgeocode = function (query= "") {

  return new Promise((resolve, reject) => {

    generateToken().then((authtoken) => {

      let options = {
        method: 'GET',
        url: 'https://geocode.search.hereapi.com/v1/geocode',
        qs:{
          q: query
        },
        headers: {
          'Authorization': authtoken
        }
      };
      
      var addr_details = {};
      var final_addr = {};
      var arr_addr = [];

      request(options, function (error, response) {
        if (error) reject(error);
        const jsondt5 = JSON.parse(response.body);

        if(jsondt5["items"] === undefined){
          console.log("No results");
          final_addr = {};
          resolve(final_addr);
        }
        else{

        for(var i = 0; i<jsondt5["items"].length;i++){
              addr_details["title"] = jsondt5["items"][i]["title"];
              addr_details["address"] = jsondt5["items"][i]["address"]["label"];
              arr_addr.push(jsondt5["items"][i]["position"]["lat"])
              arr_addr.push(jsondt5["items"][i]["position"]["lng"])
              addr_details["position"] = arr_addr;
              arr_addr = [];        
              final_addr[i] = addr_details;
              addr_details = {};
            }
            resolve(final_addr);
          }
      });
      

    })

  });
  }


/*
This corresponds to the UI function: "Coordinates -> Area" under Location Details section
Refer: https://developer.ibm.com/apis/catalog/heremaps--geocoding-and-search-api-v7/api/API--heremaps--geocoding-and-search-api-v7#get410761011
*/
  exports.revaddrgeocode = function (location= "") {

  return new Promise((resolve, reject) => {

    generateToken().then((authtoken) => {

      let options = {
        method: 'GET',
        url: 'https://revgeocode.search.hereapi.com/v1/revgeocode',
        qs: {
          at: location,
        },
        headers: {
          'Authorization': authtoken
        }
      };
      
      var closest_addr = {};
      var temp0 = [];

      request(options, function (error, response) {
        if (error) reject (error);
      
        const jsondt6 = JSON.parse(response.body);

        if(jsondt6["items"] === undefined){
          console.log("No results");
          closest_addr = {};
          resolve(closest_addr);
        }
        else{
          closest_addr["address"] = jsondt6["items"][0]["address"]["label"];
          temp0.push(jsondt6["items"][0]["position"]["lat"])
          temp0.push(jsondt6["items"][0]["position"]["lng"])
          closest_addr["position"] = temp0;
          temp0 = [];
          closest_addr["distance"] = jsondt6["items"][0]["distance"];
      
          resolve(closest_addr);

        }
      });
      

    })

  });
  }

/* 
This corresponds to the UI function: "Search by Coordinates" under Search Services section
Refer: https://developer.ibm.com/apis/catalog/heremaps--geocoding-and-search-api-v7/api/API--heremaps--geocoding-and-search-api-v7#get-931594696
*/
  exports.liststores = function (query= "") {

    return new Promise((resolve, reject) => {
  
      generateToken().then((authtoken) => {
  
        let options = {
          method: 'GET',
          url: 'https://geocode.search.hereapi.com/v1/geocode',
          qs:{
            q: query
          },
          headers: {
            'Authorization': authtoken
          }
        };
        
        var addr_details = {};
        var final_addr = {};
        var arr_addr = [];
  
        request(options, function (error, response) {
          if (error) reject(error);
          const jsondt5 = JSON.parse(response.body);
  
          if(jsondt5["items"] === undefined){
            console.log("No results");
            final_addr = {};
            resolve(final_addr);
          }
          else{
        
          for(var i = 0; i<jsondt5["items"].length;i++){
                addr_details["title"] = jsondt5["items"][i]["title"];
                addr_details["address"] = jsondt5["items"][i]["address"]["label"];
                arr_addr.push(jsondt5["items"][i]["position"]["lat"])
                arr_addr.push(jsondt5["items"][i]["position"]["lng"])
                addr_details["position"] = arr_addr;
                arr_addr = [];
                final_addr[i] = addr_details;
                addr_details = {};
              }
              resolve(final_addr);
            }
        });
        
  
      })
  
    });
  }

/* 
This corresponds to the UI function: "Search by Area" under Search Services section
Refer: https://developer.ibm.com/apis/catalog/heremaps--geocoding-and-search-api-v7/api/API--heremaps--geocoding-and-search-api-v7#get271356193
*/
  exports.categorychain = function (location= "", query= "") {

    return new Promise((resolve, reject) => {

      generateToken().then((authtoken) => {

        let options = {
          method: 'GET',
          url: 'https://discover.search.hereapi.com/v1/discover',
          qs:{
            at: location,
            q: query
            //limit: '20'
          },
          headers: {
            'Authorization': authtoken
          }
        };

        var chain_details = {};
        var final_chains = {};
        var temp_ch = [];
        request(options, function (error, response) {
          if (error) reject(error);
          const jsondt2 = JSON.parse(response.body);

          if(jsondt2["items"] === undefined){
            console.log("No results");
            final_chains = {};
            resolve(final_chains);
          }
          else{
        
            for(var i = 0; i<jsondt2["items"].length;i++){
            chain_details["title"] = jsondt2["items"][i]["title"];
            chain_details["address"] = jsondt2["items"][i]["address"]["label"];
            temp_ch.push(jsondt2["items"][i]["position"]["lat"])
            temp_ch.push(jsondt2["items"][i]["position"]["lng"])
            chain_details["position"] = temp_ch;
            temp_ch = [];
            chain_details["distance"] = jsondt2["items"][i]["distance"];
        
            final_chains[i] = chain_details;
            chain_details = {};
          }
          resolve(final_chains);
        }
        });
         
      })

    });
  }

/* 
This corresponds to the UI function: "Weekly Forecast" under Weather Services section
*/
  exports.getweeklyforecast = function (lat= "", long= "") {

    return new Promise((resolve, reject) => {

      generateToken().then((authtoken) => {

        let options = {
          method: 'GET',
          url: 'https://weather.cc.api.here.com/weather/1.0/report.json',
          qs: {
            product: 'forecast_7days_simple',
            latitude: lat,
            longitude: long
          },
          headers: {
            'Authorization': authtoken
          }
        };
        
        var weekdata = {};
        var daydata = {};
        request(options, function (error, response) {
          if (error) reject(error);
          const jsonform = JSON.parse(response.body);
          
          if(jsonform["dailyForecasts"] === undefined){
            console.log("No results");
            weekdata = {};
            resolve(weekdata);
          }
          
          else{
          for(var i = 0; i<jsonform["dailyForecasts"]["forecastLocation"]["forecast"].length;i++){
        
            daydata["Day"] = jsonform["dailyForecasts"]["forecastLocation"]["forecast"][i]["weekday"];
            daydata["Description"] = jsonform["dailyForecasts"]["forecastLocation"]["forecast"][i]["description"]
            daydata["MaxTemp"] = jsonform["dailyForecasts"]["forecastLocation"]["forecast"][i]["highTemperature"]
            daydata["MinTemp"] = jsonform["dailyForecasts"]["forecastLocation"]["forecast"][i]["lowTemperature"]
            daydata["icon"] = jsonform["dailyForecasts"]["forecastLocation"]["forecast"][i]["iconLink"]
            weekdata[i] = daydata
            daydata = {}
          }
          resolve(weekdata);
          }


        });

      })


    });
  }

/* 
This corresponds to the UI function: "Extreme weather warning" under Weather Services section
*/
  exports.getalerts = function (city= "") {

    return new Promise((resolve, reject) => {

      generateToken().then((authtoken) => {

        let options = {
          method: 'GET',
          url: 'https://weather.cc.api.here.com/weather/1.0/report.json',
          qs: {
            product: 'alerts',
            name: city
          },
          headers: {
            'Authorization': authtoken
          }
        };
        
        var alert_list = {};
        request(options, function (error, response) {
            if (error) reject(error);
            const jsonform1 = JSON.parse(response.body);

            alert_list["country"] = jsonform1["alerts"]["country"];
            alert_list["state"] = jsonform1["alerts"]["state"];
            alert_list["latitude"] = jsonform1["alerts"]["latitude"];
            alert_list["longitude"] = jsonform1["alerts"]["longitude"];
  
         if(jsonform1["alerts"]["alerts"] == ''){
            alert_list["alert"] = "No Severe Weather";
          }
        else{
            alert_list["alert"] = jsonform1["alerts"]["alerts"][0]["description"];
        }

        resolve(alert_list);
      });

      })


    });
  }

/* 
This corresponds to the UI function: "Astronomy forecast" under Weather Services section
*/
  exports.getastroforecast = function (city= "") {

    return new Promise((resolve, reject) => {

      generateToken().then((authtoken) => {

        let options = {
          method: 'GET',
          url: 'https://weather.cc.api.here.com/weather/1.0/report.json',
          qs: {
            product: 'forecast_astronomy',
            name: city
          },
          headers: {
            'Authorization': authtoken
          }
        };
        
        var astro_list = {};
        var astro_full = {};
        request(options, function (error, response) {
        if (error) reject(error);
        const jsonform2 = JSON.parse(response.body);

        for(var i = 0; i<jsonform2["astronomy"]["astronomy"].length;i++){

        astro_list["sunrise"] = jsonform2["astronomy"]["astronomy"][i]["sunrise"];
        astro_list["sunset"] = jsonform2["astronomy"]["astronomy"][i]["sunset"];
        astro_list["moonrise"] = jsonform2["astronomy"]["astronomy"][i]["moonrise"];
        astro_list["moonset"] = jsonform2["astronomy"]["astronomy"][i]["moonset"];
      
        astro_full[i] = astro_list
        astro_list = {}
      }

        resolve(astro_full);
      });

      })


    });
  }
