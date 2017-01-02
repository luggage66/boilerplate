/* globals __dirname, process, require, module */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

var config = {
    entry: {
        client: './src/client/boot'
    },
    output: {
        // Make sure to use [name] or [id] in output.filename
        //  when using multiple entry points
        path: path.join(__dirname, 'static'),
        filename: "assets/entry.[name].[hash].js",
        chunkFilename: "assets/dependency.[id].[chunkhash].js",
        publicPath: '/',
    },
    module: {
        loaders: [
            { test: /\.js$/, include: [path.resolve(__dirname, 'src/')], loader: 'babel-loader' },
            { test: /\.css$/, loader: "style!css?-minimize" },
            { test: /\.scss$/, loader: 'style?-singleton!css?-minimize&modules!sass'},
            { test: /\.png$/, loader: 'file?name=assets/[hash].[ext]'},
            { test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file?name=assets/[hash].[ext]" },
            { test: /\.json$/, loader: 'json' }
        ]
    },
    plugins: [
        // so react will build in 'production mode'
        // https://github.com/webpack/webpack/issues/868
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"' + NODE_ENV + '"'
        }),
        new webpack.optimize.DedupePlugin(),
        // drop other locales from moment for size
        new webpack.ContextReplacementPlugin(/moment\/locale$/, /en|es/),
        new HtmlWebpackPlugin({
            chunks: ['client'],
            title: 'App',
            filename: 'index.html'
            //, template: 'src/client/index.html'
        })
    ],
    resolve: {
        root: [path.join(__dirname, 'src/client')],
        extensions: ["", ".webpack.js", ".web.js", ".js", ".scss"],
        alias: {
            //none, at the moment.
            react: path.join(__dirname, 'node_modules/react')
        }
    },
    devServer: {
        historyApiFallback: true
    }
};

if (NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));

    config.plugins.push(new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    }));
}

module.exports = config;
