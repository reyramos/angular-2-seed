var webpack = require('webpack'),
    ReloadPlugin = require('webpack-reload-plugin'),
    path = require('path'),
    ChunkManifestPlugin = require('chunk-manifest-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    WebpackNotifierPlugin = require('webpack-notifier'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

/**
 * Support for extra commandline arguments
 */
var argv = require('optimist')
    .alias('r', 'release').default('r', false)
    .alias('e', 'environment').default('e', 'dev')
    .argv;

/**
 * Useful variables
 */
var cwd = process.cwd();
var DEBUG = !argv.release;
var environment = argv.environment;
var isDevServer = process.argv.join('').indexOf('webpack-dev-server') > -1;
var version = require(path.resolve(cwd, 'package.json')).version;
var reloadHost = "0.0.0.0";
var npmRoot = __dirname + "/node_modules";
var appDir = __dirname + "/app";

var entry = ["./app/ts/main.ts"]

if (isDevServer) {
    entry.unshift("webpack-dev-server/client?http://" + reloadHost + ":8080");
}

function makeConfig(options) {


    return {
        cache: true,
        debug: DEBUG,
        // verbose: true,
        // displayErrorDetails: true,
        // displayReasons: true,
        // displayChunks: true,
        context: __dirname,
        entry: {
            vendor: './app/ts/vendor.ts',
            app: entry,
        },
        stats: {
            colors: true,
            reasons: DEBUG
        },
        devtool: 'source-map',
        // devtool: 'eval',
        recordsPath: path.resolve('.webpack.json'),
        devServer: {
            inline: true,
            colors: true,
            contentBase: path.resolve(cwd, "build"),
            publicPath: "."
        },
        output: {
            path: path.resolve(cwd, "build"),
            filename: "[name].js",
            publicPath: "", // isDevServer ? './': './',
            chunkFilename: "[id].bundle.js",

            // Hot Module Replacement settings:
            hotUpdateMainFilename: "updates/[hash].update.json",
            hotUpdateChunkFilename: "updates/[hash].[id].update.js"
        },

        resolveLoader: {
            root: path.join(__dirname, 'node_modules'),
            modulesDirectories: ['node_modules'],
            fallback: path.join(__dirname, "node_modules")
        },
        resolve: {
            root: [path.resolve(cwd)],
            modulesDirectories: [
                'node_modules', 'app', 'app/ts', '.'
            ],
            extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.json', '.css', '.less'],
            alias: {
                // 'rx': '@reactivex/rxjs',
                'app': 'app',
                'scripts': npmRoot
            }
        },
        module: {
            preLoaders: [
                // { test: /\.ts$/, loader: "tslint" }
            ],

            loaders: [
                {test: /\.(png|jpg|gif)$/, loader: "url-loader?limit=50000&name=[path][name].[ext]"},
                {test: /\.json$/, loader: 'json'},
                {
                    test: /^(?!.*\.min\.css$).*\.css$/,
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")
                },
                {test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
                {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader"},
                {test: /\.html$/, loader: "raw"},
                {test: /^index\.html$/, loader: "file-loader?name=[path][name].[ext]"},
                {
                    test: /vendor\/.*\.(css|js)/,
                    loader: 'file-loader?name=[path][name].[ext]',
                    exclude: [/node_modules/]
                },
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
                {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader"},
                {test: /\.ts$/, loader: 'ts-loader', exclude: [/test/]}
            ]
        },
        tslint: {
            emitErrors: false,
            failOnHint: false
        },
        plugins: [
            new webpack.IgnorePlugin(/spec\.js$/),
            // new webpack.optimize.CommonsChunkPlugin('core.js'),
            new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js', minChunks: Infinity}),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                filename: 'common.js',
                minChunks: 2,
                chunks: ['vendor', 'app']
            }),
            // new webpack.optimize.CommonsChunkPlugin({
            //   name: 'angular',
            //   minChunks: Infinity,
            //   filename: 'angular.js'
            // }),
            new ExtractTextPlugin("styles.css"),
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(version),
                ENV: JSON.stringify(options.env)
            }),
            new HtmlWebpackPlugin({
                hash: true,
                minify:{
                    removeComments: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: false,
                    removeCommentsFromCDATA: true
                },
                environment: environment,
                template: path.join(appDir, "index.html"),
            }),
            new ReloadPlugin(isDevServer ? 'localhost' : ''),
            new WebpackNotifierPlugin({
                title: "ng-seed",
                // contentImage: path.join(appDir, 'images/notifier.png')
            }),
            // new webpack.ProvidePlugin({
            //     // Automtically detect jQuery and $ as free var in modules
            //     // and inject the jquery library
            //     // This is required by many jquery plugins
            //     jQuery: "jquery",
            //     $: "jquery"
            // })
        ],
    }
}

var config = makeConfig(argv)

console.log(require('util').inspect(config, {depth: 10}))
module.exports = config;
