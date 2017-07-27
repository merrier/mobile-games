/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://www.merrier.wang> <Date:2016/5/11 10:08>
 // +--------------------------------------------------------------------------*/
// JavaScript Document

//-------------------根据屏幕宽度改变html的font-size大小---------------
(function(win) {
    function setUnitA() {
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 16 + "px";
    }
    var h = null;
    window.addEventListener("resize", function() {
        clearTimeout(h);
        h = setTimeout(setUnitA, 300);
    }, false);
    setUnitA();
})(window);


//----------------省略字数--------------------
//设置class为displayPart，
//设置自定义属性，displayLength可显示长度（不包含...），双字节字符，长度 *2，
$.fn.extend({
    displayPart: function () {
        var displayLength = 100;
        displayLength = this.attr("displayLength") || displayLength;
        var text = this.text();
        if (!text) return "";

        var result = "";
        var count = 0;
        for (var i = 0; i < displayLength; i++) {
            var _char = text.charAt(i);
            if (count >= displayLength) break;
            if (/[^x00-xff]/.test(_char)) count++; //双字节字符，//[u4e00-u9fa5]中文

            result += _char;
            count++;
        }
        if (result.length < text.length) {
            result += "...";
        }
        this.text(result);
    }
});

$(".displayPart").each(function () {
    $(this).displayPart();
});


//------------------获取图片url地址---------------
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}


//------------------正则表达式验证-----------------
function regularExpression(type,val){
    var test_type = type;
    var val = val;
    var test_rule;
    switch (test_type){
        case "positive_integers":
            test_rule = /^[0-9]*[1-9][0-9]*$/;    //正整数
            break;
        case "positive_integers_zero":
            test_rule = /^[0-9]*[0-9][0-9]*$/;    //正整数(包括0)
            break;
        case "phone_number" :
            test_rule = /^1[35847][0-9][0-9]{8}$/;  //手机号
    }
    var result = test_rule.test(val);
    return result;
}

$(function () {

    //--------------------音乐播放控制------------------------------------------------
    $(".music_button").click(function(){
        var play=$(".play_button");
        var pause=$(".pause_button");
        if(play.css("display")=="block"){
            play.hide();
            pause.css("display","block");
            document.getElementsByClassName("background_music")[0].pause();      //音乐暂停
        }else{
            play.css("display","block");
            pause.hide();
            document.getElementsByClassName("background_music")[0].play();           //音乐播放
        }
    });

    //----------------------关闭蒙版--------------------
    $(".mask_black").click(function(){
        $(".mask_black").hide();
        $(".mask_common").hide();
    });

    //----------------------关闭转发朋友圈蒙版--------------------
    $(".h_f_box,.forward").click(function(){
        $(".mask_black").hide();
        $(".h_f_box,.forward").hide();
    });

    //-------------------蒙版的通用关闭----------------
    $(".mask_close").click(function(){
        $(".mask_common").fadeOut();
        $(".mask_black").fadeOut();
        $(".mask_black_noclick").fadeOut();
    });


    //--------------------分享朋友圈---------------------
    $(".btn_share").click(function(){
        $(".forward").show();
        $(".mask_black").show();
    });

    //---------------------为TA助力---------------------
    $(".btn_help").click(function(){
        $(".mask_black").show();
        $(".mask_help_success").show();
        setTimeout(function(){
            $(".mask_black").fadeOut();
            $(".mask_help_success").fadeOut();
        },1000)
    });

    //-------------------活动说明-------------------
    $(".btn_activity_des").click(function(){
        $(".rule_box").show();
        $(".mask_black").show();
    });
});