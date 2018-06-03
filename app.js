import './style/base.sass'
// 把3方库和封装好promise全局方法挂载到wx上面,这样就可以在内部使用第三方库
import './vendor'
App({
  async getUserInfo() {
    // 使用async需要进行babel编译,
    if (this.globalData.userInfo) return this.globalData.userInfo
    // 通过登录的方法拿到code
    const {
      code
    } = await wx.loginAsync()
    // 通过code 换区用户登录信息
    const {
      userInfo
    } = await wx.getUserInfoAsync()
    this.globalData.userInfo = userInfo
  },
  globalData: {
    userInfo: null
  }
})