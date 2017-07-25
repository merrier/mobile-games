/**
 * Created by Yangyue on 2017/1/10.
 */
$(function(){

    var start_time=20;
    var times = 0; // 记录摇动次数
    var last_time = 0;
    var borderSpeed = 4000;  // 加速度变化临界值
    var x = y = z = last_x = last_y = last_z = 0;
    var start_shake=true;

    $(".ready_button").click(function(){
        $(".count_down_time").show();
        $(".join_page").hide();
        $(".shake_page").show();
        setTimeout(function(){
            $(".count_down_time").hide();
            startShake();
            shakeTimesCount();

        },10000);
    });

    function startShake(){
        $.ajax({
            url:"",

        });
        if(start_shake){

        }else{
            window.removeEventListener('devicemotion',shake,false);
            $(".game_result").show();

        }
        setTimeout(startShake,1000);

    }
    //function shakeTime(){
    //    start_time--;
    //    $(".shake_page .spent_time span").text(start_time+"s");
    //    if(start_time==0){
    //        window.removeEventListener('devicemotion',shake,false);
    //        $(".game_result").show();
    //        start_shake=false;
    //    }else{
    //        setTimeout(shakeTime,1000);
    //    }
    //}

    //--------------------------活动详情页面显示--------------------------------------------
    $(".rule_button").click(function(){
        $(".mask_rule_detail").show().addClass("fade_in");
    });
    //--------------------------活动详情页面显示--------------------------------------------

    //--------------------------活动详情页面关闭--------------------------------------------
    $(".close_button").click(function(){
        $(this).parent().addClass("fade_out");
        $('.new_mask').addClass('fade_out');
        setTimeout(function(){
            $(".mask_rule_detail").hide().removeClass("fade_out fade_in");
        },1000);
    });
    //--------------------------活动详情页面关闭--------------------------------------------

    function shakeTimesCount() {
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion',shake,false);
        }
        else
        {
            alert('您的设备不支持摇一摇哦');
        }

    }

    // 每次手机移动的时候都会执行下面shake函数的代码
    function shake(eventData)
    {
        var acceleration = eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();
        var diffTime  = curTime-last_time;
        // 每隔100ms进行判断
        if (diffTime>100 && start_shake) {
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
            // 判断手机确实发生了摇动而不是正常的移动
            if (speed>borderSpeed) {
                times++;
                $(".shake_count").text(times);
                // 用户的微信昵称和头像连接发送一次即可，不需要每次都发送
            }
            last_time = curTime;
            last_x = x;
            last_y = y;
            last_z = z;
        }
    }

    $(".game_result").click(function(){
        $(this).hide();
    });

    $(".return_button").click(function(){
        $(".join_page").show();
        $(".shake_page").hide();
    });

    $(".rank_button").click(function () {
        $(".rank_list").show();
        $('.new_mask').show();
    })



});