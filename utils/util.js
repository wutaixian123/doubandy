const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const starsCount =function(stars){
  var starsObj = [];
  stars = stars.substring(0, 1);
  for (var i = 0; i < 5; i++) {//处理星星
    if (i < stars) {
      starsObj.push(1);
    } else {
      starsObj.push(0)
    }
  }
  return starsObj;
}

const arrayAdd =function(ar) {
  var arr = [];
  for (var i = 0; i < ar.length; i++) {
    arr.push(ar[i]);
  }
  return arr;
}

  const http = function (url, callback) {
    wx.request({
      url: url,
      method:"GET",
      header: {
        "Content-Type": "application/xml"
      },
      success(res) {
        callback(res.data)
      }
    })
  }

  const castsNameconcat = function (casts){
    var name = ""
    for (var idx in casts) {
      name = name + casts[idx].name + " / ";
    }

    return name.substring(0, name.length - 3)
  }

  const castsInfo =function(casts){//主演信息
    // var castsImg=[];
    // var castName=[];
    var caIn =[];
    for(var idx in casts){
      var castsUser = {
        name: casts[idx].name,
        img: casts[idx].avatars ? casts[idx].avatars.small :""
      }
      caIn.push(castsUser)
    }
    return caIn;
  }
module.exports = {
  formatTime: formatTime,
  starsCount: starsCount,
  http:http,
  arrayAdd: arrayAdd,
  castsInfo: castsInfo,
  castsNameconcat: castsNameconcat
}
