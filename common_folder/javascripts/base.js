/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/5/11 10:08>
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


//------------------回车事件------------------------
function keyEnter(dataname) {
    if (event.keyCode == 13)  //回车键的键值为13
        $(dataname).click(); //调用元素的点击事件
}


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


//------------------字数统计-------------------
$(".input_word_limit").keyup(function () {
    var len = $(this).val().length;
    var numbox = $(this).siblings(".input_num_box");
    numbox.children(".input_num").text(len);
});


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
//--------------------音乐播放控制------------------------------------------------


