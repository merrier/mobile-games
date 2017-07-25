/**
 * Created by Yangyue on 2017/1/13.
 */
$(function(){
    // $('.golden_egg_animate').show();
    var start_time;   //下一场活动开始时间
    var final_join_numbers;       //上场参与人数
    var start_hour;        //开始时间小时数
    var start_minute;       //开始时间分钟数
    var start_second;       //开始时间,以秒计数
    var join_start_time=60;    //活动开始倒计时，单位为s
    var join_start_last_time;   //离活动开始剩余时间,单位为s
    var start_last_time=10;      //活动开始前10秒倒计时
    var join_start_time_minute=join_start_time/60;
    var join_numbers;       //实时参与人数
    var start=false;       //活动开始标志
    var rank_max=1000;      //最大摇动次数
    var shake_time=180;       //摇动手机计数时间限制，单位为s

    (function initiate(){
        $('.mask_black').hide();
        start_time="14:26";
        start_hour=parseInt(start_time.split(":")[0]);
        start_minute=parseInt(start_time.split(":")[1]);
        start_second=start_hour*3600+start_minute*60;
        final_join_numbers=100;
        $(".pause_page .people_num").text(final_join_numbers);
        $(".pause_page .join_time").text(start_time);
        startGame();
    })();


    function startGame(){
        var now= new Date();
        var hour=now.getHours();
        var minute=now.getMinutes();
        var second=now.getSeconds();
        var current_seconds=hour*3600+minute*60+second;
        join_start_last_time=start_second-current_seconds;
        console.log(join_start_last_time);
        if(0<=join_start_last_time && join_start_last_time<=join_start_time){
            join_numbers=0;  //参与人数
            $(".activity_begin .num").text(join_numbers);
            $('.mask_black').show();
            $('.activity_begin').show();
            countDownTimeFirst();
            start=true;
        }
        //if(start_minute<join_start_time_minute){
        //    if(hour==start_hour-1 && minute==start_minute+60-join_start_time_minute){
        //        join_numbers=0;  //参与人数
        //        $(".activity_begin .num").text(join_numbers);
        //        $('.mask_black').show();
        //        $('.activity_begin').show();
        //        countDownTimeFirst();
        //        start=true;
        //    }
        //}else{
        //    if(hour==start_hour && minute==start_minute-join_start_time_minute){
        //        $('.mask_black').show();
        //        $('.activity_begin').show();
        //        countDownTimeFirst();
        //        start=true;
        //    }
        //}

        console.log(hour+":"+minute+":"+second);
        if(!start){
            setTimeout(startGame,1000);
        }
    }

    function countDownTimeFirst(){
        if(join_start_last_time==start_last_time){
            $('.activity_begin').hide();
            $('.count_dowm').show();
            countDownTimeSecond();
        }else{
            $(".activity_begin .num").text(join_numbers);
            $(".util_end .end_time").text(join_start_last_time);
            join_start_last_time--;
            setTimeout(countDownTimeFirst,1000);
        }
    }

    function countDownTimeSecond(){
        if(join_start_last_time==0){
            $('.count_dowm').hide();
            $('.rank_show').show();
            rankShow();
        }else{
            $(".count_dowm .current").text(join_numbers);
            $('.count_dowm .ten_num').text(join_start_last_time);
            join_start_last_time--;
            setTimeout(countDownTimeSecond,1000);
        }
    }

    function rankShow(){
        var rank=[800,750,700,650,600,550,500,450,400,100];
        for(var i in rank){
            var shake_percent=rank[i]/rank_max;
            var width=$(".progress").width()*shake_percent;
            $(".progressbar").eq(i).css("width",width+"px");
            $(".arrow_img").eq(i).css("left",width+"px");
        }
        $(".shake_last_time span").text(shake_time);
        rankFreshen();
    }

    function rankFreshen(){
        $(".shake_last_time span").text(shake_time);
        var rank=[800,750,700,650,600,550,500,450,400,100];
        for(var i in rank){
            var shake_percent=rank[i]/rank_max;
            var width=$(".progress").width()*shake_percent;
            $(".progressbar").eq(i).css("width",width+"px");
            $(".arrow_img").eq(i).css("left",width+"px");
        }
        if(shake_time!=0){
            setTimeout(rankFreshen,1000);
            shake_time--;
        }else{
            $('.rank_show').hide();
            $('.golden_egg_animate').show();
            setTimeout(function(){
                $('.golden_egg_animate').hide();
                $(".end").show();
                setTimeout(function(){
                    $('.mask_black').hide();
                    $(".end").hide();


                },3000);
            },3000);
        }
    }



});