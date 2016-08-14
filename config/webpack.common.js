var path = require("path");

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');


module.exports = {
  context: path.dirname(__dirname),
  cache: true,


  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    root: path.resolve(path.dirname(__dirname)),
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
    modulesDirectories: ['node_modules']

  },

  module: {
    loaders: [

      {test: /\.(png|jpg|gif)$/, loader: "url-loader?limit=50000&name=[path][name].[ext]"},
      {test: /\.json$/, loader: 'json'},
      {
        test: /^(?!.*\.min\.css$).*\.css$/,
        // include: helpers.root('src', 'app'),
        // loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap"
        loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap'})
      },
      {
        test: /\.less$/,
        // loader: "style!css!less"
        loader: "raw!less"
      },
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader"},
      {test: /\.html$/, loader: "raw"},
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?mimetype=application/font-woff&name=[path][name].[ext]"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?mimetype=application/x-font-ttf&name=[path][name].[ext]"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?\??$/,
        loader: "file-loader?mimetype=application/vnd.ms-fontobject&name=[path][name].[ext]"
      },
      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?mimetype=application/font-otf&name=[path][name].[ext]"
      },
      {
        test: /\.ts$/,
        loaders: ['ts-loader', 'angular2-template-loader'],
        exclude: [/test/]
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        collapseBooleanAttributes: false,
        removeCommentsFromCDATA: true
      },
      template: 'src/index.html'
    })
  ]
};
