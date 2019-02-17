var utils=require("../../utils/util.js")
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:[],
    top250:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheaters ="/v2/movie/in_theaters?start=0&count=3";
    var top250 ="/v2/movie/top250?start=0&count=3"
    this.http(inTheaters, this.callback,"inTheaters","正在上映");
    this.http(top250, this.callback,"top250","排行榜");
  },
  http: function (classification, callback, category, categoryName) {
    wx.request({
      url: app.globalUrl.url + classification,
      header: {
        "Content-Type": "application/xml"
      },
      success(res) {
        callback(res.data, category, categoryName)
      }
    })
   
  },
  callback: function (res, category, categoryName) {//处理获取的数据
    console.log(res)
    var movies = [];
    for (var idx in res.subjects){
      var subjects=res.subjects[idx];
      // var stars = subjects.rating.stars;
      // utils.starsCount(stars);
      var title = subjects.title;
      if(title.length>6){
        title=title.substring(0,6)+"..."
      }
      var temp={
        movieImg: subjects.images.large,
        movieId: subjects.id,
        title :title,
        star: utils.starsCount(subjects.rating.stars),
        store : subjects.rating.average,
      }
      movies.push(temp);
    }
    console.log(movies)
    var readyData={};
    readyData[category]={//根据类别不一样保存在不同的对象中
      movies:movies,
      categoryName: categoryName
    }
    console.log(readyData)
    this.setData(readyData)
  },
  
  movieMore:function(e){//获取更多 电影
    var categoryName =e.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'movie-more/movie-more?categoryName=' + categoryName,//传选中的电影id到下一个页面
    })
  },
  moviedetail:function(e){//点击电影跳到详情页
    var movieid = e.currentTarget.dataset.movieid
    console.log(movieid)
    wx.navigateTo({
      url: 'movie-detail/movie-detail?movieid=' + movieid,//传参数是什么类别的
    })
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
})