const http = require('http');
const querystring = require('querystring');


function send(theName) {
  http.request({
    host: '127.0.0.1',
    port: 3000,
    url: '/',
    method: 'POST'
  },function(res) {
    res.setEncoding('utf8');
    res.on('data',function(){

    }).on('end', function() {
      console.log('\nrequest complete!');
      process.stdout.write('\nyour name2: ');
    });
  }).end(querystring.stringify({
    name: theName
  }));
}


process.stdout.write('  \nyour name1: ');
process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function(name) {
  send(name.replace('\n', ''));
});
