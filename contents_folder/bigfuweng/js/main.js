/**
 * Created by q on 2016/3/13.
 */
$(function(){
    //-------------------金币音效---------------------
    function audio_gold(){
        var audio_gold = document.getElementById("audio_gold");
        audio_gold.play();
    }



    //-----------------查看助力榜--------------------
    $(".main_btn_helplist").click(function(){
        $(".main").hide();
        $(".helplist").show();
    });

    //-----------------返回游戏-------------------
    $(".btn_return").click(function(){
        $(".helplist").hide();
        $(".main").show();
    });

    //------------------查看更多------------------
    var list = $(".helplist_content_list");
    var len = list.length;
    console.log(len);
    for(i=20;i<=len;i++){
        list.eq(i).hide();
    }

    $(".helplist_more").click(function(){
        for(i=20;i<=len;i++){
            list.eq(i).show();
        }
    });


    //-------------------分享朋友圈---------------------
    $(".btn_share").click(function(){
        $(".mask_black").show();
        $(".h_f_box").show();
    });

    //--------------------进度条相关--------------------
    var max_num = 5;
    var already_num = $(".progress_already_num").text();
    var need_num = max_num - already_num;
    var per_num = parseInt(already_num/max_num*100);
    $(".progress_need_num").text(need_num);
    $(".progress_num").text(per_num+"%");
    $(".progress_bar").css("width",per_num+"%");

    //------------------助力榜昵称省略字数---------------
    $(".helplist_nickname").each(function(){
        var ntext = $(this).text();
        var nlen = $(this).text().length;
        if(nlen> 5){
            $(this).text(ntext.substring(0,5) + "...");
        }
    });



    //------------------剩余机会关闭------------------
    $(".btn_mask_close").click(function(){
        $(".mask_white").hide();
        $(".mask_game_times").hide();
    });

    //------------------分享朋友圈-------------------
    $(".btn_share_circle").click(function(){
        $(".mask_white").hide();
        $(".mask_game_times").hide();
        $(".mask_black").show();
        $(".h_f_box").show();
    });

    //--------------------大转盘抽奖-----------------------
    $(".inner_img").click(function(){
        //alert("1111");
        $(".chou_mask").show();
        if ($("#cn-wrapper").hasClass("zhuan_div")) {
            $("#cn-wrapper").removeClass("zhuan_div");
        }else {
            $("#cn-wrapper").addClass("zhuan_div");
        }
        setTimeout(function(){
            alert("很遗憾，您未中奖！");
            $(".mask_white").fadeOut(1500);
            $(".dial").hide();
            $("#cn-wrapper").removeClass("zhuan_div");
        },3500);
    });




    //---------------------初始化-------------------
    $(".step_num_1").find(".img_piece").show();

    // 固定公式数组
    //var static_array = [[6,3,4,6,3,6,6,6], [5,4,2,2,6,2,6,4],[4,2,4,5,6,5,4,2,6]];
    var static_array = [[6,6,4,6,4,6,5]];

    // 获取用户进入的机率,2%的用户选择公式，98%的用户真正随机
    var rand_num = Math.floor(Math.random()*100+1);

    // 自定义进入模式为固定公式
    rand_num = 55;

    // 当前坐标，初始值为1( 当前坐标索引)
    current_coordinates = 1;
    // 目标坐标，初始值为1
    object_coordinates = 1;
    // 当前色子值
    current_value_dice = 0;
    // 游戏分数
    var scores_game = 0;
    // 存储固定公式数组
    var current_fixed_array = [];
    //存储固定公式数组的下标
    var fixed_array_subscript = 0;
    // 行走方向
    var jump_direction = 'front';
    //
    var animation_effect_object;

    // 如果随机数为55,99，即：2%的机率，那程序就按固定公式进行选择套路
    var current_select_type = "sui_ji";

    // 判断骰子是否在跳步，“0”-否，“1”-是；
    animation_type = 0;

    if([55,99].indexOf(rand_num) != -1){
        var static_rand_num = Math.floor(Math.random()*static_array.length);
        current_fixed_array =  static_array[static_rand_num];
        current_select_type = 'gu_ding';
    }

    console.log(current_select_type);
    // 功能： 掷骰子, 返回一个对应的值
    function dice_throw(num, type){
        var dice = $(".dice");
        dice.attr("class","dice");//清除上次动画后的点数
        //dice.css('cursor','default');

        if(current_select_type == "gu_ding"){
            // 如果是固定，那就读取固定数组里，指定下标的值
            dice_num = current_fixed_array[fixed_array_subscript];
            // 自动更新下标
            fixed_array_subscript += 1;
        }else{
            dice_num = Math.floor(Math.random()*6+1);//产生随机数1-6
        }

        dice.animate({left: '+2px'}, 100,function(){
            dice.addClass("dice_t");
        }).delay(200).animate({top:'-2px'},100,function(){
            dice.removeClass("dice_t").addClass("dice_s");
        }).delay(200).animate({opacity: 'show'},600,function(){
            dice.removeClass("dice_s").addClass("dice_e");
        }).delay(200).animate({left:'-2px',top:'2px'},100,function(){
            dice.removeClass("dice_e").addClass("dice_"+dice_num);
            $(".dice_mask").remove();//移除遮罩
            $(".mask_white").fadeOut(1500);
            $(".dice_box").fadeOut(1500);
        });

        return dice_num;
    };

    // 功能： 特殊操作结果
    function special_results(){

        if($(".main_step_box.current_active").hasClass("step_box_zhuan")){
            $(".mask_white").show();
            $(".dial").show();
        }else if($(".main_step_box.current_active").hasClass("you_will_out")){
            alert("你出局了！");
        }else{
            var options = [
                {key: "step_box_ahead3", value: 3, type: "add" },
                {key: "step_box_ahead2", value: 2, type: "add" },
                {key: "step_box_ahead1", value: 1, type: "add" },
                {key: "step_box_back2", value: 2, type: "reduce" }
            ];

            if( current_coordinates > object_coordinates){
                console.log('我开始后退了！');
                current_coordinates -= 1;
            }else{
                for(var i = 0; i< options.length;i++){
                    if($(".main_step_box.current_active").hasClass(options[i].key)){
                        animation_type = 1;
                        var message = "";
                        if(options[i].type == 'add' ){
                            message = "前进" + options[i].value + "格!";
                            jump_direction = 'front';
                            object_coordinates = current_coordinates + options[i].value;
                        }else if(options[i].type == 'reduce'){
                            message = "后退" + options[i].value + "格!";
                            jump_direction = 'reduce';
                            object_coordinates = current_coordinates - options[i].value;
                        }
                        //alert(message);
                        console.log(jump_direction+"####："+message);
                        //animation_effect();
                    }
                }
            }

        }

        if( current_coordinates == object_coordinates){
            clearInterval(animation_effect_object);
            animation_type = 0;
        }

        console.log( current_coordinates );
        console.log(object_coordinates);
        console.log( current_coordinates == object_coordinates);
    }

    //--------------------动画效果-------------------
    // 功能：每次传入当前下标和要跳下标，
    function animation_effect(){

        // ok
        var play_game_status = true;
        animation_type = 1;
        if(jump_direction == 'front'){
            current_coordinates += 1;
        }else if(jump_direction == 'reduce'){
            current_coordinates -= 1;
        }
        // ok
        $(".main_step_box").find(".img_piece").hide();
        $(".step_num_" + current_coordinates).find(".img_piece").show();

        // ok
        if( current_coordinates == object_coordinates){
            console.log("色子走完了！");
            animation_type = 0;
            $(".main_step_box").removeClass("current_active");
            $(".step_num_" + object_coordinates).addClass("current_active");
            var value = $(".main_step_box.current_active").attr("data-value");
            scores_game += parseInt(value);
            if($(".main_step_box.current_active").hasClass("main_step_gold")){
                $(".main_step_box.current_active").find(".img_coin").show();
                setTimeout(function(){
                    audio_gold();
                    $(".main_step_box.current_active").find(".img_coin").css({
                        webkitTransition:'opacity 2s ease,' +
                        '-webkit-transform 2s ease,' +
                        'top 2s ease',
                        top:'-80px',
                        opacity:'0',
                        webkitTransform:'rotateY(600deg)'});
                },500);
            }else if($(".main_step_box.current_active").hasClass("step_box_half")){
                $(".main_step_box.current_active").find(".img_coin").show();
                setTimeout(function(){
                    $(".main_step_box.current_active").find(".img_coin").css({
                        webkitTransition:'opacity 3s ease,' +
                        '-webkit-transform 3s ease,' +
                        'top 3s ease',
                        opacity:'0',
                        webkitTransform:'rotateY(500deg)'});
                },500);
                scores_game = parseInt(scores_game/2);
            }else if($(".main_step_box.current_active").hasClass("step_box_double")){
                $(".main_step_box.current_active").find(".img_coin").show();
                setTimeout(function(){
                    $(".main_step_box.current_active").find(".img_coin").css({
                        webkitTransition:'opacity 3s ease,' +
                        '-webkit-transform 3s ease,' +
                        'top 3s ease',
                        opacity:'0',
                        webkitTransform:'rotateY(500deg)'});
                },500);
                scores_game = scores_game*2;
            }else if($(".main_step_box.current_active").hasClass("step_box_fight")){
                var scores_num = Math.floor(Math.random()*500+1);
                scores_game = scores_game+scores_num;
                $(".main_step_box.current_active").find(".fight_back_num").text("+"+scores_num).show();
                setTimeout(function(){
                    audio_gold();
                    $(".main_step_box.current_active").find(".fight_back_num").css({
                        webkitTransition:'opacity 2s ease,' +
                        '-webkit-transform 2s ease,' +
                        'top 2s ease',
                        top:'-80px',
                        opacity:'0',
                        webkitTransform:'rotateY(600deg)'});
                },500);

            }
            setTimeout(function(){
                $(".gold_current_max").text(scores_game);
            },1000);
            console.log("当前总分数：" + scores_game);
            play_game_status = false;
            jump_direction = 'front';
            special_results();
        }

        if(current_coordinates >= 25) {
            clearInterval(animation_effect_object);
            animation_type = 0;
            $(".main_step_box").find(".img_piece").hide();
            $(".step_num_25").children(".img_piece").show();
            $(".main_step_box").removeClass("current_active");
            $(".step_num_25").addClass("current_active");
            play_game_status = false;
            setTimeout(function(){
                $(".mask_white").show();
                $(".mask_game_times").show();
                $(".gold_current_max").text(scores_game);
            },500);
            return false;
        }

        //if(play_game_status == false){
        console.log(" 当前判断条件值：");
        console.log( current_coordinates );
        console.log(object_coordinates);
        console.log( current_coordinates == object_coordinates);

    }


    //--------------------点击掷骰子------------------
    $(".main_btn_roll").click(function(){
        if(animation_type == 0){
            $(".mask_white").show();
            $(".dice_box").animate({
                opacity:'show'
            },1500,function(){
                setTimeout(function(){

                    object_coordinates = current_coordinates + current_value_dice;
                    console.log("===========开始");
                    //animation_effect();
                    // start
                    animation_effect_object = setInterval(animation_effect, 1000);
                    animation_type = 1;
                },2000);
                if(current_coordinates == 25){
                    clearInterval(animation_effect_object);
                    animation_type = 0;
                    setTimeout(function(){
                        $(".mask_white").show();
                        $(".mask_game_times").show();
                        $(".gold_current_max").text(scores_game);
                    },500);
                    //alert("游戏已经结束了,总分：" + scores_game + " ！");
                }else{
                    current_value_dice = dice_throw(current_select_type);
                }
            });
        }else{
            return false;
        }
    });
});