//index.js
//获取应用实例
const app = getApp()
const http = require('../../utils/http.js')
const { https2http } = require('../../utils/util.js')

Page({
  data: {
    userInfo: {},
    categoriesList: [],
    infoList: [],
    activeID: 0,
    scrollTop: 0
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
  // 获取用户信息
  getUserInfo () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    }
  },
  // 获取分类信息
  getCategories () {
    let opts = {
      url: 'https://api.bilibili.com/x/article/rank/categories',
      method: 'GET',
    }
    http(opts).then(res => {
      this.setData({
        categoriesList: res
      })
      this.updateList(this.data.categoriesList[0].id)
    }).catch(res => {
      wx.showToast({
        mask: true,
        title: res.message
      })
    })
  },
  // 更新展示列表
  updateList (cid) {
    if (cid === this.data.activeID) { return }
    let opts = {
      url: 'https://api.bilibili.com/x/article/rank/list',
      data: {
        cid: cid
      },
      method: 'GET',
    }
    wx.showLoading({
      mask: true,
      title: 'loading'
    })
    http(opts).then(res => {
      res.forEach(value => {
        value.banner_url = https2http(value.banner_url)
      })
      this.setData({
        infoList: res,
        activeID: cid,
        scrollTop: 0
      })
      wx.hideLoading()
    }).catch(res => {
      wx.showToast({
        mask: true,
        title: res.message
      })
    })
  },
  cutList (event) {
    this.updateList(event.currentTarget.dataset.cid)
  },
  jumpToDetail(event) {
    wx.navigateTo({
      url: `../detail/detail?cvid=${event.currentTarget.dataset.cvid}`
    })
  }
})
