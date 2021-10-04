const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/upload','/labelpurity','/outlierdetection','/classoverlap','/classparity','/datacompleteness','/dataduplicates','/datahomogeneity','/dataprofile','/results'],
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
    })
  );
};