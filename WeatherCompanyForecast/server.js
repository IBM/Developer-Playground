var express = require('express');
var portfinder = require("portfinder");
require('dotenv').config()

var app = express();
portfinder.basePort = 3100;
portfinder.highestPort = 9999;
app.use(express.static('build'));


app.get("/getapikey", function(request,response) {

  response.json({"apikey" : process.env.REACT_APP_WEATHER_API_KEY});
  
})

portfinder.getPort((err, port) => {
      if (err) throw err;
      app.listen(port, () =>
        console.log(`App listening on port: ${port}`)
      );
    })
