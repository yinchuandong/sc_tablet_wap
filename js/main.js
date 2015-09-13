var PageMain = {
    imgUrl: './images/',
    imgArr: ["android.png", "arrow.png", "bg1.png", "bg2.png", "btn-back.png", "btn-buy.png", "circle-android.png", "circle-microsoft.png", "detail_bg.png", "index-product1.png", "index-product2.png", "index-product3.png", "index-product4.png", "list.png", "logo.png", "picture1.png", "text.png", "title.png", "windows.png"],

    initIndex: 0,

    preloadImg: function() {
        var self = this;
        var images = self.imgArr;
        // var images = [];
        var imgLen = images.length;
        if (window.devicePixelRatio >= 1.25) {
            for (var i = 0; i < imgLen; i++) {
                images[i] = self.imgUrl + images[i].replace(/\.(jpg|png|gif)/, '@2x\.$1');
            }
        }

        // console.log(images);
        // console.log(self.imgArr)

        seajs.use('./js/imageLoader.js', function(loader) {
            loader(images, function(percent) {

                //加载完一张图片之后的回调函数
                $('.load-percent').text(Math.floor(percent * 100) + '%');
                if (percent == 1) {
                    //加载完所有图片之后
                    var hash = window.location.hash == '' ? '#index=0' : window.location.hash;
                    hash = hash.substr(1); //remove '#'
                    var params = self.parseUrl(hash);
                    self.initIndex = parseInt(params['index']);
                    self.initPageScroll();
                    self.initPageById(self.initIndex);
                }
            });

        });

    },

    parseUrl: function(str) {
        var map = {};
        var pairs = str.split('&');
        for (var i = 0; i < pairs.length; i++) {
            var arr = pairs[i].split('=');
            if (arr.length == 2) {
                map[arr[0]] = arr[1];
            } else {
                map[arr[0]] = '';
            }
        }
        return map;
    },

    initPageScroll: function() {
        var self = this;

        $('#j-panel-loading').fadeOut(function() {
            $('#j-panel-loading').remove();
            $('#j-panel-main').show();
            seajs.use('./js/pageScroll.js', function(PageScroll) {
                //开始初始化页面
                var $sectionSelector = $('#j-panel-main > section');
                // debugger
                PageScroll.init({
                    initIndex: self.initIndex,
                    container: '#j-panel-main',
                    sectionSelector: 'section',
                    scrollingSpeed: 800, // 滚动速度
                    scrollDelay: 0,
                    afterScroll: function(o) { //下一页加载完成之后回调函数（active类已在此之前默认添加）
                        //change the hash of url to save the old index
                        window.location.hash = 'index=' + o.index;
                        $sectionSelector.slice(0, o.index + 4).show();
                        // debugger
                        self.initPageById(o.index);
                    }
                });
                // debugger
                $(document).on('click', '.arrow', function(evt) {
                    PageScroll.scrollDown();
                });
            });
        });
    },

    initPageById: function(index) {
        var self = this;
        switch (index) {
            case 0:
                self.initPageOne();
                break;
            case 1:
                self.initPageTwo();
                break;
            case 2:
                self.initPageThree();
                break;
            default:
                self.initPageOne();
                break;
        }
    },

    initPageOne: function() {

        $(".android").addClass('gpu android-animate');
        $(".windows").addClass('gpu windows-animate');
        $(".text").addClass('gpu text-animate');
        $(".list").children().removeClass("list-animate");

    },

    initPageTwo: function() {
        $(".android").removeClass("android-animate");
        $(".windows").removeClass("windows-animate");
        $(".text").removeClass("text-animate");
        $(".list").children().removeClass("list-animate");
        $("#j-list-2").children().each(function(index) {
            var $ele = $(this);
            $ele.css({
                'animation-delay': '0.' + 3 * index + 's',
                '-webkit-animation-delay': '0.' + 3 * index + 's'
            });
            $ele.addClass("list-animate");
        });
    },

    initPageThree: function() {
        $(".android").removeClass("android-animate");
        $(".windows").removeClass("windows-animate");
        $(".text").removeClass("text-animate");
        $(".list").children().removeClass("list-animate");
        $("#j-list-3").children().each(function(index) {
            var $ele = $(this);
            $ele.css({
                'animation-delay': '0.' + 3 * index + 's',
                '-webkit-animation-delay': '0.' + 3 * index + 's'
            });
            $ele.addClass("list-animate");
        });
    }


};




$(document).ready(function() {
    PageMain.preloadImg();
});