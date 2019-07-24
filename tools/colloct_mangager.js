var manager = {
  initManager:function(){
    wx.cloud.init({
      env:"rym-wsuxq"
    });
  },
  collectNews:function(title,url,imgUrl,source,date){
    return new Promise((res,rej)=>{
      let db = wx.cloud.database();
      let news = db.collection("news");
      console.log(news);
      news.add({
        data:{
          title:title,
          url:url,
          imgUrl:imgUrl,
          source: source,
          date:date
        },
        success:function(){
          res();
        },
        fail:function(error){
          rej(error)
        }
      })
    })
  },
  getCollection:function(){
    return new Promise((res,rej)=>{
      let db = wx.cloud.database();
      let news = db.collection("news");
      news.get({
        success:function(result){
          res(result.data);
        },
        fail:function(error){
          rej(error);
        }
      });
    });
  },
  removeCollection:function(id){
    return new Promise((res,rej)=>{
      let db = wx.cloud.database();
      let news = db.collection("news");
      news.doc(id).remove({
        success:function(result){
          res();
        },
        fail:function(error){
          rej(error);
        }
      });
    })
  }
}
export default manager;