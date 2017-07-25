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



//-------------------蒙版的通用关闭----------------
$(".mask_close").click(function(){
    $(".mask_common").fadeOut();
    $(".mask_black").fadeOut();
    $(".mask_black_noclick").fadeOut();
});

$(".mask_black").click(function(){
    $(".mask_black").fadeOut();
    $(".mask_common").fadeOut();
});


//--------------------分享朋友圈---------------------
$(".btn_share").click(function(){
    $(".forward").show();
    $(".mask_black").show();
});

$(".forward").click(function(){
    $(".forward").fadeOut();
    $(".mask_black").fadeOut();
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
};



////---------------背景图上传------------
//function bgImageUpload(showclass,picurl,filesize,size) {
//    var showclass = showclass;
//    var picurl = picurl;
//    var filesize = filesize;
//    var size = size;
//    var limitsize = size*1024*1000;
//    if (filesize > limitsize) {
//        alertShow("danger", "auto", "图片不能大于" + size + "M!");
//    } else {
//        $(showclass).attr("src", picurl);
//        $(showclass).siblings(".upload_img_hideinput").val(picurl);
//        alertShow("success", "auto", "图片上传成功!");
//    }
//}


//------------------字数统计-------------------
$(".input_word_limit").keyup(function () {
    var len = $(this).val().length;
    var numbox = $(this).siblings(".input_num_box");
    numbox.children(".input_num").text(len);
});



////-----------------删除标签------------------
//$("body").delegate(".tag_deletion_box i", "click", function () {
//    $(this).parents(".tag_deletion_box").remove();
//});


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
    }
    var result = test_rule.test(val);
    return result;
}


////--------------------自动完成搜索-------------------
//
//function singleAuto(input,source){
//    //input:模糊搜索的input标识,必须为字符串格式,即用""包起来;
//    //source:模糊搜索的数据源,即下拉列表项;
//
//    $(input).autocomplete({
//        source: source,
//
//        select: function( event, ui ) {
//            var span=$("<span class='singleauto_choose_span'><i class='fa fa-close singleauto_choose_delete'></i></span>");
//            if(ui.item.label.length>20){
//                var brand_name=ui.item.label.substring(0,19);
//                span.html(brand_name+"<i class='fa fa-close singleauto_choose_delete'></i>");
//            }else{
//                span.html(ui.item.label+"<i class='fa fa-close singleauto_choose_delete'></i>");
//            }
//            span.attr("name",ui.item.label);
//            $(this).parent().append(span);
//            $(this).val("").hide();
//            var choose_input=$(this).parents(".form-group").nextAll(".singleauto_choose_hideinput");
//            choose_input.val(ui.item.value);
//            $(this).parents(".form-group").next(".error_show").find("label").remove();
//            return false;
//        }
//    });
//}
////--------------------自动完成搜索-------------------
//
//
////--------------------自动完成选择项删除-------------------
//$("body").delegate(".singleauto_choose_delete","click",function(){
//    $(this).parents(".form-group").nextAll(".singleauto_choose_hideinput").find("input").val("");
//    $(this).parent().prevAll(".ui-autocomplete-input").val("").css("display","block");
//    $(this).parent().remove();
//});
////--------------------自动完成选择项删除-------------------