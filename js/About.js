/**
 * Created by anthony on 2017/12/26.
 */
"use strict";
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
var BloomFall = function(id, initConfig)
{
    var config = {
        minSpeed   : 0.5,
        maxSpeed   : 1.5,
        deepth     : 5,
        minSize    : 0.3, //%
        maxSize    : 0.5, //%
        bloomCount : 600,
        color      : 120 //hsl color
    };

    var blooms  = null;
    var canvas  = document.createElement('canvas');
    var engine  = canvas.getContext('2d');
    var target  = null;
    var width   = 0;
    var height  = 0;
    var minSize = 0;
    var maxSize = 0;
    var rel     = 0;

    //tick handler
    var frame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(cb) { return setTimeout(cb, 30) };

    //construct
    var construct = function()
    {
        for (var key in initConfig) {
            config[key] = initCcnfig[key];
        }

        target = document.getElementById(id);
        target.appendChild(canvas);

        canvas.style.padding = 0;
        canvas.style.margin  = 0;

        buildBlooms();
    };

    var buildBlooms = function()
    {
        blooms = new Array(config.bloomCount);

        for (var i = 0; i < config.bloomCount; i++) {
            blooms[i] = {
                x  : Math.random() * 1.1,
                y  : Math.random() * 1.1 - 0.1,
                dy : Math.random(),
                dx : 0 - Math.random(),
                dz : Math.random(),
                z  : Math.random(),
                c  : 0.5 - Math.random(),
                o  : 0.8,
                cc : {
                    n : [Math.random(), Math.random()],
                    e : [Math.random(), Math.random()],
                    s : [Math.random(), Math.random()],
                    w : [Math.random(), Math.random()]
                }
            };
        }
    };

    this.run = function()
    {
        tick();
    };

    var tick = function()
    {
        resize();
        engine.clearRect(0, 0, width, height);
        renderBlooms();

        frame(tick);
    };

    var resize = function()
    {
        width  = target.clientWidth;
        height = target.clientHeight;
        rel    = width / height;

        var base = (width + height) / 2 / 100;
        minSize  = base * config.minSize;
        maxSize  = base * config.maxSize;

        canvas.width  = width;
        canvas.height = height;
    };

    var renderBlooms = function()
    {
        engine.fillStyle = 'hsla(' + config.color + ', 100%, 90%, 0.5)';


        for (var i = 0; i < config.bloomCount; i++) {
            renderBloom(i);
        }

    };

    var renderBloom = function(index)
    {
        var bloom = blooms[index];

        var x  = bloom.x * width;
        var y  = bloom.y * height;

        var r  = minSize + (maxSize - minSize) * bloom.z;
        var o  = (1 - bloom.z / maxSize) * bloom.o;
        var cd = bloom.c * 60 + 50;

        engine.fillStyle = 'hsla(' + config.color + ', 100%, ' + cd + '%, ' + o + ')';

        var cc = bloom.cc;

        engine.beginPath();

        engine.moveTo(x     + cc.n[0], y - r * cc.n[1]);
        engine.lineTo(x + r * cc.e[0], y     + cc.e[1]);
        engine.lineTo(x     + cc.s[0], y + r * cc.s[1]);
        engine.lineTo(x - r * cc.w[0], y     + cc.w[1]);
        engine.lineTo(x     + cc.n[0], y - r * cc.n[1]);

        //engine.arc(
        //    x,
        //    y,
        //    r,
        //    0,
        //    Math.PI * 2
        //);

        if (y - r >= height || x - r > width || o <= 0) {
            blooms[index].y = Math.random();
            blooms[index].x = Math.random();
            blooms[index].r = Math.random();
            blooms[index].z = Math.random();
            blooms[index].o = 0.001;
        } else {
            blooms[index].y += bloom.dy / 1000 * rel;
            blooms[index].x += bloom.dx / 1000 - 0.0002;
            blooms[index].z += bloom.dz / 50;

            if (blooms[index].o < 1) {
                blooms[index].o += 0.01;
            }
        }

        engine.fill();
        engine.closePath();
    };

    construct();
};


var bf = new BloomFall('target');
bf.run();



