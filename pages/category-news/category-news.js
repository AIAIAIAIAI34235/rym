// catagory_news/catagory_news.js
import network from '../../network/network.js'
import tools from '../../tools/tools.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    currentPage: 1,
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
onLoad:function(options){
  wx.setNavigationBarTitle({
    title: options.title,
  });
  this.data.index = options.index;
  this.getNews(options.index);
},
getNews: function (index) {
  network.getCatagoryNews(tools.categoryNewsUrls[index], this.data.currentPage).then(
      (res) => {
            if (this.data.currentPage == 1) {
              this.setData({
                dataList: res.newslist,
              });
              this.data.currentPage += 1;
            } else {
              this.setData({
                dataList: this.data.dataList.concat(res.newslist),
              });
              this.data.currentPage += 1;
            }
      },
    )}, 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.currentPage = 1;
    this.getNews(this.data.index);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getNews(this.data.index);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  clickItem: function (event) {
   let index = event.currentTarget.dataset.index;
   let data = this.data.dataList[index];
   wx.navigateTo({
   url: '../detail/detail?url=' + data.url + "&imgUrl" + data.picUrl + "&title=" + data.title + "&source=" + data.description + "&date=" + data.ctime,
   })
  }
})