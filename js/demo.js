/**
 * Created by anthony on 2018/5/18.
 */
$(document).ready(function(){
    $('div.cell').hover(function() {
        $(this).find('.details').fadeTo('fast', 0.8);
    }, function() {
        $(this).find('.details').fadeOut('fast');
    });
});
