const webpack = require('webpack'),
      path = require('path'),
   { merge } = require('webpack-merge'),
   common = require('./webpack.config'),
    devCerts = require("office-addin-dev-certs");;

process.env.TAILWIND_MODE = 'watch';

module.exports = async () => {
   let ssl = await devCerts.getHttpsServerOptions();
   return merge(common({ tailwindOptions: {}, rootCssLoader: 'style-loader' }), {
      mode: 'development',

      devtool: 'eval',

      output: {
         publicPath: 'https://localhost:7088/',
      },

      devServer: {
         hot: true,
         port: 7088,
         historyApiFallback: true,
         static: path.join(__dirname, "../public"),
         server:{
            type: 'https',
            options: ssl
         }
      },
   });
};
