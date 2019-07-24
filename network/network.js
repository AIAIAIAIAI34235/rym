var network = {
  // 获取新闻网络数据
  getCatagoryNews: function (url,page) {
    return new Promise((result, reject) => {
      wx.request({
        url: url,
        method: 'GET',
        data: {
          key: 'd4d368bf4288fb323afc541a6242e93e',
          num: 20,
          page:page
        },
        success: function (res) {
          result(res.data);
        },
        fail: function (error) {
          reject(error);
        }
      })
    });
  },
};
export default network;