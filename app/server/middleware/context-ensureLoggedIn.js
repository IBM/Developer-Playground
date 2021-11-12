var loopback = require('loopback');

module.exports = function () {
    return function ensureLoggedIn(req, res, next) {
        var reqContext = req.getCurrentContext();
        if (!reqContext.get('currentUser')) {
            res.redirect('/');
        }
        else {
            next();
        }
    };
};
