const path = require('path');
const PROJECT_PATH = process.cwd(); // 项目目录

module.exports = {
    PROJECT_PATH, // 项目目录
    CONFIG_PATH: path.join(__dirname), // 配置文件目录
    SRC_PATH: path.join(PROJECT_PATH, './src/'), // 源文件目录
    STATIC_PATH: path.join(PROJECT_PATH, './src/static/'),//静态文件目录
    BUILD_PATH: path.join(PROJECT_PATH, './dist/'), // 打包目录
    PAGES_PATH: path.join(PROJECT_PATH, './src/pages/'),//页面目录
    ASSETS_PATH: path.join(PROJECT_PATH, './src/assets/'),//静态文件
    NODE_MODULES_PATH: path.join(PROJECT_PATH, './node_modules/') // node_modules目录
};