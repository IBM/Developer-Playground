var getCurrentUser = require('./context-currentUser')();

module.exports = function () {
    return function contextCurrentUserApi(req, res, next) {
      // console.log("IN contextCurrentUserApi: >>> ", req.path);
        if (req.path.match(/^\/api\//)) {
            getCurrentUser(req, res, next);
        } else {
            next();
        }
    };
};
