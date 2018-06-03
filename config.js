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
            "list": [
                { // 小程序的 tavbar
                    "iconPath": "static/home.png",
                    // 两个icon切换
                    "selectedIconPath": "static/home-selected.png",
                    // 入口文件位置
                    "pagePath": "pages/index/index",
                    "text": "家族脸谱"
                },
                { // 小程序的 tabbar
                    "iconPath": "static/user.png",
                    // 两个icon切换
                    "selectedIconPath": "static/user-selected.png",
                    // 入口文件位置
                    "pagePath": "pages/logs/logs",
                    "text": "我的账户"
                },
                { // 小程序的 tabbar
                    "iconPath": "static/user.png",
                    // 两个icon切换
                    "selectedIconPath": "static/user-selected.png",
                    // 入口文件位置
                    "pagePath": "pages/logs/logs",
                    "text": "我的账户1"
                }
            ]
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