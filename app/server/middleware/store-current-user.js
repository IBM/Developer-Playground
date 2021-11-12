var LoopBackContext = require('loopback-context');

module.exports = function(options) {
  return function storeCurrentUser(req, res, next) {
    if (!req.accessToken) {
      return next();
    }

    req.app.models.MyUser.findById(req.accessToken.userId, function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(new Error('No user with this access token was found.'));
      }
      var loopbackContext = LoopBackContext.getCurrentContext();
      if (loopbackContext) {
        loopbackContext.set('currentUser', user);
        console.log("current user set in LoopBackContext:>>>> ", user);
      }
      next();
    });
  };
};
