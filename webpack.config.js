/* globals __dirname, process, require, module */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8081;

var config = {
    entry: {
        client: [
            `webpack-hot-middleware/client?path=http://localhost:${PORT}/__webpack_hmr`,
            'webpack/hot/only-dev-server',
            './src/client/boot'
        ]
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
        rules: [
            {
                test: /\.js$/,
                exclude: [ /node_modules/ ], // only babel-ize our own code
                use: ['babel-loader' ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader', options: { singleton: false } },
                    { loader: 'css-loader', options: { minimize: false, modules: true } },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test:/\.png$/,
                use: [
                    { loader: 'file-loader', options: { name: 'assets/[hash].[ext]' } }
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    { loader: 'file-loader', options: { name: 'assets/[hash].[ext]' } }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({ // so react will build in 'production mode'
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
        }),
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
        extensions: [".js", ".json", ".scss"],
        alias: {
            // force single react version, I forgot what broken library made me do this
            react: path.join(__dirname, 'node_modules/react')
        }
    },
    devServer: {
        historyApiFallback: true
    }
};

if (NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
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
