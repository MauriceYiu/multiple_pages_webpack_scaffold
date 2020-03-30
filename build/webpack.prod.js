const merge = require('webpack-merge');
const commonWebpackConfig = require('./webpack.base');


module.exports = merge(commonWebpackConfig, {
    mode: 'production',
    devtool: 'cheap-module-source-map'
});