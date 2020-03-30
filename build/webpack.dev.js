const merge = require('webpack-merge');
const commonWebpackConfig = require('./webpack.base');
const path = require('path');
const webpack = require("webpack");


module.exports = merge(commonWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9999,
        hot: true,
        open:true
    },
    optimization:{
        usedExports: true,
        splitChunks:{
            chunks:'all'
        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
});