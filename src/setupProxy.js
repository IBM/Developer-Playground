const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/sampledata', '/upload', '/detect', '/result?:jobid', '/status?:jobid', '/downlod?:jobid'],
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
};