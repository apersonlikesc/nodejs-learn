var eventproxy = require('eventproxy');
var cheerio = require('cheerio');
var superagent = require('superagent');
var urle = require('url');

var starturl = "https://cnodejs.org";

superagent.get(starturl)
    .end(function(err,res){//回调
        if(err){
            return console.err(err);
        }
        var topicurl=[];
        var $=cheerio.load(res.text);
        $('#topic_list .topic_title').each(function(idx,element){
            var $element = $(element);
            var href = urle.resolve(starturl,$element.attr('href'));
            topicurl.push(href);
        });

        var ep = new eventproxy();

        ep.after('topic_html',3,function(topic){
            topic = topic.map(function(topicpair){
                var url = topicpair[0];
                var html = topicpair[1];
                var score = topicpair[2];
                 var $ = cheerio.load(html);
                // var authorurl = urle.resolve(starturl,$('.user_avatar').attr('href'));
                //  jifen = superagent.get(authorurl).end(function(err,res){
                //     if(err){
                //         return 0;
                //     }
                //     var a = cheerio.load(res.text);
                //     console.log(authorurl);
                //     console.log(a('.unstyled span.big').html());
                //     return a('.unstyled span.big').html();
                // });
                // console.log(jifen+"11");
                // console.log(typeof(jifen));
                return({
                    title: $('.topic_full_title').text().trim(),
                    href: url,
                    comment1: $('.reply_content').eq(0).text().trim(),
                    author1: $('.user_avatar img').attr('title'),
                    score1: score,
                })
            })
            // console.log(jifen+"jijijijiji");
            console.log("ok");
            console.log(topic);
        });
        var a=[];
        a[0] = topicurl[0];
        a[1] = topicurl[1];
        a[2] = topicurl[2];
        topicurl = a;
        topicurl.forEach(function(url){
            superagent.get(url)
                .end(function(err,res){
                    console.log('fetch ' + url + " successful");
                    var score = 0;
                    var $ = cheerio.load(res.text);
                    var authorurl = urle.resolve(starturl,$('.user_avatar').attr('href'));
                    superagent.get(authorurl).end(function(err,a){
                      console.log('fetch '+authorurl+" successful");
                       if(err){
                           return 0;
                       }
                       var $ = cheerio.load(a.text);
                      // console.log($('.user_profile').find('.big').html());
                       score = $('.unstyled span.big').html();
                       ep.emit('topic_html',[url,res.text,score]);
                   });

                });
        });
    });
