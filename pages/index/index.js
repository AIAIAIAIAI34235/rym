//index.js
//获取应用实例
import network from '../../network/network.js'
import manager from '../../tools/colloct_mangager.js'
const app = getApp()

Page({
  data: {
    //头部广告数据
    headerText: "hahahahhahahha",
    //新闻数据
    dataList: [],
    //当前请求的新闻页数
    currentPage: 1,
    height:0,
    imgHeight: function (e) {
      var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
      var imgh = e.detail.height;//图片高度
      var imgw = e.detail.width;//图片宽度
      var swiperH = winWid * imgh / imgw + "px"
      //等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
      this.setData({
        Height: swiperH//设置高度
      })
    },

    
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "精选",
    });
    this.getDictum();
    this.getWxNews();
    //this.data.index = options.index;
    //this.getNews(options.index);
  },
  //名人名言
  getDictum: function a() {
    //名人名言
    let params = {
      key: "d4d368bf4288fb323afc541a6242e93e"
    };
    wx.request({
      url: 'http://api.tianapi.com/txapi/mingyan/',
      data: params,
      method: "GET",
      success: (res) => {
        console.log(res);
        this.setData({
          headerText: res.data.newslist[0].content + '\n——' + res.data.newslist[0].author
        })

      },
      fail: (res) => {
        console.log(res);
      }
    })
  },
  //新闻
  getWxNews: function b() {
    let news = {
      key: "d4d368bf4288fb323afc541a6242e93e",
      num: 20
    };
    wx.request({
      url: 'http://api.tianapi.com/wxnew/',
      data: news,
      method: "GET",
      success: (res) => {
        console.log(res);
        console.log(this.data.currentPage);
        if (this.data.currentPage == 1) {
          this.setData({
            dataList: res.data.newslist,
          });
          this.data.currentPage += 1;
        }else{
          this.setData({
            dataList: this.data.dataList.concat(res.data.newslist),
          });
          this.data.currentPage += 1;
        }
        
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },  
  //点击时候触发的详情页
  clickItem: function (event) {
    let index = event.currentTarget.dataset.index;
    let data = this.data.dataList[index];
    wx.navigateTo({
      url: '../detail/detail?url=' + data.url + "&imgUrl" + data.picUrl + "&title=" + data.title + "&source=" + data.description + "&date=" + data.ctime,
      
    })
   
  },
//页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      currentPage: 1 //当前页的一些初始数据，视业务需求而定
    })
    this.onLoad(); //重新加载onLoad()
    //this.data.currentPage = 1; 
  },
  //页面上拉底端事件处理函数
  onReachBottom: function () {
    this.getWxNews();
  },
})
  
