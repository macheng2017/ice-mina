// 集成全局变量全局方法

// 需要编译环境的支持,这样就可以支持await 和 generator 这样的运行环境了
import regeneratorRuntime from 'regenerator-runtime'
global.regeneratorRuntime = regeneratorRuntime

import _ from 'lodash'
// 将lodash挂载到global上面
global._ = _
import R from 'ramda'
global.R = R

const asyncWrap = fn => (options = {}) => new Promise((resolve, reject) => {
    let conf = {
        success: res => {
            resolve(res)
        },
        fail: err => {
            reject(err)
        }
    }
    wx[fn](R.merge(conf, options))
})
// login 是微信上的方法是基于回调的,上面的方法的目的是让下面的方法经过包装可以通过await 实现
// 可以通过 await wx.loginAsync 直接调用方法
wx.loginAsync = asyncWrap('login')
wx.getUserInfoAsync = asyncWrap('getUserInfo')
wx.requestAsync = asyncWrap('request')
wx.getSystemInfoAsync = asyncWrap('getSystemInfo')
wx.paymentAsync = asyncWrap('requestPayment')
// 动画效果依赖一个三方库
let lastTime = 0
global.requestAnimationFrame = callback => {
    const currentTime = new Date().getTime()
    const timeToCall = Math.max(0, 16 - (currentTime - lastTime))
    const timer = global.setTimeout(function () {
        callback(currentTime + timeToCall)
    }, timeToCall)
    lastTime = currentTime + timeToCall
    return timer
}
global.cancelAnimationFrame = timer => {
    clearTimeout(timer)
}
import TWEEN from 'tween.js'

TWEEN.now = function () {
    return new Date().getTime()
}

global.TWEEN = TWEEN