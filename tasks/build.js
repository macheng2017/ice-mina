// 将项目编程成符合小程序规范的代码到mina目录
// 使用sell脚本
require('shelljs/global')
const _ = require('lodash')
const config = require('../config')
const assetsPath = config.assetsPath
const webpackConf = require('./webpack.conf')
const {
    resolve
} = require('path')
const r = url => resolve(process.cwd(), url)
const fs = require('fs')
const webpack = require('webpack')
// 新建目标目录
rm('-rf', assetsPath)
mkdir(assetsPath)
// 创建webpack编译器
// 1. 传入配置文件
const renderConf = webpackConf
const entry = () => _.reduce(config.json.pages, (en,
    i) => {
    en[i] = resolve(__dirname, '../', `${i}.mina`)
    return en
}, {})
renderConf.output = {
    path: config.assetsPath,
    filename: '[name].js'
}
renderConf.entry = entry()
renderConf.entry.app = config.app
fs.writeFileSync(resolve(config.assetsPath, './app.json'), JSON.stringify(config.json), 'utf8')

const compiler = webpack(renderConf)
// 监听文件变化
compiler.watch({}, (err, stats) => {
    if (err) {
        process.stdout.write(err)
    }
    console.log('[webpack:build]', stats.toString({
        chunks: false,
        colors: true
    }))
})