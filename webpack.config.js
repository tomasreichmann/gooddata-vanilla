const path = require('path');
const Uglify = require("uglifyjs-webpack-plugin");

const gdc = 'https://secure.gooddata.com/';

const proxy = {
  "/gdc": {
    "changeOrigin": true,
    "cookieDomainRewrite": "localhost",
    "target": gdc,
    onProxyReq: proxyReq => {
      // Browers may send Origin headers even with same-origin
      // requests. To prevent CORS issues, we have to change
      // the Origin to match the target URL.
      if (proxyReq.getHeader('origin')) {
        proxyReq.setHeader('origin', gdc);
      }
    }
  },
  // This is only needed for localhost:####/account.html to work
  "/packages": {
    "changeOrigin": true,
    "cookieDomainRewrite": "localhost",
    "target": gdc
  },
  "/lib": {
    "changeOrigin": true,
    "cookieDomainRewrite": "localhost",
    "target": gdc
  },
  "/images": {
    "changeOrigin": true,
    "cookieDomainRewrite": "localhost",
    "target": gdc
  },
  "/*.html": {
    "cookieDomainRewrite": "localhost",
    "changeOrigin": true,
    "secure": false,
    "target": gdc
  }
};


module.exports = {
  entry: './vanilla.js',
  output: {
    path: path.resolve(__dirname, "dist"), // string
    filename: 'gooddata_react_components_bundle.js',
    library: 'GDRC',
    libraryTarget: 'window'
  },
  plugins: [
    new Uglify(),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8999,
    proxy
  }
};
