// // 
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


// // 配置文件
const config = require('./webpack.config');

// 获取html文件名
let list = [];
const getFileOrDirNameList = (pathInfo,type) => {
    let dirList = fs.readdirSync(pathInfo);
    if(type == 'file'){
        dirList.forEach(item => {
            let fileTruePath = path.join(pathInfo, item);
            let stats = fs.statSync(fileTruePath)
            if(stats.isDirectory()){
                getFileOrDirNameList(fileTruePath,'file');
            }else{
                if (item.indexOf('html') > -1) {
                    list.push(item.split('.')[0]);
                }
            }
        });
        
        return list;
    }
    return dirList;
};


let htmlFiles = getFileOrDirNameList(config.PAGES_PATH,'file');

let HTMLWebpackPlugins = []; // 保存HTMLWebpackPlugin实例
let Entries = {}; // 保存入口列表

// 生成HTMLWebpackPlugin实例和入口列表
htmlFiles.forEach((page) => {
    let htmlConfig = {
        filename: `${page}.html`,
        template: path.join(config.PAGES_PATH, `./${page}/${page}.html`) // 模板文件
    };

    htmlConfig.chunks = [page, 'commons'];
    Entries[page] = `./src/pages/${page}/${page}.js`;

    const htmlPlugin = new HtmlWebpackPlugin(htmlConfig);
    HTMLWebpackPlugins.push(htmlPlugin);
});
console.log(Entries)
module.exports = {
    context: config.PROJECT_PATH, // 入口、插件路径会基于context查找
    entry: Entries,
    output: {
        filename:'js/[name].js',
        path: config.BUILD_PATH // 打包路径，本地物理路径
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {loader:'babel-loader'}
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "postcss-loader" },
                    { loader: "sass-loader" }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        query: {
                            name: "[name]_[hash].[ext]",
                            outputPath: "assets/",
                            limit: 5120,
                            fallback: 'file-loader'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        query: {
                            outputPath: 'css/',
                            name: '[name][hash].[ext]',
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        ...HTMLWebpackPlugins, // 扩展运算符生成所有HTMLPlugins
        new CopyWebpackPlugin([
            {
                from: path.resolve(config.STATIC_PATH),
                to: 'static',
                ignore: ['.*']
            }
        ]),
        new CleanWebpackPlugin()
    ]
}
