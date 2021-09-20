const ejs = require('ejs');
const express = require('express');
const {getweeklyforecast,getalerts,getastroforecast,categorychain,addrgeocode,liststores,revaddrgeocode} = require('./services/service')
const portfinder = require("portfinder");

var app = express();
portfinder.basePort = 3100;
portfinder.highestPort = 9999;

class Server {
  constructor(app) {
    this.app = app;
  }
  
  core() {
    this.app.use('/assets', express.static(__dirname + '/public'))
    this.app.set('views', __dirname + '/views');
    this.app.set('view engine', 'ejs')

    // start the server
    this.app.get('/', function (req, res) {
      res.render('index.ejs', { mysubsp_list: ""});
    })

    this.app.get('/exit', function (req, res) {
      srvr.close(0);
    })


    this.app.get("/getweeklyforecast", function (request, response) {
      
      let lat = request.query.lat;
      let long = request.query.long;

      getweeklyforecast(lat,long).then((res)=>{
      
        response.json(res);
      }).catch((e) => {
        response.end({result: "fail"})
        console.log("Error : ",e)
      })

    });

    this.app.get("/getalerts", function (request, response) {
      
      let city = request.query.city

      getalerts(city).then((res)=>{
        response.json(res);
      }).catch((e) => {
        response.end({result: "fail"})
        console.log("Error : ",e)
      })

    });

    this.app.get("/getastroforecast", function (request, response) {
      
      let city = request.query.city

      getastroforecast(city).then((res)=>{
        response.json(res);
      }).catch((e) => {
        response.end({result: "fail"})
        console.log("Error : ",e)
      })

    });


    this.app.get("/categorychain", function (request, response) {
      
      let location = request.query.location;
      let q = request.query.query;

      categorychain(location,q).then((res)=>{
        response.json(res);
      })

    });


    this.app.get("/addrgeocode", function (request, response) {

      let q = request.query.query;

      addrgeocode(q).then((res)=>{
        response.json(res);
      }).catch((e) => {
        response.end({result: "fail"})
        console.log("Error : ",e)
      })

    });

    this.app.get("/liststores", function (request, response) {

      let q = request.query.query;

      liststores(q).then((res)=>{
        response.json(res);
      }).catch((e) => {
        response.end({result: "fail"})
        console.log("Error : ",e)
      })

    });

    this.app.get("/revaddrgeocode", function (request, response) {
      
      let location = request.query.location;
      revaddrgeocode(location).then((res)=>{
        response.json(res);
      }).catch((e) => {
        response.end({result: "fail"})
        console.log("Error : ",e)
      })

    });

  }

  listen() {
    portfinder.getPort((err, port) => {
      if (err) throw err;
      this.app.listen(port, () =>
        console.log(`App listening on port: ${port}`)
      );
    });
  }
}

let server = new Server(app);
server.core();
server.listen();
