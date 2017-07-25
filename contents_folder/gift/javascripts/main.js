/**
 * Created by Yangyue on 2016/11/23.
 */
$(function(){


    var gift_number;
    var row=Math.floor($(".main").height()/$(".gift").height());
    var col=Math.floor($(".main").width()/$(".gift").width());
    console.log(row);
    console.log(col);

    var top;
    var left;
    setInterval(function(){
        gift_number=Math.ceil(Math.random()*3);
        for(var i=0;i<gift_number;i++){
            var img=$("<img class='gift' />");
            top=Math.floor(Math.random()*row)*4;
            left=Math.floor(Math.random()*row)*4;
            img.attr("src","images/gift1.png");
            img.css({"top":top+"rem", "left":left+"rem"});
            img.appendTo(".main");
            //console.log(img);
            //console.log(top);
            //console.log(left);
        }
        //console.log(gift_number);
        setTimeout(function(){
            if(gift_number%2==0){
                $(".main .gift:lt(1)").remove();
            }else{
                $(".main .gift:lt(2)").remove();
            }

        },1000);
    },500);

    var count=0;
    $(".main").on("click",".gift",function(){
        $(this).remove();
        count++;
        $(".count").text(count);
        console.log("hit");
    });

});