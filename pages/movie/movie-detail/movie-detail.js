var app = getApp();
var utils = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {//取出传过来的电影id
    console.log("options"+options.movieid)
    var movid = options.movieid;
    var getUrl = app.globalUrl.url + "/v2/movie/subject/" + movid;
    utils.http(getUrl,this.callback)
  },
  

  callback:function(res){
    console.log(res)
      var directors={
        name:"",
        id:null,
        avatars:{}
      }
      for(var i=0;i<res.directors.length;i++){
        if(res.directors[i].avatars !=null){
          directors.avatars = res.directors[i].avatars.large;
        }
        directors.name = res.directors[i].name;
        directors.id = res.directors[i].id;
      }
      // var movieInfo=[];
        var temp={
          movieImg: res.images.large,
          countries: res.countries[0],
          title: res.title,
          original_title: res.original_title,//繁体名称
          wishCount: res.wish_count,//想看人数
          comments_count: res.comments_count,//短评数量
          year:res.year,
          genres: utils.arrayAdd(res.genres),//电影类型
          star: utils.starsCount(res.rating.stars),
          score: res.rating.average,
          directors: directors.name,//导演
          casts: utils.castsNameconcat(res.casts),
          //  this.arrayadd(res.casts).name,
          castsInfo: utils.castsInfo(res.casts),//主演信息
          summary: res.summary
        }
      // movieInfo.push(temp);
      // console.log(movieInfo)
    this.setData({ movieInfo: temp})
      console.log(this.data)
  }
})