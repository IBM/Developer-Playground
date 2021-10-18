const express = require('express');
const {addworkspace,adduser,addmember,sendpackages,deluser,getfiles,getworkspace,getusers,getpackages} = require('./services.js')


var app = express();

app.use(express.static('build'));

  app.get("/addworkspace", function (request, response) {

    let name = request.query.wname;
    let desc = request.query.wdesc;

    addworkspace(name,desc).then((res)=>{
      response.json({result : "success"})
    }).catch((e)=>{
      response.end({result : "fail"})
    //   console.log("Error  : ",e)
    })
  });

  app.get("/adduser", function (request, response) {

    let useremail = request.query.useremail;

    adduser(useremail).then((res)=>{
      response.json({result: "success"})
    }).catch((e)=> {
      response.end({result: "fail"})
      // console.log("Error : ", e)
    })
  });


  app.get("/addmember", function (request, response) {

    let workspaceID = request.query.wid;
    let userperms = request.query.userperms;
    let userid = request.query.userid;

     addmember(workspaceID,userperms,userid).then((res)=>{
      response.json({result: "success"})
     }).catch((e)=>{
       response.end({result: "failure"})
       //console.log("error: ",e)
     })

  });


  app.get("/sendpackages", function (request, response) {

    let pkgname = request.query.pkgname;
    let filepkg = request.query.filepkg;
    let userid = request.query.userid;

    sendpackages(pkgname,filepkg,userid).then((res)=>{
      response.json({result : "success"})
    }).catch((e) => {
      response.end({result : "fail"})
      // console.log("error in /sendpackages: ", e)
    })

  });


  app.get("/deluser", function (request, response) {

    let userid = request.query.userid;

     deluser(userid).then((res)=>{
      response.json({result: "success"})
     }).catch((e)=>{
       response.end({result: "failure"})
       //console.log("error: ",e)
     })

  });


  app.get("/getfiles", function (request, response) {

    getfiles().then((res)=>{
      response.json({result: res});
    }).catch((e)=>{
      response.end({result: "failure"})
      //console.log("error in /getfiles  : ",e)
    })
  });


  app.get("/getworkspace", function (request, response) {

    getworkspace().then((workspace_arr)=>{
      response.json({result: workspace_arr});
    }).catch((e)=>{
      response.end({result: "failure"})
      //console.log("error in /getworkspace  : ",e)
    })
  });

  app.get("/getusers", function (request, response) {

    getusers().then((user_arr)=>{
      response.json({result: user_arr});
    }).catch((e)=>{
      response.end({result: "failure"})
      //console.log("error in /getworkspace  : ",e)
    })
  });

  app.get("/getpackages", function (request, response) {

    getpackages().then((pkg_arr)=>{
      response.json({result: pkg_arr});
    }).catch((e) => {
       response.end({result: "failure"})
      //console.log("error in /getpackages: ", e)
    })

  });


  app.listen(8000, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("App is listening on port  : ", 8000)
    }
  });
