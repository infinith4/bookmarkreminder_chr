var clicked = 1;
if(!$("#notlogined")[0]){
$("#guest-message").each(function(){
var notloginedtext = "  <p id='notlogined'><font color='#ff0000'><img src='http://reminder.asia:4000/favicon.png' border='1' height='25' width='25'><b>Bookmark Reminderでブックマークを読んだかを確認するには,はてなにログインしてください!</b></font></p>";
$(this).append(notloginedtext);
});
}

var userid = $(".header-profile-icon").attr('alt');

if(userid && clicked == 1){ //はてなにログインしている時のみ
if(!$("#userlogined")[0]){
$("#user-header").each(function(){
var userloginedtext = "  <p id='userlogined'><font color='#ff0000'><img src='http://reminder.asia:4000/favicon.png' border='1' height='25' width='25'>Bookmark ReminderのChorme拡張をクリックしてください！</font></p>";
$(this).append(userloginedtext);
});
}

var entrys = new Array();
var originaltitles = new Array();
$(".mine .username").each(function(){
var bookmarkurl = $(this).attr('href');　//bookmarkurlを取得
entrys.push(escape(bookmarkurl));

});

var originalurls = new Array();
$("li.users>a").each(function(i){　//bookmarkurlを取得
var originalurl = $(this).attr('href');                                 
//console.log("originalurl");
originalurls.push(originalurl.replace('\/entry\/','http://'));
//console.log(originalurl.replace('\/entry\/','http://'));
});

$(".entry-link").each(function(i){　//bookmarkurlを取得
//var originalurl = $(this).attr('href');
if(entrys[i]){
var readurl = 'http://reminder.asia:4000/read?url=http://b.hatena.ne.jp' + entrys[i] + "&userid=" + userid + "&originalurl=" + originalurls[i];
//var readurl = 'http://localhost:4000/read?url=http://b.hatena.ne.jp' + entrys[i] + "&userid=" + userid;
originaltitles.push($(this).text());
//console.log($(this).text());
$(this).attr('href',readurl);　//reminder.asia:4000/readに書き換える

}
});

// var idList = [];

// $('span').each(function() {
// 	idList.push($(this).attr('id'));
//     });
// //alert(idList);
// console.log(idList.length);
// for(var i=0; i<idList.length; i++){
//     console.log("idlist");
//     console.log(idList[i]);
//     if(idList[i].match(/reminder_read/) == "reminder_read"){
// 	console.log("matchspan");
// 	console.log(idList[i]);
// 	//alert(idList[i]);
//         //$(".bookmarked_user .users").each(function(i){　//originalurlを取得                                                                                                                
// 		    text = "  <span id='reminder_read" + i +"'"+" style='background-color: #99CCCC'></span>";
// 		//text = "<p id='reminder_read'></p>";                                                                                                                                             
// 		$("li.users:eq(" + i + ")").append(text);
//     }
// }
if(!$("span#reminder_read")[0]){
$(".bookmarked_user .users").each(function(i){　//originalurlを取得
text = "  <span id='reminder_read" + i +"'"+" style='background-color: #99CCCC'></span>";
//text = "<p id='reminder_read'></p>";
$(this).append(text);
});
}


    var read_num =0;
    $.ajax({
        url: 'http://reminder.asia:4000/json/readdata', //?userid=' + userid,
        type: "GET",
        data: {userid: userid},
        success: function(res) {
            //alert(userid);
            //alert(res.bookmarkread[0].bookmarkurl);
            $(".entry-link").each(function(i){　//bookmarkurlを取得
                
                for (var j = 0; j<res.bookmarkread.length; j++){
                    var read_num_html = "";
                    var readtext = "";
                    //console.log(res.bookmarkread[j].bookmarkurl);
                    //console.log(unescape(entrys[i]));
                    if(res.bookmarkread[j].bookmarkurl == 'http://b.hatena.ne.jp' + unescape(entrys[i]) ){
                        
                        if(res.bookmarkread[j].read_num > 0){
                            read_num_html = res.bookmarkread[j].read_num + readtext;
                            readtext = "  <span id='reminder_read' style='background-color: #99CCCC'><font size='1'>" + read_num_html + "回読んだ</font></span>  "; 
                     
                        }else{
                            readtext = "  <span id='reminder_read' style='background-color: #FFCCCC'><font size='1'>読んでない</font></span>  ";
                        }
                        if(!$("#reminder_read")[i]){
                        $(this).append(readtext);
                        }
                        j = res.bookmarkread.length;
                     
                    }else if(j == res.bookmarkread.length-1 && entrys[i]){
                        if(!$("#reminder_read")[i]){
                        $(this).append("  <span id='reminder_read' style='background-color: #FFCCCC'><font size='1'>読んでない</font></span>  ");
                        }
                    } 
                }


            });


        },
        fail: function() {
        }
    });

    // //    $("#reminder_read").each(function(k){    
    // $.ajax({
    //     url: 'http://reminder.asia:4000/json/readdata',//http://localhost:4000/json/readdata?userid=' + userid,
    //     type: "GET",
    //     data: {userid: userid},
    //     success: function(res) {
    //         $("a.entry-link").each(function(i){　//bookmarkurlを取得
                
    //             if(res.bookmarkread.length != 0){
    //                 for (var j = 0; j<res.bookmarkread.length; j++){
    //                     var read_num_html = "";
    //                     //console.log(res.bookmarkread[j].bookmarkurl);
    //                     //console.log(unescape(entrys[i]));
    //                     if(res.bookmarkread[j].bookmarkurl == 'http://b.hatena.ne.jp' + unescape(entrys[i]) ){
    //                         //console.log("match");
	// 		    //alert('match');
	// 		    if(res.bookmarkread[j].read_num > 0){
    //                             var readtext = "回読んだ";
    //                             read_num_html = res.bookmarkread[j].read_num + readtext;
                                
    //                         }else{
    //                             read_num_html = "読んでいない";
    //                         }
    //                         var readtext =  read_num_html; 
    //                         $("span#reminder_read" + i).text(readtext)[i];
    //                         j = res.bookmarkread.length;
                            
    //                     }else if(j == res.bookmarkread.length-1 && entrys[i]){
    //                         //console.log("j:max");
	// 		    //alert("j:max");
	// 		    $("span#reminder_read" + i).text("読んでない")[i];

    //                     } 
    //                 }
    //             }else if(res.bookmarkread.length == 0){
    //                 $("span#reminder_read" + i).text("  <span id='reminder_readed' style='background-color: #FF0000'><font size='1'>読んでない</font></span>")[i];
    //             }


    //         });


    //     },
    //     fail: function() {
    //     }
    // });
    //});

    clicked = clicked + 1;
}


