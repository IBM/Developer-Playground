const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/sampledata', '/availabledatasets', '/columns/:dataset','/data/:dataset/:time', '/upload', '/detect', '/result?:jobid', '/status?:jobid', "/gotodownlod?:jobid", '/downlod?:jobid'],
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
};