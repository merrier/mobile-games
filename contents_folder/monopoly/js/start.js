/**
 * Created by q on 2016/3/13.
 */
$(function(){

    //--------------------开骰按钮------------------
    $(".start_btn_begin").click(function(){
        window.location.href='main.html';
    });

    //-------------------------��������-------------------
    $(".rule_div").click(function(){
        $(".mask_black").show();
        $(".rule_box").show();
    })
    $(".mask_black").click(function(){
        $(this).hide();
        $(".rule_box").hide();
    });



    //--------------------�ֻ���ʡ��----------------------
    $(".marquee_phone").each(function(){
        var str1 = $(this).text().substring(0, 3);
        var str2 = $(this).text().substring(7,11);
        $(this).text(str1+"****"+str2);
    });





    //---------------------������а�----------------------
    $(".start_btn_goldrank").click(function(){
        $(".mask_goldrank").show();
        $(".mask_black").show();
    });


    //--------------------���ͼƬ�رս�����а�--------------------
    $(".img_goldrank").click(function(){
        $(".mask_black").hide();
        $(".mask_goldrank").hide();
    });

    //--------------------������а�鿴����----------------------
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

    //------------------������а��ǳ�ʡ������---------------
    $(".goldrank_nickname").each(function(){
        var ntext = $(this).text();
        var nlen = $(this).text().length;
        if(nlen> 5){
            $(this).text(ntext.substring(0,5) + "...");
        }
    });

});