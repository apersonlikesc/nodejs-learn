var http = require('http');
var qs = require('querystring');
http.createServer(function (req,res){
  if('/' == req.url){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(['<h1>hello world<h1>'
    ,'<form method="POST" action="/url">'
    ,'<input type="text" name="name"/>'
  ,'<button>Submit</button>'
  ,'</form>'].join(''));
  console.log("/");
}else if( '/url' == req.url && 'POST' == req.method){
  console.log("/url");
  var body='';
  req.on('data',function(chunk){
    body+=chunk;
  });

  req.on('end',function(){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end('<p>you name is '+ qs.parse(body).name+"</p>");
  });
}else{
  res.writeHead(404);
  res.end("NOT FOUND");
}
}).listen(3000);
