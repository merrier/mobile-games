/**
 * Created by hmmoshang on 17/1/11.
 */
$(function () {
    setTimeout(function () {
        $('.mask_black').show();
        $('.activity_begin').show();
    },5000);
    setTimeout(function () {

        $('.activity_begin').hide();
        $('.countdowm').show();
    },8000);
    setTimeout(function () {
        $('.last_join').hide();
        $('.golden_egg').hide();
        $('.next_join').hide();
        $('.qr_code').hide();
        $('.prompt_message').hide();
        $('.activity_begin').hide();
        $('.countdowm').hide();
        $('.end').show();
    },10000);
})