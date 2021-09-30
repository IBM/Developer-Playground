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


  exports.liststores = function (query= "") {

    return new Promise((resolve, reject) => {
    
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
     }).catch(() => {});
  }


  exports.categorychain = function (location= "", query= "") {

    return new Promise((resolve, reject) => {

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


        request(options, function (error, response) {
          if (error) reject(error);
          try{
          const jsondt2 = JSON.parse(response.body);
          resolve(jsondt2);
          }
          catch(err){
            console.log("error in inputs provided");
          }
        
        });

      }).catch(() => {});
  }


  exports.getweeklyforecast = function (lat= "", long= "") {

    return new Promise((resolve, reject) => {

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
        

        request(options, function (error, response) {
          if (error) reject(error);

          try{
            const jsonform = JSON.parse(response.body);
            resolve(jsonform);
          }
    
          catch(err){
              console.log("error in inputs provided");
          }

        });

     }).catch(() => {});
  }


  exports.getalerts = function (city= "") {

    return new Promise((resolve, reject) => {

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
        
        request(options, function (error, response) {
            if (error) reject(error);
            try{
                const jsonform1 = JSON.parse(response.body);
                resolve(jsonform1);
            }
            catch(err){
                console.log("error in inputs provided");
            }
      });

    }).catch(() => {});
  }


  exports.getastroforecast = function (city= "") {

    return new Promise((resolve, reject) => {

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
        
        request(options, function (error, response) {
        if (error) reject(error);

        try{
        const jsonform2 = JSON.parse(response.body);
        resolve(jsonform2);
        }
        catch(err){
            console.log("error in inputs provided");
        }

      });

    }).catch(() => {});
  }
