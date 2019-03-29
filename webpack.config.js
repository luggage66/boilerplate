const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/client/index.tsx',
    module: {
        
        rules: [
            {
                include: [path.resolve(__dirname, 'src')],
                loader: 'ts-loader',
                test: /\.tsx?$/
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader' },
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff2?)(\?v=[0-9]\.[0-9]\.[0-9][0-9])?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]?[hash]',
                        },
                    },
                ],
            },
        ]
    },

    output: {
        chunkFilename: '[name].[chunkhash].js',
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'wwwroot')
    },

    mode: 'development',

    plugins: [
        new HtmlWebpackPlugin(),
    ],

    resolve: {
        extensions: [ '.wasm', '.mjs', '.js', '.json', '.ts', '.tsx' ],
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/
                }
            },

            chunks: 'async',
            minChunks: 1,
            minSize: 30000,
            name: true
        }
    }
};
