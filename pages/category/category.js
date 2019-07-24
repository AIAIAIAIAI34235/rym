// pages/category/category.js
import manager from '../../tools/colloct_mangager.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '收藏',
    });
    manager.getCollection().then(
      (result)=>{
        this.setData({
          dataList: result
        });
      }).catch((error)=>{
         console.log(error);
      })
   
  },
  longTop:function(event){
    wx.showModal({
      title: 'Sure 删除?',
      content: '是否删除？',
      showCancel:true,
      cancelText:"不了！",
      confirmText:"删除",
      success:(res) => {
        if(res.cancel){
        }else{
          let index = event.currentTarget.dataset.index;
          let data = this.data.dataList[index];
          //console.log(data._id);
          manager.removeCollection(data._id).then(()=>{
            wx.showToast({
              title:"删除成功",
            });
            this.data.dataList.splice(index,1);
            this.setData({
              dataList:this.data.dataList
            });
          }).catch((error)=>{
            console.log(error);
          })
        }
      }
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

  },
  clickCategory: function (event) {
   
  },
  clickItem: function (event) {
    let index = event.currentTarget.dataset.index;
    let data = this.data.dataList[index];
    wx.navigateTo({
      url: '../colloct_detail/colloct_detail?url=' + data.url + "&imgUrl" + data.picUrl + "&title=" + data.title + "&source=" + data.description + "&date=" + data.ctime,
    })
  }
})