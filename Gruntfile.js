var path = require('path'),
  fs = require('fs'),
  modRewrite = require('connect-modrewrite');


module.exports = function (grunt) {

// Load grunt tasks automatically
  require('load-grunt-tasks')(
    grunt, {
      config: 'package.json',
      scope: [
        'devDependencies',
        'dependencies'
      ]
    }
  );


  var webpackConfig = require("./webpack.config.js"),
    webpackDevMiddleware = require("webpack-dev-middleware"),
    webpack = require("webpack"),
    appConfig = {
      app: 'src',
      dist: 'dist'
    };

  function mountFolder(connect, dir) {
    return connect.static(require('path').resolve(dir));
  };

  function prepareDevWebpackMiddleware() {

    // //Uncomment this line for rich debug option while development
    // webpackConfig.devtool = "#inline-source-map";
    var wp = webpack(webpackConfig);
    return webpackDevMiddleware(wp, {
      noInfo: true, //don't need all the useless information, only errors
      stats: {
        colors: true
      }
    });

  }


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), // Project settings
    // Project settings
    yeoman: appConfig,
    clean: {
      server: '.tmp',
      build: '<%= yeoman.dist %>',
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      }
    },
    webpack: {
      options: require("./config/webpack.prod"),
      build: {
        profile: true,
        bail: true
      }
    },

    copy: {
      dist: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['<%= yeoman.app %>/.htaccess'],
            dest: '<%= yeoman.dist %>',
            filter: 'isFile'
          },
        ]
      }
    },

    connect: {
      options: {
        port: 8080,
        hostname: '*',
        livereload: 35729
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              modRewrite(['^[^\\.]*$ /index.html [L]']),
              connect().use(prepareDevWebpackMiddleware()),
              mountFolder(connect, appConfig.app),
              mountFolder(connect, '.')

            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>',
          middleware: function (connect) {
            return [
              modRewrite(['^[^\\.]*$ /index.html [L]']),
              mountFolder(connect, appConfig.dist)
            ];
          }
        }
      }
    },
    watch: {
      options: {
        livereload: '<%= connect.options.livereload %>',
        spawn: false
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/*.html',
          '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    }
  });


  // Production build
  grunt.registerTask("build", [
    "clean",
    "webpack:build",
    "copy"
  ]);


  grunt.registerTask('serve', function (target, env) {
    switch (target) {
      case "dist":
        return grunt.task.run([
          "build",
          "connect:dist:keepalive",
        ]);
        break;
      default:
        return grunt.task.run([
          'connect:livereload',
          'watch'
        ]);
        break;
    }
  });

};
