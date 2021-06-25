const ejs = require('ejs');
const express = require('express');
const portfinder = require("portfinder");
const {addworkspace,adduser,addmember,sendpackages,deluser,getfiles,getworkspace,getusers,getpackages} = require('./services/service')


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
    res.render('index.ejs', { workspace_arr: "", user_arr: "", pkg_arr: "", list_wksp: "", transfer_finallist:"", event_finallist: "" });
  })

  this.app.get('/exit', function (req, res) {
    srvr.close(0);
  })

  this.app.get("/addworkspace", function (request, response) {

    let name = request.query.wname;
    let desc = request.query.wdesc;

    addworkspace(name,desc).then((res)=>{
      response.json({result : "success"})
    }).catch((e)=>{
      response.end({result : "fail"})
      console.log("Error  : ",e)
    })
  });

  this.app.get("/adduser", function (request, response) {

    let useremail = request.query.useremail;

    adduser(useremail).then((res)=>{
      response.json({result: "success"})
    }).catch((e)=> {
      response.end({result: "fail"})
      console.log("Error : ". e)
    })
  });


  this.app.get("/addmember", function (request, response) {

    let workspaceID = request.query.wid;
    let userperms = request.query.userperms;
    let userid = request.query.userid;

    console.log("workspaceID,userperms,userid  : ",workspaceID,userperms,userid)
     addmember(workspaceID,userperms,userid).then((res)=>{
      response.json({"result":"success"})
     }).catch((e)=>{
       response.end({result: "failure"})
       console.log("error: ",e)
     })

  });


  this.app.get("/sendpackages", function (request, response) {

    let pkgname = request.query.pkgname;
    let filepkg = request.query.filepkg;
    let userid = request.query.userid;

    sendpackages(pkgname,filepkg,userid).then((res)=>{
      response.json({result : "success"})
    }).catch((e) => {
      response.end({result : "fail"})
      console.log("error in /sendpackages: ", e)
    })

  });


  this.app.get("/deluser", function (request, response) {

    let userid = request.query.userid;

    console.log("userid  : ",userid)
     deluser(userid).then((res)=>{
      response.json({"result":"success"})
     }).catch((e)=>{
       response.end({result: "failure"})
       console.log("error: ",e)
     })

  });


  this.app.get("/getfiles", function (request, response) {

    getfiles().then((res)=>{
      response.json(res);
    }).catch((e)=>{
      console.log("error in /getfiles  : ",e)
    })
  });



  this.app.get("/getworkspace", function (request, response) {

    getworkspace().then((workspace_arr)=>{

      response.json(workspace_arr);
    
    }).catch((e)=>{
      console.log("error in /getworkspace  : ",e)
    })
  });

  this.app.get("/getusers", function (request, response) {

    getusers().then((user_arr)=>{
      response.json(user_arr);
    })
  });

  this.app.get("/getpackages", function (request, response) {

    getpackages().then((pkg_arr)=>{
      response.json(pkg_arr);
    }).catch((e) => {
      console.log("error in /getpackages: ", e)
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
