const request = require('request');
// const NodeCache = require("node-cache");
// const myCache = new NodeCache();
const OAuth = require('oauth-1.0a')
const crypto = require('crypto'); 
require('dotenv').config()

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
                // arr_addr.push(jsondt5["items"][i]["mapView"]["west"])
                // arr_addr.push(jsondt5["items"][i]["mapView"]["south"])
                // arr_addr.push(jsondt5["items"][i]["mapView"]["east"])
                // arr_addr.push(jsondt5["items"][i]["mapView"]["north"])
                // addr_details["mapview"] = arr_addr;
                // arr_addr = [];
        
                final_addr[i] = addr_details;
                addr_details = {};
              }
              resolve(final_addr);
            }
        });
        

      })

    });
  }

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
            // temp0.push(jsondt6["items"][0]["mapView"]["west"])
            // temp0.push(jsondt6["items"][0]["mapView"]["south"])
            // temp0.push(jsondt6["items"][0]["mapView"]["east"])
            // temp0.push(jsondt6["items"][0]["mapView"]["north"])
            // closest_addr["mapview"] = temp0;
            // temp0 = [];
        
            resolve(closest_addr);

          }
        });
        

      })

    });
  }

  exports.getstations = function (location= "") {

    return new Promise((resolve, reject) => {

      generateToken().then((authtoken) => {

        let options = {
          method: 'GET',
          url: 'https://transit.hereapi.com/v8/stations',
          qs: {
            in: location,
          },
          headers: {
            'Authorization': authtoken
          }
        };
        
        var station_details = {};
        var final_stations = {};
        var temp = [];

        request(options, function (error, response) {
          if (error) reject(error);
        
          const trjsondata = JSON.parse(response.body);

          if(trjsondata["stations"] === undefined){
            console.log("No results");
            final_stations = {};
            resolve(final_stations);
          }
          else{
        
          for(var i = 0; i < trjsondata["stations"].length; i++){
        
            station_details["id"] = trjsondata["stations"][i]["place"]["id"];
            station_details["name"] = trjsondata["stations"][i]["place"]["name"];
            temp.push(trjsondata["stations"][i]["place"]["location"]["lat"])
            temp.push(trjsondata["stations"][i]["place"]["location"]["lng"])
            station_details["location"] = temp;
            temp = [];
        
            final_stations[i] = station_details;
            station_details = {};
        
          }
          resolve(final_stations);
          
        
        }
      })

    });
  });
}

  exports.getdepartures = function (location= "") {

  return new Promise((resolve, reject) => {

    generateToken().then((authtoken) => {

      let options = {
        method: 'GET',
        url: 'https://transit.hereapi.com/v8/departures',
        qs: {
          in: location,
        },
        headers: {
          'Authorization': authtoken
        }
      };
      
      var dep_details = {};
      var final_dep = {};
      var temp = [];
      request(options, function (error, response) {
        if (error) reject(error);
      
        const dpjsondata = JSON.parse(response.body);

        if(dpjsondata["boards"] === undefined){
          console.log("No results");
          final_dep = {};
          resolve(final_dep);
        }
        else{
      
        for(var i = 0; i < dpjsondata["boards"].length; i++){
      
          //dep_details["id"] = dpjsondata["boards"][i]["place"]["id"];
          dep_details["name"] = dpjsondata["boards"][i]["place"]["name"];
          temp.push(dpjsondata["boards"][i]["place"]["location"]["lat"])
          temp.push(dpjsondata["boards"][i]["place"]["location"]["lng"])
          dep_details["location"] = temp;
          temp = [];
          
          final_dep[i] = dep_details;
          dep_details = {};
      
        }
        resolve(final_dep);
        }
      
      });
  });
});
}

  exports.displaydeparture = function (location= "") {

  return new Promise((resolve, reject) => {

    generateToken().then((authtoken) => {

      let options = {
        method: 'GET',
        url: 'https://transit.hereapi.com/v8/departures',
        qs: {
          in: location,
        },
        headers: {
          'Authorization': authtoken
        }
      };
      
      var dep_details1 = {};
      var final_dep1 = {};
      var dep = {};
      var fdep = [];

      request(options, function (error, response) {
        if (error) reject(error);
      
        const dpjsondata1 = JSON.parse(response.body);

        if(dpjsondata1["boards"] === undefined){
          console.log("No results");
          final_dep1 = {};
          resolve(final_dep1);
        }
        else{
      
        for(var i = 0; i < dpjsondata1["boards"].length; i++){
      
          for(var j = 0; j < dpjsondata1["boards"][i]["departures"].length; j++){
      
            dep["departure time"] = dpjsondata1["boards"][i]["departures"][j]["time"]
            dep["departure transport"] = dpjsondata1["boards"][i]["departures"][j]["transport"]["mode"]
            dep["departure point"] = dpjsondata1["boards"][i]["departures"][j]["transport"]["headsign"]
      
            fdep.push(dep);
            dep = {};
          }
          dep_details1["departure"] = fdep
          fdep = [];
          
          final_dep1[i] = dep_details1;
          dep_details1 = {};
      
        }
        resolve(final_dep1);
        }
      
      });
  });
});
}
