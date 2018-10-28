const net = require('net');
var count = 0
,users={}
var server = net.createServer(function(conn){
  console.log('new connection!');
  var nickname;
  conn.setEncoding('utf8');
  conn.write('    \033[31m\n here is '+ count+' people in the server\n\033[39m');
  conn.write('    \033[31m\n here type you nickname:\033[39m');
  count++;
  conn.on('data',function(data){
    data = data.replace('\n','').replace('\r','');
    if(data==''){
      return;
    }
    if(!nickname){
      if(users[data]){
        conn.write("    \033[31mnickname is used already,try again!\033[39m");
        return;
      }else{
        nickname = data;
        users[nickname]=conn;
        broadcast("   \033[31m"+nickname+" join the room!\n\033[39m");
        console.log(">>>>>>>   "+nickname+" join the room!\n");
      }
    }else{
      broadcast(nickname+":  "+data+"\n",true);
      }
  });

  conn.on('close',function(){
    count--;
    delete users[nickname];
    broadcast("   \033[31m"+nickname+" leave the room!\n\033[39m");
    console.log(">>>>>>   "+nickname+" leave the room!\n");
  });


function broadcast(msg,exceptMyself){
  for(var i in users){
    if(!exceptMyself || i!=nickname){
      users[i].write(msg);
    }
  }
}
});
server.listen(3000,function(){
  console.log('server is listening');
});
