const {
    resolve
} = require('path')
const r = url => resolve(__dirname, url)
// 当前程序运行的位置
const assetsPath = resolve(process.cwd(), './mina')
module.exports = {
    "json": {
        "pages": [
            "pages/index/index",
            "pages/logs/logs"
        ],
        "tabBar": {
            "selectedColor": "#5aaca5",
            "color": "#565656",
            "list": []
        }
    },
    "window": {
        "backgroundTextStyle": "light",
        "navigationBarBackgroundColor": "#fff",
        "navigationBarTitleText": "权利的游戏",
        "navigationBarTextStyle": "black"
    },
    assetsPath: assetsPath,
    "app": r('./app.js')
}