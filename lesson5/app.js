var async = require('async');

var concurrentCount = 0;
var fetchUrl = function(url, callback)
{
  var delay = parseInt((Math.random() * 10000000)%2000,10);
  concurrentCount++;
  console.log("现在的并发数是", concurrentCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
  setTimeout(function()
{
  concurrentCount--;
  callback(null,url+" html content");
},delay);//规定在delay毫秒之后采取timeout方法,估计是全部时间结束后
};

var urls=[];

for(var i = 0;i<30;i++)
{
  urls.push("http://datasource_"+ i);//制造假的链接表

}
//这个是主要的方法,使用callback函数处理数据,还有一个函数是写出log
async.mapLimit(urls,5,function(url,callback){
  fetchUrl(url,callback);
},function(err,result){
  console.log('final:');
  console.log(result);
})
