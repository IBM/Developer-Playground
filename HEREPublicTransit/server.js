var express = require('express');
var portfinder = require("portfinder");
require('dotenv').config()
const {addrgeocode,revaddrgeocode,getstations,getdepartures} = require('./services.js')

var app = express();
portfinder.basePort = 3100;
portfinder.highestPort = 9999;
app.use(express.static('build'));

app.get("/addrgeocode", function (request, response) {

      let queryst = request.query.queryst;

      addrgeocode(queryst).then((res)=>{
        response.json(res);
      }).catch((e) => {
        console.log("Error : ",e)
      })

    });

app.get("/revaddrgeocode", function (request, response) {
      
      let location = request.query.location;

      revaddrgeocode(location).then((res)=>{
        response.json(res);
      }).catch((e) => {
        response.end({result: "fail"})
        console.log("Error : ",e)
      })

    });

app.get("/getstations", function (request, response) {
      
      let location = request.query.location;

      getstations(location).then((res)=>{
        response.json(res);
      }).catch((e) => {
        response.end({result: "fail"})
        console.log("Error : ",e)
      })

    });

app.get("/getdepartures", function (request, response) {
      
      let location = request.query.location;
      getdepartures(location).then((res)=>{
        response.json(res);
      }).catch((e) => {
        response.end({result: "fail"})
        console.log("Error : ",e)
      })

    });


app.get("/getapikey", function(request,response) {

  response.json({"apikey" : process.env.REACT_APP_APIKEY});
  
})

portfinder.getPort((err, port) => {
      if (err) throw err;
      app.listen(port, () =>
        console.log(`App listening on port: ${port}`)
      );
    })
