/**
 * Created by Yanyue on 2016/10/24.
 */

$(function(){

    //----------------------后台配置-------------------------
    var configure={
        headImgSrc:"images/head.jpg",
        backgroundColor:"#FD746C",
        words:["我","快","新","你","顺","来","义","世","爱","好","庆","界","乐","店","货","啊","今","天","是","雨","天"],
        startChance: 3,
        col:4,
        row:4
    };
    //----------------------后台配置-------------------------

    //----------------初始化页面函数------------------------
    function initiate(){

        $(".content_game .game_square").remove();

        for(var i=0;i<configure.row;i++){
            for(var j=0;j<configure.col;j++){
                var gameSquare=$('<div class="game_square"></div>');
                var width=$(".content_game").width()-9*configure.col;
                gameSquare.width(width/configure.col);
                gameSquare.height(gameSquare.width());
                gameSquare.css("line-height",gameSquare.height()+"px");
                gameSquare.css("font-size",gameSquare.height()/3+"px");
                gameSquare.appendTo(".content_game");
            }
        }

        $(".content_game").height(gameSquare.height()*configure.row+8*configure.row);

        $(".head_image img").attr("src",configure.headImgSrc);
        $(".main").css("backgroundColor",configure.backgroundColor);
        for(var i=0;i<configure.words.length;i++){
            $(".content_game .game_square:not(.hide)").each(function(index){
                $(this).text(configure.words[index]);
            });
        }
        $(".start_div span").text(configure.startChance);
    }

    initiate();
    //----------------初始化页面函数------------------------

    var chance=3;

    $(".start_game").click(function(){
        choose_word();
        $(".start_div span").text(chance);
        if(chance==0){
            $(".game_start").unbind("click");
            $(".start_div").css("background-color","#d3d2c0");
        }
    });

    function choose_word(){

        var total=configure.col*configure.row;
        var index=0;
        chance--;
        var finalIndex=Math.floor(Math.random()*total);
        console.log(finalIndex);

        var rotate_quick,rotate_normal,rotate_slow;
        rotate(rotate_quick,total,100);
        rotate(rotate_normal,total*2,200);
        if(finalIndex==0){
            rotate(rotate_slow,total*2-1,300);
        }else{
            rotate(rotate_slow,total*2+finalIndex,300);
        }


        function rotate(name,stop_index,interval){
            console.log(stop_index);
            name=setInterval(function(){
                console.log(index);
                if(index>=stop_index){
                    clearInterval(name);
                    console.log(index);
                }
                console.log(index%total);
                $(".game_square").removeClass("current_state").eq(index%total).addClass("current_state");
                index++;
            },interval);
        }


    }

    $(".share_friends").click(function(e){
        e.stopPropagation();
       $(".mask_share").fadeIn();
    });

    $(document).click(function(){
        $(".mask_share").fadeOut();
    })


});