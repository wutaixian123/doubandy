var app=getApp();
var utils=require("../../../utils/util.js")
Page({
  data: {
    movies:[],
    totalCount:0,
    concatMovie:[],
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var getUrl =app.globalUrl.url;
    var allUrl="";
    var categoryName = options.categoryName;
    this.setData({ categoryName: categoryName})
    switch (options.categoryName){//判断类别
      case "正在上映":
        allUrl = getUrl + "/v2/movie/in_theaters"
        console.log(allUrl)
        break;
      case "排行榜":
        allUrl = getUrl +"/v2/movie/top250"
        console.log(allUrl)
        break;
    };
    this.setData({allUrl:allUrl})
    utils.http(allUrl,this.callback);//请求更多的分类电影
    wx.showNavigationBarLoading();//请求的时候标题栏有一个加载动画
  },
  onPullDownRefresh(){//下拉刷新
    var refreshUrl=this.data.allUrl;
    this.data.concatMovie=[];
    this.data.isEmpty=true;
    utils.http(refreshUrl,this.callback)
  },
  onReachBottom(){//上拉加载
   var countUrl = this.data.allUrl + "?start=" + this.data.totalCount+"&count=20";
    utils.http(countUrl, this.callback);
    wx.showNavigationBarLoading();
  },
  callback: function (res) {
    console.log(res);
    var movies=[];
    for (var idx in res.subjects) {
      var subjects = res.subjects[idx];
      // var stars = subjects.rating.stars;
      // utils.starsCount(stars);
      var title = subjects.title
      if (title.length > 6) {
        title = title.substring(0, 6) + "..."
      }
      var temp = {
        movieImg: subjects.images.large,
        movieId: subjects.id,
        title:title,
        star: utils.starsCount(subjects.rating.stars),
        store: subjects.rating.average,
      }
      movies.push(temp);
    }
    var totalCount=[];
    //如果非第一次请求时要拼接
    if (!this.data.isEmpty){
      //非第一次加载时是以前的movies拼接刚刚的movies
     totalCount=this.data.movies.concat(movies);
    }else{
      //第一次加载时
      totalCount=movies;
      this.data.isEmpty =false;
    }
    this.setData({ movies: totalCount});
    this.data.totalCount+=20;//数据加载完之后再请求20条
    wx.hideNavigationBarLoading();////请求的完成时候标题栏去掉动画
  },
  moviedetail: function (e) {//点击电影跳到详情页
    console.log(e.currentTarget.dataset.movieid)
    var movieid =e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?movieid=' + movieid,//传该电影的id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({//动态设置标题
      title: this.data.categoryName
    })
  },

  
})