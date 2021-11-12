module.exports = {
  "restApiRoot": "/api",
  "aclErrorStatus": 403,
  "remoting": {
    "json": {
      "strict": false,
      "limit": "100kb"
    },
    "urlencoded": {
      "extended": true,
      "limit": "100kb"
    },
    "rest": {
      "normalizeHttpPath": false,
      "xml": false,
      "handleErrors": false
    },
    "cors": false  
  },
  "logoutSessionsOnSensitiveChanges": true,
  "legacyExplorer": false,
  "cookieSecret": "246bace2-38cb-4138-85d9-0ae8160b07c8"
};
