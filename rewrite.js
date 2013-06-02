var userid = $(".header-profile-icon").attr('alt');
$("#guest-message").each(function(){　//originalurlを取得
$(this).append("<font color='#ff0000'>ブックマークを読んだかを確認するには,はてなにログインしてください!</font>"); //タイトルの前に上記のタグを挿入しますよ。
});

if(userid){ //はてなにログインしている時のみ
$("#user-header").each(function(){　//originalurlを取得
$(this).append("<font color='#ff0000'><img src='img/favicon.png'>Read BookmarkのChorme拡張をクリックしてください！</font>"); 
});

var entrys = new Array();
$(".username").each(function(){
var bookmarkurl = $(this).attr('href');　//bookmarkurlを取得
entrys.push(escape(bookmarkurl));

});

$(".entry-link").each(function(i){　//bookmarkurlを取得
if(entrys[i]){
var readurl = 'http://reminder.asia:4000/read?url=http://b.hatena.ne.jp' + entrys[i] + "&userid=" + userid;
//var readurl = 'http://localhost:4000/read?url=http://b.hatena.ne.jp' + entrys[i] + "&userid=" + userid;
$(this).attr('href',readurl);　//reminder.asia:4000/readに書き換える
}
});


if(!$("#reminder_read")[0]){
$(".bookmarked_user .users").each(function(){　//originalurlを取得
text = "  <span id='reminder_read' style='background-color: #99CCCC'><font size='1'></font></span>";
$(this).append(text);
});
}


    var read_num =0;
    
    $.ajax({
        url: 'http://reminder.asia:4000/json/readdata?userid=' + userid,//'http://localhost:4000/json/readdata?userid=' + userid,
        type: "GET",
        success: function(res) {
            $(".entry-link").each(function(i){　//bookmarkurlを取得
                
                for (var j = 0; j<res.bookmarkread.length; j++){
                    var read_num_html = "";
                    console.log(res.bookmarkread[j].bookmarkurl);
                    console.log(unescape(entrys[i]));
                    if(res.bookmarkread[j].bookmarkurl == 'http://b.hatena.ne.jp' + unescape(entrys[i]) ){
                        if(res.bookmarkread[j].read_num > 0){
                        var readtext = "回読んだ";
                        read_num_html = res.bookmarkread[j].read_num + readtext;
                     
                        }else{
                            read_num_html = "読んでいない";
                        }
                        var readtext = "  <span id='reminder_read' style='background-color: #99CCCC'><font size='1'>" + read_num_html + "</font></span>"; 
                        $(this).append(readtext);
                        j = res.bookmarkread.length;
                     
                    }else if(j == res.bookmarkread.length-1 && entrys[i]){
                        $(this).append("  <span id='reminder_read' style='background-color: #AACCCC'><font size='1'>読んでない</font></span>");

                    } 
                }


            });


        },
        fail: function() {
        }
    });


}


