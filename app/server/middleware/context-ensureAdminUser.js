var loopback = require('loopback');
var WError = require('verror').WError;

module.exports = function () {
	return function ensureAdminUser(req, res, next) {
		var reqContext = req.getCurrentContext();
		var roles = reqContext.get('currentUserRoles');


		if (roles && roles.length) {
			for (var i = 0; i < roles.length; i++) {
				if (roles[i].role().name === 'superuser') {
					reqContext.set('isSuperUser', 'true');
				}
			}

			for (var i = 0; i < roles.length; i++) {
				if (roles[i].role().name === 'admin') {
					return next();
				}
			}
		}

		res.redirect('/admin/need-login');
	};
};
