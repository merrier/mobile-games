/**
 * Created by Merrier on 2016/4/16.
 */
$(function(){

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


    //-------------------省略字数------------------
    $.fn.extend({
        displayPart:function () {
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


    $(".displayPart").each(function(){
        $(this).displayPart();
    });

});
