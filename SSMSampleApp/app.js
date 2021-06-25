const ejs = require('ejs');
const express = require('express');
const portfinder = require("portfinder");
const { getmysubscriptions, getsubscribers, inviteuser, revokesubscription, getcustomerdetails } = require('./services/service')


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

    
    this.app.get("/getcustomerdetails", function (request, response) {

      getcustomerdetails().then((res) => {
        response.json(res);
      })
    });
    
    
    this.app.get("/getmysubscriptions", function (request, response) {

      getmysubscriptions().then((mysubsp_list) => {
        response.json(mysubsp_list);
      })
    });

    this.app.get("/getSubscribers", function (request, response) {
      var id = request.query.id;

      getsubscribers(id).then((res) => {
        response.json(res);
      })


    });

    this.app.get("/inviteuser", function (request, response) {

      let sbpid = request.query.subspid;
      let gname = request.query.givenname;
      let uemail = request.query.useremail;
      let fname = request.query.familyname;

      inviteuser(sbpid, gname, uemail, fname).then((res) => {
        response.json({ result: "success" })
      }).catch((e) => {
        response.end({ result: "fail" })
        //console.log("Error : ",e)
      })


    });


    this.app.get("/revokesubscription", function (request, response) {
      var subid = request.query.subid;
      var seatid = request.query.seatid;

      revokesubscription(subid, seatid).then((res) => {
        response.json({ result: "success" })
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
