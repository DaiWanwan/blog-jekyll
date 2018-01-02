$(function() {
    var $mybook 		= $('#mybook');
    var $bttn_next		= $('#next_page_button');
    var $bttn_prev		= $('#prev_page_button');
    var $loading		= $('#loading');
    var $mybook_images	= $mybook.find('img');
    var cnt_images		= $mybook_images.length;
    console.log(cnt_images);
    var loaded			= 0;
    //preload all the images in the book,
    //and then call the booklet plugin
    $mybook_images.each(function(){
        var $img 	= $(this);
        var source	= $img.attr('src');
        $('<img/>').load(function(){
            ++loaded;
            if(loaded == cnt_images){
                $loading.hide();
                $bttn_next.show();
                $bttn_prev.show();
                $mybook.show().booklet({
                    name:               null,                            // name of the booklet to display in the document title bar
                    width:              800,                             // container width
                    height:             500,                             // container height
                    speed:              600,                             // speed of the transition between pages
                    direction:          'LTR',                           // direction of the overall content organization, default LTR, left to right, can be RTL for languages which read right to left
                    startingPage:       0,                               // index of the first page to be displayed
                    easing:             'easeInOutQuad',                 // easing method for complete transition
                    easeIn:             'easeInQuad',                    // easing method for first half of transition
                    easeOut:            'easeOutQuad',                   // easing method for second half of transition
                    closed:             true,                           // start with the book "closed", will add empty pages to beginning and end of book
                    closedFrontTitle:   null,                            // used with "closed", "menu" and "pageSelector", determines title of blank starting page
                    closedFrontChapter: null,                            // used with "closed", "menu" and "chapterSelector", determines chapter name of blank starting page
                    closedBackTitle:    null,                            // used with "closed", "menu" and "pageSelector", determines chapter name of blank ending page
                    closedBackChapter:  null,                            // used with "closed", "menu" and "chapterSelector", determines chapter name of blank ending page
                    covers:             false,                           // used with  "closed", makes first and last pages into covers, without page numbers (if enabled)
                    pagePadding:        0,                              // padding for each page wrapper
                    pageNumbers:        true,                            // display page numbers on each page
                    hovers:             false,                            // enables preview pageturn hover animation, shows a small preview of previous or next page on hover
                    overlays:           false,                            // enables navigation using a page sized overlay, when enabled links inside the content will not be clickable
                    tabs:               false,                           // adds tabs along the top of the pages
                    tabWidth:           60,                              // set the width of the tabs
                    tabHeight:          20,                              // set the height of the tabs
                    arrows:             false,                           // adds arrows overlayed over the book edges
                    cursor:             'pointer',                       // cursor css setting for side bar areas
                    hash:               false,                           // enables navigation using a hash string, ex: #/page/1 for page 1, will affect all booklets with 'hash' enabled
                    keyboard:           true,                            // enables navigation with arrow keys (left: previous, right: next)
                    next:               $bttn_next,          			// selector for element to use as click trigger for next page
                    prev:               $bttn_prev,          			// selector for element to use as click trigger for previous page
                    menu:               null,                            // selector for element to use as the menu area, required for 'pageSelector'
                    pageSelector:       false,                           // enables navigation with a dropdown menu of pages, requires 'menu'
                    chapterSelector:    false,                           // enables navigation with a dropdown menu of chapters, determined by the "rel" attribute, requires 'menu'
                    shadows:            true,                            // display shadows on page animations
                    shadowTopFwdWidth:  166,                             // shadow width for top forward anim
                    shadowTopBackWidth: 166,                             // shadow width for top back anim
                    shadowBtmWidth:     50,                              // shadow width for bottom shadow
                    before:             function(){},                    // callback invoked before each page turn animation
                    after:              function(){}                     // callback invoked after each page turn animation
                });
//							Cufon.refresh();
            }
        }).attr('src',source);
    });
});

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
