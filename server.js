const express = require('express')
const cors = require('cors')
const csvtojson = require('csvtojson');
const multer = require("multer");
const anomalyDetect = require('./anomaly/anomalyDetect');
const fs = require('fs');
const bodyParser = require('body-parser');
const getResult = require('./anomaly/getResult');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' })


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("./data"));


app.get("/sampledata", async (req, res) => {
  //const jsonArray = await csvtojson().fromFile("./sample.csv");
  let jsonArray = JSON.parse(fs.readFileSync("./data/sample.json"))
  res.status(200).json(jsonArray)
})

app.post("/detect", async (req, res) => {
  try {
    const jsonArray = await anomalyDetect(req.body)
    res.status(200).json(jsonArray)
  } catch(e) {
    console.log(e)
    res.status(500)
  }
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "data");
  },
  filename: function (req, file, cb) {
    cb(null, `customfile.${file.mimetype.split("/")[1]}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: (req, file, cb) => {
      if (file.mimetype === "application/json")
        return 10000000
      else
        return 5000000
    }
  },
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
    console.log(req.file)
    console.log(req.name)
    let filepath = `./data/customfile`
    if (req.file.mimetype === "text/csv") {
      jsonArray = await csvtojson().fromFile(`${filepath}.csv`);
      fs.writeFileSync(`${filepath}.json`, JSON.stringify(jsonArray))
      fs.rmSync(`${filepath}.csv`)
    } else {
      jsonArray = JSON.parse(fs.readFileSync(`${filepath}.json`))
    }
    res.status(200).json(jsonArray);
  });
});

app.get("/result?:jobid", async (req, res) => {
  let filepath = `./data/${req.query.jobid}`
  try {
    const jsonArray = JSON.parse(fs.readFileSync(`${filepath}-data.json`))
    res.status(200).json(jsonArray)
  }
  catch(e){
    //let result = await getResult(req.query.jobid)
    console.log(e)
  }
})

app.get("/downlod?:jobid", async (req, res) => {
  let filepath = `/data/${req.query.jobid}`
  try {
    res.download(`${__dirname}${filepath}-result.json`, `${req.query.jobid}.json`)
  }
  catch {
    await getResult(req.query.jobid)
    res.download(`${__dirname}${filepath}-result.json`, `${req.query.jobid}.json`)
  }
})


app.listen(4000, console.log("Server started on 4000"))