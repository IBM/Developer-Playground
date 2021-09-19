const express = require('express')
const cors = require('cors')
const csvtojson = require('csvtojson');
const multer = require("multer");
const anomalyDetect = require('./anomalyDetect');
const fs = require('fs');
const bodyParser = require('body-parser');
const getResult = require('./getResult');
const path = require('path');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static( "./data"));


app.get("/sampledata", async (req, res) => {
  //const jsonArray = await csvtojson().fromFile("./sample.csv");
  let jsonArray = JSON.parse(fs.readFileSync("./sample.json"))
  res.status(200).json(jsonArray)
})

app.post("/detect", async (req, res) => {
  const jsonArray = await anomalyDetect(req.body)
  res.status(200).json(jsonArray)
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "data");
  },
  filename: function (req, file, cb) {
    cb(null, `data.${file.mimetype.split("/")[1]}`);
  },
});

var upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv" || file.mimetype === "application/json") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .csv and .json allowed!"));
    }
  },
}).single("file");

app.post("/upload", async (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        console.log("File size greater specifiled");
      }
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    let jsonArray = {}
    if (req.file.mimetype === "text/csv") {
      jsonArray = await csvtojson().fromFile("./data/data.csv");
      fs.writeFileSync("./data/data.json", JSON.stringify(jsonArray))
      fs.rmSync("./data/data.csv")
    } else {
      jsonArray = JSON.parse(fs.readFileSync("./data/data.json"))
    }
    res.status(200).json(jsonArray);
  });
});

app.get("/result?:jobid", async (req, res) => {
  let result = await getResult(req.query.jobid)
  console.log(req.query.jobid)
  console.log(`${__dirname}/data/result.json`)
  res.download(`${__dirname}/data/result.json`,`${req.query.jobid}.json`)
  /*console.log(JSON.stringify(result))
  let jsonArray = JSON.parse(fs.readFileSync(filepath))
  result.summary.result.forEach((res, index) => {
    jsonArray[index].anomaly_score = res.value.anomaly_score[0]
    if (res.value.anomaly_label[0] !== 1)
      jsonArray[index].anomaly = true;
    else
      jsonArray[index].anomaly = false;
  })
  res.status(200).json(jsonArray)*/
})



app.listen(4000,console.log("Server started on 4000"))