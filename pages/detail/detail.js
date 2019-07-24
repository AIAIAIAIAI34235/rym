// pages/detail/detail.js
import manager from '../../tools/colloct_mangager.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:null,
    imgUrl:null,
    source:null,
    date:null,
    title:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url:options.url,
      imgUrl:options.imgUrl,
      source:options.source,
      date:options.date,
      title:options.title
    });
    console.log(this.data.url);
    setTimeout(()=>{
      wx.showModal({
        title: '您是否收藏呢',
        content: '加入收藏列表',
        showCancel:true,//是否显示取消按钮
        cancelText:"残忍拒绝",
        confirmText:"勉强收藏",
        success:(res) => {
          if(res.cancel){
          }else{
            manager.collectNews(this.data.title,this.data.url,this.data.imgUrl,this.data.source,this.data.date).then(()=>{
              wx.showToast({
                title: '添加成功，恭喜呀',
              })
            }).catch((error)=>{
              console.log(error);
            });
          }
        },
      })
    })
    
  },

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})