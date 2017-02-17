const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, './src/app'),
    entry: {
        app: './app.ts',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    "presets": ["es2015"]
                }
            },
            {
                test:/\.html$/,
                loader: 'raw-loader'
            },
            // Comment the code below if you want to compile from sass to css, using 'webpack' from CLI
            {
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
            // Uncomment the code below only when you want to compile sass to css
            /*{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ],
                }),
            },*/
        ],
    },
    output: {
        path: path.resolve(__dirname, './src/build'),
        publicPath: '/assets/',
        filename: '[name].bundle.js'
    },
    plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                template: '../../index.html'
            })
    ],
        // Uncomment the code below to transpile from scss to css
        /*new ExtractTextPlugin ({
            filename: "[name].css",
            allChunks: true
        }),*/
    resolve: 
    {
        extensions: ['.ts', '.tsx', '.js']
    },
};