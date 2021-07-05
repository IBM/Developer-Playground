const ejs = require('ejs');
const express = require('express');
const dotenv = require('dotenv');
const portfinder = require("portfinder");
dotenv.config();
const { getclassparity, getresults, checkserver, getclassoverlap, getlabelpurity, getoutlierdetection, chkdatacompleteness, chkdataduplicates, chkdatahomogeneity, chkdataprofile } = require('./services/service')
const multer = require("multer");
const path = require('path');
const fs = require('fs');

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
  
    var upload = multer({
      dest: "/projects/data-quality/DataQuality/filefolder"
      }).single('upfile');

    var upload1 = multer({
        dest: "/projects/data-quality/DataQuality/filefolder"
        }).single('upfile1');
    
    this.app.post("/upload", upload, function(req,res) {
     
      // File is not uploaded
        if(req.file == undefined){

          res.send({result:"no file"});
        }

        // File uploaded
        else{

        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "./filefolder/data.csv");

        // check extension
        if ((path.extname(req.file.originalname).toLowerCase() === ".csv"))  {

          // check file size
                if(req.file.size <= 15728640){

                  fs.rename(tempPath, targetPath, er => { 
                    res.send({ result: "file uploaded" })
                  });

                }
                else{
                  fs.unlink(tempPath, err => {
                    if (err) throw(err);
                    else{
                      res.send({result:"File is too large"});
                    }
                });
              }
          
        } else {

            fs.unlink(tempPath, err => {
              if (err) throw(err);
              else{
                res.send({result:"File is not a CSV"});
              }
              
            });
        }
       }
       
    });

    this.app.post("/uploaddq", upload1, function(req,res) {

      // File is not uploaded
        if(req.file == undefined){

          res.send({result:"no file"});
        }

        // File uploaded
        else{

        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "./filefolder/data.csv");

        // check extension
        if ((path.extname(req.file.originalname).toLowerCase() === ".csv"))  {

          // check file size
                if(req.file.size <= 15728640){

                  fs.rename(tempPath, targetPath, er => { 
                    res.send({ result: "file uploaded" })
                  });

                }
                else{
                  fs.unlink(tempPath, err => {
                    if (err) throw(err);
                    else{
                      res.send({result:"File is too large"});
                    }
                });
                }

          
        } else {

            fs.unlink(tempPath, err => {
              if (err) throw(err);
              else{
                res.send({result:"File is not a CSV"});
              }
              
            });
        }
       }
       
    });
  
   
    this.app.get("/getclassparity", function (request, response) {

      let label = request.query.label;
      let fpath = request.query.fpath;
      let fname = request.query.fname;

      getclassparity(label,fpath,fname).then((res) => {
        response.json(res);
      }).catch((e) => {
        response.end({ result: "fail" })
        //console.log("Error : ",e)
      })

    });

    this.app.get("/getclassoverlap", function (request, response) {

      let label = request.query.label;
      let fpath = request.query.fpath;
      let fname = request.query.fname;

      getclassoverlap(label,fpath,fname).then((res) => {
        response.json(res);
      }).catch((e) => {
        response.end({ result: "fail" })
        //console.log("Error : ",e)
      })

    });

    this.app.get("/getlabelpurity", function (request, response) {

      let label = request.query.label;
      let fpath = request.query.fpath;
      let fname = request.query.fname;

      getlabelpurity(label,fpath,fname).then((res) => {
        response.json(res);
      }).catch((e) => {
        response.end({ result: "fail" })
        //console.log("Error : ",e)
      })

    });

    this.app.get("/getoutlierdetection", function (request, response) {

      let label = request.query.label;
      let fpath = request.query.fpath;
      let fname = request.query.fname;

      getoutlierdetection(label,fpath,fname).then((res) => {
        response.json(res);
      }).catch((e) => {
        response.end({ result: "fail" })
        //console.log("Error : ",e)
      })

    });


    this.app.get("/getresults", function (request, response) {

      let jobid = request.query.jobid;

      getresults(jobid).then((res) => {
        response.json(res);
      }).catch((e) => {
        response.end({ result: "fail" })
        //console.log("Error : ",e)
      })

    });

    this.app.get("/checkserver", function (request, response) {

      checkserver().then((res) => {
        response.json(res);
      }).catch((e) => {
        response.end({ result: "fail" })
        //console.log("Error : ",e)
      })

    });


    this.app.get("/chkdatacompleteness", function (request, response) {

      let fpath = request.query.fpath;
      let fname = request.query.fname;

      chkdatacompleteness(fpath,fname).then((res) => {
        response.json(res);
      }).catch((e) => {
        response.end({ result: "fail" })
        //console.log("Error : ",e)
      })

    });

    this.app.get("/chkdataduplicates", function (request, response) {

      let fpath = request.query.fpath;
      let fname = request.query.fname;

      chkdataduplicates(fpath,fname).then((res) => {
        response.json(res);
      }).catch((e) => {
        response.end({ result: "fail" })
        //console.log("Error : ",e)
      })

    });

    this.app.get("/chkdatahomogeneity", function (request, response) {

      let fpath = request.query.fpath;
      let fname = request.query.fname;

      chkdatahomogeneity(fpath,fname).then((res) => {
        response.json(res);
      }).catch((e) => {
        response.end({ result: "fail" })
        //console.log("Error : ",e)
      })

    });

    this.app.get("/chkdataprofile", function (request, response) {

      let fpath = request.query.fpath;
      let fname = request.query.fname;

      chkdataprofile(fpath,fname).then((res) => {
        response.json(res);
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
