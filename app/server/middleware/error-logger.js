module.exports = function(options) {
   return function logError(err, req, res, next) {
             if(err.statusCode == 401){
               console.log("<<<<<< AUTHORIZATION ERROR >>>>>>>>>>", req.url)
             }else{
               // console.log('IN Log Error, UNHANDLED ERROR: >>> ', req.url, err);
             }
             next(err);
          };
};
