const express = require('express')
const cors = require('cors')
const csvtojson = require('csvtojson');
const multer = require("multer");
const anomalyDetect = require('./anomaly/anomalyDetect');
const getDataCarbonCharts = require('./anomaly/getDataCarbonCharts');
const fs = require('fs');
const bodyParser = require('body-parser');
const getStatus = require('./anomaly/getStatus');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' })


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("./data"));
app.use(express.static("./sample-datasets"));
app.use(express.static("./build"));


app.get("/availabledatasets", async (req, res) => {
  try {
    let jsonArray = fs.readdirSync("./sample-datasets")
    res.status(200).json(jsonArray)
  } catch {
    res.status(404).json({ "msg": "Unable to fetch data at this moment" })
  }
})

app.get("/data/:dataset/:time", async (req, res) => {
  try {
    let jsonArray
    let samples = fs.readdirSync("./sample-datasets")
    if(samples.includes(req.params.dataset))
      jsonArray = JSON.parse(fs.readFileSync(`./sample-datasets/${req.params.dataset}`))
    else
      jsonArray = JSON.parse(fs.readFileSync(`./data/customfile.json`))
    let data = getDataCarbonCharts(jsonArray,req.params.time)
    res.status(200).json(data)
  } catch {
    res.status(404).json({ "msg": "Unable to fetch data at this moment" })
  }
})

app.get(`/columns/:dataset`, async (req, res) => {
  try {
    let samples = fs.readdirSync("./sample-datasets")
    let jsonArray
    if(samples.includes(req.params.dataset))
      jsonArray = JSON.parse(fs.readFileSync(`./sample-datasets/${req.params.dataset}`))
    else
      jsonArray = JSON.parse(fs.readFileSync(`./data/customfile.json`))
    res.status(200).json(Object.keys(jsonArray[0]))
  } catch{
    res.status(404).json({ "msg": "Unable to fetch data at this moment" })
  }
})

app.post("/detect", async (req, res) => {
  try {
    const jsonArray = await anomalyDetect(req.body)
    res.status(200).json(jsonArray)
  } catch (e) {
    console.log(e)
    res.status(404).json({ "msg": e })
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
        return 4040000
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
  try {
    try{
      fs.mkdirSync("./data")
    } catch{
      
    }
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          console.log("File size greater specifiled");
        }
        return res.status(404).json(err);
      } else if (err) {
        return res.status(404).json(err);
      }
      let jsonArray = {}
      console.log(req.file)
      console.log(req.name)
      let filepath = `./data/customfile`
      if (req.file.mimetype === "text/csv") {
        jsonArray = await csvtojson().fromFile(`${filepath}.csv`);
        fs.writeFileSync(`${filepath}.json`, JSON.stringify(jsonArray))
        //fs.rmSync(`${filepath}.csv`)
      } else {
        jsonArray = JSON.parse(fs.readFileSync(`${filepath}.json`))
      }
      res.status(200).json(Object.keys(jsonArray[0]));
    });
  } catch {
    res.status(404).json({ "msg": "File Upload Failed!" })
  }
});

app.get("/result?:jobid", async (req, res) => {
  let filepath = `./data/${req.query.jobid}`
  try {
    let [status, result] = await getStatus(req.query.jobid)
    if (status !== "done")
      return res.status(404).json({ "msg": "Results are not ready yet" })
    try {
      const jsonArray = JSON.parse(fs.readFileSync(`${filepath}-data.json`))
      res.status(200).json(jsonArray)
    } catch {
      res.status(200).json([])
    }
  }
  catch (err) {
    res.status(404).json({ "msg": err })
  }
})

app.get("/status?:jobid", async (req, res) => {
  try {
    let [status, result] = await getStatus(req.query.jobid)
    res.status(200).json({ status })
  }
  catch (err) {
    res.status(404).json({ "msg": err })
  }
})
app.get("/gotodownlod?:jobid", async (req, res) => {
  console.log(req.query.jobid)
  res.send(`<html>
    <body>
      <a href="/download?jobid=${req.query.jobid}" target="_blank" onclick="window.close();">Click here to download</a>
    </body>
  </html>`)
})
app.get("/downlod?:jobid", async (req, res) => {
  let filepath = `/data/${req.query.jobid}`
  try {
    res.download(`${__dirname}${filepath}-result.json`, `${req.query.jobid}.json`)
  }
  catch {
    await getStatus(req.query.jobid)
    res.download(`${__dirname}${filepath}-result.json`, `${req.query.jobid}.json`)
  }
})

app.get("/settings/:dataset", async (req, res) => {
  try {
    let settings = JSON.parse(fs.readFileSync(`./recommended-settings/${req.params.dataset}`))
    res.status(200).json(settings)
  } catch {
    res.status(404).json({ "msg": "Unable to fetch data at this moment" })
  }
})

app.listen(4000, console.log("Server started on 4000"))