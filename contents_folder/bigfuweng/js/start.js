/**
 * Created by q on 2016/3/13.
 */
$(function(){
    //-------------------------活动规则介绍-------------------
    $(".rule_div").click(function(){
        $(".mask_black").show();
        $(".rule_box").show();
    })
    $(".mask_black").click(function(){
        $(this).hide();
        $(".rule_box").hide();
    });



    //--------------------手机号省略----------------------
    $(".marquee_phone").each(function(){
        var str1 = $(this).text().substring(0, 3);
        var str2 = $(this).text().substring(7,11);
        $(this).text(str1+"****"+str2);
    });





    //---------------------金币排行榜----------------------
    $(".start_btn_goldrank").click(function(){
        $(".mask_goldrank").show();
        $(".mask_black").show();
    });


    //--------------------点击图片关闭金币排行榜--------------------
    $(".img_goldrank").click(function(){
        $(".mask_black").hide();
        $(".mask_goldrank").hide();
    });

    //--------------------金币排行榜查看更多----------------------
    var list = $(".mask_goldrank_list");
    var len = list.length;
    console.log(len);
    for(i=50;i<=len;i++){
        list.eq(i).hide();
    }

    $(".btn_goldrank_more").click(function(){
        console.log(len);
        for(i=50;i<=len;i++){
            list.eq(i).show();
        }
    });

    //------------------金币排行榜昵称省略字数---------------
    $(".goldrank_nickname").each(function(){
        var ntext = $(this).text();
        var nlen = $(this).text().length;
        if(nlen> 5){
            $(this).text(ntext.substring(0,5) + "...");
        }
    });





});