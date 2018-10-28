var fs = require('fs')
,stdin = process.stdin
,stdout = process.stdout

console.log(process.argv);
fs.readdir(__dirname, function(err, files) {
  console.log(files);

  if (!files.length) {
    return console.log(' \033[31m no files\033[39m\n');
  }

  console.log('select file or dir to see');
  var stats = [];
  function file(i) {
    var filename = files[i];

    fs.stat(__dirname+'/'+filename, function(err, stat) {
      stats[i] = stat;
      if (stat.isDirectory()) {
        console.log(' ' + i + ' \033[32m' + filename + '\033[32m');
      }else{
        console.log(' ' + i + ' \033[36m' + filename + '\033[39m');
      }
      i++;
      if (i == files.length) {
        read();
      } else {
        file(i);
      }
    });
  }

  function read(){
    console.log(' ');
    stdout.write(' \033[36menter you choice\033[39m');
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data',option);
  }
  function option(data)
  {
    var filename = files[Number(data)];
    if(!filename)
    {
      stdout.write("不存在文件");
    }else{
      stdout.write("获取文件");
      stdin.pause();

      if(stats[Number(data)].isDirectory())
      {
        fs.readdir(__dirname+'/'+filename,function(err,files){
          console.log(' ');
          console.log(" ("+files.length+'files)');
          files.forEach(function(file){
            console.log(" - "+file);
          });
          console.log(" ");
        });
      }else{
        fs.readFile(__dirname+'/'+ filename,'utf8',function(err,data){
            console.log(" ");
          console.log(data.replace(/(.*)/g,'  $1'));
        });
      }

    }
  }


  file(0);
})
