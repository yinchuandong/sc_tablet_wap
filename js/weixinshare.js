var shareTimelineInfo = {
	appid: '',
    imgUrl: 'share.png',
    lineLink: "index.html",
    shareTitle: '昂达完美双系统平板震撼上市！',
	descContent: '截图发送给昂达微信,有机会免费获得昂达双系统平板！'
}

var shareFriendInfo = {
	appid: '',
    imgUrl: 'share.png',
    lineLink: "index.html",
	descContent: '截图发送给昂达微信,有机会免费获得昂达双系统平板！',
	shareTitle: '昂达完美双系统平板震撼上市！'
}
function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage',{
        "appid": shareFriendInfo.appid,
        "img_url": shareFriendInfo.imgUrl,
        "img_width": "100",
        "img_height": "100",
        "link": shareFriendInfo.lineLink,
        "desc": shareFriendInfo.descContent,
        "title": shareFriendInfo.shareTitle
    }, function(res) {
        _report('send_msg', res.err_msg);
    })
}
function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline',{
        "img_url": shareTimelineInfo.imgUrl,
        "img_width": "100",
        "img_height": "100",
        "link": shareTimelineInfo.lineLink,
        "desc": shareTimelineInfo.descContent,
        "title": shareTimelineInfo.shareTitle
    }, function(res) {
        _report('timeline', res.err_msg);
    });    
}
function _report(x,y){
    var code = y.split(":")[1];
    localStorage.setItem('canLottery','1');
    if(code=='ok'){
        alert('分享成功，可以开始抽奖了');
        localStorage.setItem('canLottery','1');
        $('.j-main').addClass('hide');
        $('.j-selfshare').removeClass('hide');
		$('.j-selfshare .j-part1').removeClass('hide');
		$('.j-selfshare .j-part2').addClass('hide');	
		storeShareInfo(loginfo,x);
		index.bindsharedEvent();
		$('.j-masks,.mask').addClass('hide');
    }
    // console.log(y);
}
function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo',{
        "content": shareTimelineInfo.descContent,
        "url": shareTimelineInfo.lineLink,
    }, function(res) {
        //_report('weibo', res.err_msg);
    });
}

document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
	shareFriendInfo.lineLink = shareFriendInfo.lineLink+"?loginfo="+loginfo+"&facetype="+people.index;
    shareTimelineInfo.lineLink = shareTimelineInfo.lineLink+"?loginfo="+loginfo+"&facetype="+people.index;
    // alert(shareInfo.imgUrl);

    WeixinJSBridge.on('menu:share:appmessage', function(argv){
        shareFriend();
    });
    
    WeixinJSBridge.on('menu:share:timeline', function(argv){
        shareTimeline();
    });

    WeixinJSBridge.on('menu:share:weibo', function(argv){
        shareWeibo();
    });
}, false);

function storeShareInfo(id,type)
{
	$.ajax({
		url:host+basePath+"index.php/index/sharestore",
		type:"get",
		dataType:"json",
		data:{
			'uid':id,
			'type':type
		},
		success:function(data){

		}
	});
}
