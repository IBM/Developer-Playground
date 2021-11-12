module.exports = {
  "local": {
    "provider": "local",
    "module": "passport-local",
    "usernameField": "username",
    "passwordField": "password",
    "authPath": "/auth/local",
    "successRedirect": "/auth/account",
    "failureRedirect": "/local",
    "failureFlash": true,
    "setAccessToken" : true,
    "session" : true,
    "forceDefaultCallback" : true
  },
  "google-login": {
    "provider": "google",
    "module": "passport-google-oauth",
    "strategy": "OAuth2Strategy",
    "clientID": process.env.GOOGLE_LOGIN_CLIENT_ID,
    "clientSecret": process.env.GOOGLE_LOGIN_CLIENT_SECRET,
    "callbackURL": "/auth/google/callback",
    "authPath": "/auth/google",
    "callbackPath": "/auth/google/callback/",
    "successRedirect": "/api/MyUsers/authenticated",
    "failureRedirect": "/login",
    "scope": ["email", "profile"],
    "failureFlash": true
  }

};
