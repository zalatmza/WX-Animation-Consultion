//index.js
//获取应用实例
const app = getApp()
const http = require('../../utils/http.js')

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    categoriesList: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad () {
    this.getUserInfo()
    this.getCategories()
  },
  getUserInfo () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getCategories () {
    let opts = {
      url: 'http://api.bilibili.com/x/article/rank/categories',
      method: 'GET',
    }
    http(opts).then(res => {
      this.setData({
        categoriesList: res
      })
    }).catch(res => {
      console.error(res.message)
    })
  }
})
