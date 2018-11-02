const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        client: './src/client/index'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "assets/entry.[name].[hash].js",
        chunkFilename: "assets/dependency.[id].[chunkhash].js",
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'ts-loader' }
                ]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { minimize: false, modules: false } },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: [ 'file-loader' ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".json", ".ts", ".tsx"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/index.html'
        })
    ]
};
