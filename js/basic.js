/**
 * Created by anthony on 2017/12/27.
 */
$(document).ready(function() {
    //导航栏提示框
    var delay={"show": 800, "hide": 800};
    var selector=$('.navbar-nav > li');
    $('[data-toggle="tooltip"]').tooltip(delay,selector);

//    音乐的播放和暂停
    function _musicControl () {
        var music = document.getElementById("bgMusic");
        $(".musicControl").click(function(){
            event.stopPropagation();
            if(music.paused){
                music.play();
                $(".musicControl>i").removeClass("fa-play").addClass("fa-pause");
                $(".musicControl+img").removeClass("picture-pause");
            }else{
                music.pause();
                $(".musicControl>i").removeClass("fa-pause").addClass("fa-play");
                $(".musicControl+img").addClass("picture-pause");
            }
        });
    }
    _musicControl();
    window.onresize=resizeBannerImage;//当窗口改变宽度时执行此函数
    function resizeBannerImage() {
        if( $(window).width() > 992 && $(window).scrollTop()>200) {
            $('.return-top').show(1000);
        }else {
            $('.return-top').hide(300);
        }
    }
    $(window).scroll(function(){   //当窗口滑动到某一位置执行
        var _width = $(window).width();
        if($(window).scrollTop()>200 && _width > 992) {
            $('.return-top').show(1000);

        } else {
            $('.return-top').hide(300);
        }
    });
    $(".return-top").click(function () {
        $("html, body").animate({
            scrollTop: $("header").offset().top }, {duration: 600,easing: "swing"});
        return false;
    });
});
