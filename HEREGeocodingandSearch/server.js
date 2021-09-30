var express = require('express');
const {getweeklyforecast,getalerts,getastroforecast,categorychain,addrgeocode,liststores,revaddrgeocode} = require('./services.js')

var app = express();

app.use(express.static('build'));

    app.get("/getweeklyforecast", function (request, response) {
      
      let lat = request.query.lat;
      let long = request.query.long;

      getweeklyforecast(lat,long).then((res)=>{
      
        response.json(res);
      }).catch((e) => {
        response.end({result: "fail"})
        console.log("Error : ",e)
      })

    });

    app.get("/getalerts", function (request, response) {
      
      let city = request.query.city

      getalerts(city).then((res)=>{
        response.json(res);
      }).catch((e) => {
        response.end({result: "fail"})
        console.log("Error : ",e)
      })

    });

    app.get("/getastroforecast", function (request, response) {
      
      let city = request.query.city

      getastroforecast(city).then((res)=>{
        response.json(res);
      }).catch((e) => {
        response.end({result: "fail"})
        console.log("Error : ",e)
      })

    });


    app.get("/categorychain", function (request, response) {
      
      let location = request.query.location;
      let q = request.query.query;

      categorychain(location,q).then((res)=>{
        response.json(res);
      })

    });


    app.get("/addrgeocode", function (request, response) {

      let queryst = request.query.queryst;

      addrgeocode(queryst).then((res)=>{
        response.json(res);
      }).catch((e) => {
        console.log("Error : ",e)
      })

    });

    app.get("/liststores", function (request, response) {

      let q = request.query.query;

      liststores(q).then((res)=>{
        response.json(res);
      }).catch((e) => {
        response.end({result: "fail"})
        console.log("Error : ",e)
      })

    });

    app.get("/revaddrgeocode", function (request, response) {
      
      let location = request.query.location;

      // console.log("location api end: ",location);

      revaddrgeocode(location).then((res)=>{
        response.json(res);
      }).catch((e) => {
        response.end({result: "fail"})
        console.log("Error : ",e)
      })

    });

  


    app.listen(8000, function() {

    console.log('App running on port 8000');

    });