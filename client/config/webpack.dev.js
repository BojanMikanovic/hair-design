const webpack = require('webpack'),
   { merge } = require('webpack-merge'),
   common = require('./webpack.config');

process.env.TAILWIND_MODE = 'watch';

module.exports = async () => {
   return merge(common({ tailwindOptions: {}, rootCssLoader: 'style-loader' }), {
      mode: 'development',

      devtool: 'eval',

      output: {
         publicPath: '/',
      },

      devServer: {
         hot: true,
         port: 5228,
         historyApiFallback: true,
         proxy: [
            {
               context: ['/api'],
               target: 'http://localhost:5227',
               changeOrigin: true,
               secure: false,
               logLevel: 'debug',
            },
         ],
      },
   });
};
