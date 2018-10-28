const http = require('http');
const querystring = require('querystring');
http.createServer(function(req,res){
  var body='';
  req.on('data',function(chunk){
    body +=chunk;
  });
  req.on('end',function(){
    res.writeHead(200);
    res.end('done');
    console.log("got name :"+querystring.parse(body).name);
  });
}).listen(3000);
