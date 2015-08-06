var PageMain = {
    imgUrl: './images/',
    imgArr: ["3g.png", "4k.png", "android.png", "arrow.png", "back.png", "bg1.png", "bg2.png", "btn-back.png", "btn-buy.png", "cf.png", "circle-android.png", "circle-microsoft.png", "cmp.png", "detail_bg.png", "ie.png", "index-product1.png", "index-product2.png", "index-product3.png", "index-product4.png", "list.png", "locate.png", "logo.png", "lol.png", "modernwar.png", "nfs.png", "office.png", "pdf.png", "picture1.png", "picture2-1.png", "picture2.png", "picture3-1.png", "picture3-2.png", "picture3-3.png", "picture3.png", "picture4-1.png", "picture4-2.png", "picture4.png", "picture5-1.png", "picture5-2.png", "picture5.png", "picture6-1.png", "picture6-2.png", "picture6.png", "picture7.png", "picture8-1.png", "picture8-2.png", "picture8.png", "product1.png", "product2.png", "product3.png", "product4.png", "ps.png", "qq.png", "qqcar.png", "sky.png", "sxd.png", "text.png", "tick.png", "title.png", "wechat.png", "weibo.png", "windows.png", "youku.png"],


    preloadImg: function() {
        var self = this;
        var images = self.imgArr;
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
                    self.initPageScroll();
                    self.initPageOne();
                }
            });

        });

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
                    container: '#j-panel-main',
                    sectionSelector: 'section',
                    scrollingSpeed: 800, // 滚动速度
                    scrollDelay: 0,
                    afterScroll: function(o) { //下一页加载完成之后回调函数（active类已在此之前默认添加）
                        $sectionSelector.slice(0, o.index + 4).show();
                        // debugger
                        switch (o.index) {
                            case 0:
                                self.initPageOne();
                                break;
                            case 1:
                                self.initPageTwo();
                                break;
                            default:
                                self.initPageOne();
                                break;
                        }
                    }
                });

                $(document).on('click', '.ele-arrow', function(evt) {
                    PageScroll.scrollDown();
                });
            });
        });
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
        $("#j-list").children().each(function(index) {
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