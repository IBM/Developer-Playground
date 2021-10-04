var express = require('express');
var multer = require('multer')
var portfinder = require("portfinder");
const {getresults, getclassoverlap, getclassparity, getlabelpurity, getoutlierdetection, chkdatacompleteness, chkdataduplicates, chkdatahomogeneity, chkdataprofile} = require('./services.js');

var app = express();
portfinder.basePort = 3100;
portfinder.highestPort = 9999;

app.use(express.static('build'));

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null,'datafolder' )
    },
    filename: function (req, file, cb) {
      cb(null, "data.csv" )
    }
})


var upload = multer({
  storage: storage,
  limits: { fileSize: 15000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .csv allowed!'));
    }
  }
}).single('file');


app.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               if(err.code === "LIMIT_FILE_SIZE"){
                   console.log('File size greater than 15MB');
               }
                // res.send({result:"File is too large"});
              // console.log("ERR1: ", err);
               return res.status(500).json(err)
               //return("File size greater than 3MB");
              
               //return(err); 
           } else if (err) {
               //console.log("ERR2: ", err);
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});

app.get('/', function(req,res){

  res.json("Express is connected");

});


app.get('/labelpurity', (req, res) => {

  let label = req.query.label;
  let fpath = req.query.fpath;
  let fname = req.query.fname;

     getlabelpurity(label,fpath,fname)
            .then((response) => {
                res.send({result: response});
            
          })
            .catch((err) => {
                res.end({ result: "fail" })
            })

     
    });

app.get('/outlierdetection', (req, res) => {

  let label = req.query.label;
  let fpath = req.query.fpath;
  let fname = req.query.fname;

     getoutlierdetection(label,fpath,fname)
            .then((response) => {
                res.send({result: response});
            
          })
            .catch((err) => {
                res.end({ result: "fail" })
            })

     
    });

app.get('/classoverlap', (req, res) => {

  let label = req.query.label;
  let fpath = req.query.fpath;
  let fname = req.query.fname;

     getclassoverlap(label,fpath,fname)
            .then((response) => {
                res.send({result: response});
            
          })
            .catch((err) => {
                res.end({ result: "fail" })
            })

     
    });

app.get('/classparity', (req, res) => {

  let label = req.query.label;
  let fpath = req.query.fpath;
  let fname = req.query.fname;

     getclassparity(label,fpath,fname)
            .then((response) => {
                res.send({result: response});
            
          })
            .catch((err) => {
                res.end({ result: "fail" })
            })
    });

app.get('/datacompleteness', (req, res) => {

  let fpath = req.query.fpath;
  let fname = req.query.fname;

     chkdatacompleteness(fpath,fname)
            .then((response) => {
                res.send({result: response});
            
          })
            .catch((err) => {
                res.end({ result: "fail" })
            })

     
    });

app.get('/dataduplicates', (req, res) => {

  let fpath = req.query.fpath;
  let fname = req.query.fname;

     chkdataduplicates(fpath,fname)
            .then((response) => {
                res.send({result: response});
            
          })
            .catch((err) => {
                res.end({ result: "fail" })
            })

     
    });

app.get('/datahomogeneity', (req, res) => {

  let fpath = req.query.fpath;
  let fname = req.query.fname;

     chkdatahomogeneity(fpath,fname)
            .then((response) => {
                res.send({result: response});
            
          })
            .catch((err) => {
                res.end({ result: "fail" })
            })

     
    });

app.get('/dataprofile', (req, res) => {

  let fpath = req.query.fpath;
  let fname = req.query.fname;

     chkdataprofile(fpath,fname)
            .then((response) => {
                res.send({result: response});
            
          })
            .catch((err) => {
                res.end({ result: "fail" })
            })

     
    });


app.get('/results', (req, res) => {

  let jobid = req.query.jobid;

     getresults(jobid)
            .then((response) => {
                res.send({result: response});
            
          })
            .catch((err) => {
                res.end({ result: "fail" })
            })

     
    });



   
portfinder.getPort((err, port) => {
      if (err) throw err;
      app.listen(port, () =>
        console.log(`App listening on port: ${port}`)
      );
    })
