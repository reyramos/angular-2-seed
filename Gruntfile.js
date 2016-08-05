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
            app: require('./bower.json').src || 'app',
            dist: 'build'
        };

    function mountFolder(connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    function prepareDevWebpackMiddleware() {

        //Uncomment this line for rich debug option while development
        webpackConfig.devtool = "#inline-source-map";
        var compiler = webpack(webpackConfig);

        return webpackDevMiddleware(compiler, {
            // hot: true,
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
            options: webpackConfig,
            build: {
                plugins: webpackConfig.plugins.concat(
                    new webpack.DefinePlugin({
                        "process.env": {
                            // This has effect on the react lib size
                            "NODE_ENV": JSON.stringify("production")
                        }
                    }),
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin({
                        preserveComments: false,
                        mangle: true,
                        compress: {
                            sequences: true,
                            dead_code: true,
                            conditionals: true,
                            booleans: true,
                            unused: true,
                            if_return: true,
                            join_vars: true,
                            drop_console: true
                        }
                    })
                )
            },
            "build-dev": {
                devtool: "sourcemap",
                debug: true
            }
        },
        "webpack-dev-server": {
            options: {
                webpack: webpackConfig,
                publicPath: "<%= yeoman.app %>"
            },
            start: {
                keepAlive: true,
                watch: true,
                webpack: {
                    devtool: "eval",
                    debug: true
                }
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
        less: {
            development: {
                options: {
                    paths: ["src/style", "bower_components", "vendor"]
                },
                files: {
                    ".tmp/css/styles.css": "<%= yeoman.app %>/css/styles.less"
                }
            }
        },
        ngdocs: {
            options: {
                styles: ['../assets/dashboard.css', '../assets/non-responsive.css'],
                bestMatch: true,
                title: "<%= pkg.name %>",
                startPage: '/api',
                html5Mode: false
            },
            all: ['<%= yeoman.app %>/ts/**/*.ts']
        },
        connect: {
            options: {
                port: 8080,
                hostname: "0.0.0.0",
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
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= yeoman.app %>/.htaccess'],
                        dest: '<%= yeoman.dist %>',
                        filter: 'isFile'
                    }
                ]
            }
        },
        watch: {
            options: {
                livereload: '<%= connect.options.livereload %>',
                spawn: false
            },
            less: {
                files: [
                    "{.tmp,<%= yeoman.app %>}/css/**/*.less",
                    "{.tmp,<%= yeoman.app %>}/**/*.less"
                ],
                options: {
                    livereload: '<%= connect.options.livereload %>',
                    spawn: false
                }
            },
            protractor: {
                files: ['src/**/*.js', 'test/e2e/**/*_e2e.js'],
                tasks: ['protractor:auto']
            },
            karma: {
                files: ['src/**/*.js', 'test/e2e/**/*_e2e.js'],
                tasks: ['karma:unit_auto']
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

    // The development server (the recommended option for development)
    grunt.registerTask("default", ["webpack-dev-server:start"]);
    grunt.registerTask('dox', ['ngdocs']);

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