/**
 * Created by anthony on 2018/5/18.
 */
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