var request = require('request');
var fs = require('fs');
var array = fs.readFileSync('src/components/auth.txt').toString().split("\n");
var authtoken = array[0];

exports.addrgeocode = function (queryst= "") {

  queryst = queryst.toString();

  return new Promise((resolve, reject) => {

      let options = {
        method: 'GET',
        url: 'https://geocode.search.hereapi.com/v1/geocode',
        qs:{
          q: queryst
        },
        headers: {
          'Authorization': authtoken
        }
      };
      
      request(options, function (error, response) {
        if (error) reject(error);

        try{
        const jsondt5 = JSON.parse(response.body);
        
        resolve(jsondt5);
          
          }
          catch(err){
          console.log("error in inputs provided");
          }
          
      });
  })
  .catch(() => {});
}


  exports.revaddrgeocode = function (location= "") {

    location = location.toString();

  return new Promise((resolve, reject) => {

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
      
      request(options, function (error, response) {
        if (error) reject (error);
      try{
        const jsondt6 = JSON.parse(response.body);
        resolve(jsondt6);  
        }
      catch(err){
          console.log("error in inputs provided");
        }
      });
      
  }).catch(() => {});
  }

exports.getstations = function (location= "") {

    location = location.toString();

    return new Promise((resolve, reject) => {
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
        
        request(options, function (error, response) {
          if (error) reject(error);

         try{
            const trjsondata = JSON.parse(response.body);
            resolve(trjsondata);
         }
         catch(err){
          console.log("error in inputs provided");
         }
      });
  }).catch(() => {});
  }

exports.getdepartures = function (location= "") {

    location = location.toString();
  return new Promise((resolve, reject) => {

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
      
      request(options, function (error, response) {
        if (error) reject(error);
      
        try{
            const dpjsondata = JSON.parse(response.body);
            resolve(dpjsondata);
        }
        catch(err){
            console.log("error in inputs provided");
        }
      });
}).catch(() => {});
  }
