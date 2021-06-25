const ejs = require('ejs');
const express = require('express');
const portfinder = require("portfinder");
const {addrgeocode,revaddrgeocode,getstations,getdepartures,displaydeparture,checkserver} = require('./services/service')


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



    this.app.get("/addrgeocode", function (request, response) {

      let q = request.query.query;

      addrgeocode(q).then((res)=>{
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

    this.app.get("/getstations", function (request, response) {
      
      let location = request.query.location;
      getstations(location).then((res)=>{
        response.json(res);
      }).catch((e) => {
        response.end({result: "fail"})
        console.log("Error : ",e)
      })

    });

    this.app.get("/getdepartures", function (request, response) {
      
      let location = request.query.location;
      getdepartures(location).then((res)=>{
        response.json(res);
      }).catch((e) => {
        response.end({result: "fail"})
        console.log("Error : ",e)
      })

    });

    this.app.get("/displaydeparture", function (request, response) {
      
      let location = request.query.location;
      displaydeparture(location).then((res)=>{
        response.json(res);
      }).catch((e) => {
        response.end({result: "fail"})
        console.log("Error : ",e)
      })

    });
    
    this.app.get("/checkserver", function (request, response) {
      
      checkserver().then((res)=>{
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
