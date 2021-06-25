const ejs = require('ejs');
const express = require('express');
const dotenv = require('dotenv');
const portfinder = require("portfinder");
dotenv.config();
const { getatmlocation, calcloanpayable } = require('./services/service')


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
      res.render('index.ejs');
    })

    this.app.get('/exit', function (req, res) {
      srvr.close(0);
    })


    this.app.get("/getatmlocation", function (request, response) {

      let zipcode = request.query.zipcode;

      getatmlocation(zipcode).then((res) => {
        response.json(res);
      }).catch((e) => {
        response.end({ result: "fail" })
        //console.log("Error : ",e)
      })

    });

    this.app.get("/calcloanpayable", function (request, response) {

      let emi = request.query.emi;
      let tenure = request.query.tenure;

      calcloanpayable(emi, tenure).then((res) => {
        response.json(res)
      }).catch((e) => {
        response.end({ result: "fail" })
        //console.log("Error : ",e)
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
