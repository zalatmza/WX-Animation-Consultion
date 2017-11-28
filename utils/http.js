/**
 * Created by wconisan on 2017/11/28.
 */
function http (opts) {
  return new Promise((resolve, reject) => {
    let defaultOpts = {
      success (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      },
      fail (error) {
        reject({
          code: '-9999',
          message: '服务器炸了~'
        })
      }
    }
    let reqOpts = Object.assign(defaultOpts, opts)
    wx.request(reqOpts)
  })
}

module.exports = http