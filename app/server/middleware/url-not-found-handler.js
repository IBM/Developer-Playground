'use strict'

var path = require('path')

module.exports = function () {
  // 4XX - URLs not found
  return function customRaiseUrlNotFoundError (req, res, next) {
    console.log('A route was received by the server to be resolved: ' + req.path);

    if(req.path.indexOf('/api') != -1){
      console.log('API Called: >> ');
      console.log(req.path);
      next();
    } else if (/^(.*\..*)/.test(req.path)) {
      console.log('This route is an image or something with an extension, responding back with the file url.')
      res.send(req.originalUrl)
    } else {
      if(req.path.indexOf('/botframework') != -1){
        console.log("MS Bot API Call >>> ");
      }else{
        console.log('This isn\'t a route that is known to the server, but angular might know about it.')
        console.log(req.path);
      }
      // res.sendFile(path.resolve('client/dist/index.html'))
      next();
    }
  }
}
