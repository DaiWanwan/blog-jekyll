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
//    箭头变色和网页滑动
    $(".navigator .text-a").hover(function(){
        $(".navigator .text-a>span").addClass("section-a-hover");
    },function () {
        $(".navigator .text-a>span").removeClass("section-a-hover");
    }).click(function () {
        $("html, body").animate({
            scrollTop: $("#blogList").offset().top }, {duration: 600,easing: "swing"});
        return false;
    });

    //徽章的位置和搜索
    function sidebar() {
        // 徽章相对网页位置
        var _searchlist=$(".sidebar-outline");
        var secHight=$("#poster").height();
        $(window).scroll(function(){
            var offsetop;//$('div.sidebar-outline').offset().top;
            if($(window).width()>=992 && $(window).scrollTop()>secHight+90){
                // 徽章相对网页位置
                offsetop=$(window).scrollTop()-secHight-30+"px";
                _searchlist.animate({marginTop:offsetop},{duration:1000,queue:false},"ease-out")
            }


        });

        $(window).on("resize",function(){
            if($(window).width()<992) {
                _searchlist.css({marginTop:57+"px"});
            }
        });

        //   侧边栏搜索功能的实
        var _searchli=$(".sidebar-outline>li");
        var _taglist=$("#cd-timeline>.cd-timeline-block>.cd-timeline-content");
        var _timelist=$("#cd-timeline>.cd-timeline-block>.cd-timeline-img");
        var len=_taglist.length;
        for(var k=0;k<_searchli.length;k++)(function (k) {
            $(_searchli[k]).click(function () {
                for (var i = 0; i < len; i++) {
                    $(_taglist[i]).addClass("hode");
                    $(_timelist[i]).addClass("hode");
                    var tag_p = _taglist[i].getElementsByClassName("tags");
                    var tag_ps = tag_p[0].getElementsByClassName("label");
                    var p_len = tag_ps.length;
                    for (var j = 0; j < p_len; j++) {
                        if (k == 1) {
                            if (tag_ps[j].innerHTML == "JavaScript") {
                                $(_taglist[i]).removeClass("hode");
                                $(_timelist[i]).removeClass("hode");
                            }
                        }else if (k == 2) {
                            for (var j = 0; j < p_len; j++) {
                                if (tag_ps[j].innerHTML == "算法") {
                                    $(_taglist[i]).removeClass("hode");
                                    $(_timelist[i]).removeClass("hode");
                                }
                            }
                        }else if(k==3){
                            for (var j = 0; j < p_len; j++) {
                                if (tag_ps[j].innerHTML == "CSS") {
                                    $(_taglist[i]).removeClass("hode");
                                    $(_timelist[i]).removeClass("hode");
                                }
                            }
                        }else {
                            $(_taglist[i]).removeClass("hode");
                            $(_timelist[i]).removeClass("hode");
                        }
                    }
                }
            });
        })(k)

        _searchlist.click(function () {
            $("html, body").animate({
                scrollTop: $("#blogList").offset().top }, {duration: 1000,easing: "swing"});
            return false;
        });
    }
    sidebar();



    //    小树生长
    var drawtree = function (ctx,startx,starty,length,angle,depth,branchWidth){

        var rand=Math.random,
            n_length,n_angle,n_depth,maxbranch=4,
            endx,endy,maxangle=2 * Math.PI / 4;
        var subbranch;
        ctx.beginPath();
        ctx.moveTo(startx,starty);
        endx=startx + length * Math.cos(angle);
        endy=starty + length * Math.sin(angle);
        ctx.lineCap='round';
        ctx.lineWidth=branchWidth;
        ctx.lineTo(endx,endy);
        if(depth<=2 ){
            //树的枝干
            ctx.strokeStyle= 'rgb(0,' + (((rand() * 64) +128) >>0) + ',0)';
        }
        else{
            //树的叶子
            ctx.strokeStyle= 'rgb(0,' + (((rand() * 64) +64) >>0) + ',50,25)';
        }
        ctx.stroke();
        n_depth = depth-1;
        //判断树是否结束
        if(!n_depth){
            return;
        }
        subbranch= (rand() * (maxbranch-1)) + 1;
        branchWidth *=0.5;
        for(var i=0;i<subbranch;i++){
            n_angle = angle +rand() * maxangle -maxangle *0.5;
            n_length = length * (0.5 + rand() *0.5);
            setTimeout(function (){
                drawtree(ctx,endx,endy,n_length,n_angle,n_depth,branchWidth);
                return;
            },500)
        }
    };
    var canvas=document.getElementById('tree');
    var ctx= canvas.getContext('2d');
//初始化的树
    drawtree(ctx,500,770,100,-Math.PI / 2, 12, 12);




    window.onresize=resizeBannerImage;//当窗口改变宽度时执行此函数
    function resizeBannerImage() {
        if( $(window).width() > 992 && $(window).scrollTop()>920) {
            $('.return-top').show(1000);
        }else {
            $('.return-top').hide(300);
        }
    }
    $(window).scroll(function(){   //当窗口滑动到某一位置执行
        var _width = $(window).width();
        if($(window).scrollTop()>920 && _width > 992) {
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
