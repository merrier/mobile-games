/**
 * Created by Yangyue on 2016/11/9.
 */

$(function(){

    var $gameBox = $('.gameBox');
    var image_src='images/shulan.jpg';           //图片url
    var oriArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];         //
    var imgArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var imgCell=$(".img_Cell");                  //拼图块
    var firstImg,secondImg;          //选中图片
    var countTimes;
    var times = 0;

    initiation();    //初始化页面
    countDownTime();       //开始倒计时

    var NineModule = {

        init:function(){
            this.initNinePic();            //初始化拼图图片
            this.eventHanding();          //事件监听
        },
        initNinePic:function(){
            $(".time_message").html("你已经用时"+"<span class='seconds'>0.</span>"+"<span class='million_seconds'>0</span>"+"秒");
            countTimeStart();               //计时开始
            $(".game_box").css("background-image","");          //清除背景图片
            $(".img_Cell").show();
            Array.prototype.shuffle = function(n){            //打乱数组
                var len = this.length,num = n ? Math.min(n,len) : len,index,
                    arr = this.slice(0),temp,
                    lib = {};
                lib.range = function(min,max){
                    return min + Math.floor(Math.random()*(max-min+1))
                };
                for(var i =0;i<len;i++){
                    index = lib.range(i,len-1);
                    temp = arr[i];
                    arr[i] = arr[index];
                    arr[index] = temp;
                }
                return arr.slice(0,num);
            };
            imgArr=oriArr.shuffle();              //随机打乱后的数组
            console.log(imgArr);
            imgCell.each(function(){                  //将每个拼图块渲染到对应的位置
                var index=$(this).index();
                console.log(index);
                $(this).css({
                    "position":"absolute",
                    "top":Math.floor(index/3)*4.6+"rem",
                    "left":(Math.floor(index%3)*4.6+0.1)+"rem"
                })
            });
            for(var i = 0,j=oriArr.length;i<j;i++){            //切割图片并放到对应位置
                var backUrl="url("+image_src+") no-repeat -"+Math.floor((oriArr[i]%3+8.6)%3)*4.3+"rem -"+Math.floor((oriArr[i]-1)/3)*4.3+"rem/13.8rem 13.8rem";
                imgCell.eq(imgArr[i]-1).css("background",backUrl);
                imgCell.eq(imgArr[i]-1).attr("shuffle-id",oriArr[i]);        //随机放置图片格
                imgCell.eq(imgArr[i]-1).attr("data-id",imgArr[i]);        //随机放置图片格
            }
        },
        eventHanding:function(){
            var self=this;
            var clickCount=0;
            var index=0;
            var location={
                "left":0,
                "top":0
            };
            $(".move_Img").click(function(){          //图片块点击事件
                clickCount++;
                var flag=0;
                imgCell.each(function(){                 //判断是否有图片块处于动画中
                    if($(this).is(":animated")){
                        flag=1;
                    }
                });
                console.log(flag);
                if(flag){                      //如果有元素处于动画中，禁止点击事件
                    console.log("add");
                    clickCount--;

                }else{
                    $(this).addClass("current");
                    if(clickCount%2==0){                //点击第二张图片时互换两张图片的位置
                        moveImg($(this),index,location);
                        setTimeout(check,1000);           //检验拼图是否完成
                    }else{                               //点击第一张图片时记录其位置信息
                        index=$(this).index();
                        location.left=parseInt($(this).css("left"));
                        location.top=parseInt($(this).css("top"));
                        console.log(location);
                    }
                }

            });
        }

    };

    function moveImg(first,index,secondLocation){              //移动图片函数
        $(".game_box_mask").show();
        var firstImg=first,secondImg=imgCell.eq(index);
        var firstLocation={
            "left":parseInt(firstImg.css("left")),
            "top":parseInt(firstImg.css("top"))
        };
        //var horizontal=Math.abs(parseInt(firstLocation.left)-parseInt(secondLocation.left));
        //var vertical=Math.abs(parseInt(firstLocation.top)-parseInt(secondLocation.top));
        var horizontal=parseInt(firstLocation.left)-parseInt(secondLocation.left);
        var vertical=parseInt(firstLocation.top)-parseInt(secondLocation.top);

        firstImg.animate({left:'-='+horizontal+'px',top:'-='+vertical+'px'},'fast');
        secondImg.animate({left:'+='+horizontal+'px',top:'+='+vertical+'px'},'fast');

        setTimeout(function(){
            imgCell.removeClass("current");
            $(".game_box_mask").hide();
        },500);

        console.log(firstLocation);
        console.log(secondLocation);

        var data_id=firstImg.attr("data-id");
        firstImg.attr("data-id",secondImg.attr("data-id"));
        secondImg.attr("data-id",data_id);



        //if(firstLocation.left<secondLocation.left){
        //    if(firstLocation.top<secondLocation.top){
        //        firstImg.animate({left:'+='+horizontal+'px',top:'+='+vertical+'px'},'slow');
        //        secondImg.animate({left:'-='+horizontal+'px',top:'-='+vertical+'px'},'slow');
        //    }else if(firstLocation.top==secondLocation.top){
        //        firstImg.animate({left:'+='+horizontal+'px'},'slow');
        //        secondImg.animate({left:'-='+horizontal+'px'},'slow');
        //    }else{
        //        firstImg.animate({left:'+='+horizontal+'px',top:'-='+vertical+'px'},'slow');
        //        secondImg.animate({left:'-='+horizontal+'px',top:'+='+vertical+'px'},'slow');
        //    }
        //}else if(firstLocation.left==secondLocation.left){
        //    if(firstLocation.top<secondLocation.top){
        //        firstImg.animate({top:'+='+vertical+'px'},'slow');
        //        secondImg.animate({top:'-='+vertical+'px'},'slow');
        //    }else if(firstLocation.top==secondLocation.top){
        //
        //    }else{
        //        firstImg.animate({top:'-='+vertical+'px'},'slow');
        //        secondImg.animate({top:'+='+vertical+'px'},'slow');
        //    }
        //}else{
        //    if(firstLocation.top<secondLocation.top){
        //        firstImg.animate({left:'-='+horizontal+'px',top:'+='+vertical+'px'},'slow');
        //        secondImg.animate({left:'+='+horizontal+'px',top:'-='+vertical+'px'},'slow');
        //    }else if(firstLocation.top==secondLocation.top){
        //        firstImg.animate({left:'-='+horizontal+'px'},'slow');
        //        secondImg.animate({left:'+='+horizontal+'px'},'slow');
        //    }else{
        //        firstImg.animate({left:'-='+horizontal+'px',top:'-='+vertical+'px'},'slow');
        //        secondImg.animate({left:'+='+horizontal+'px',top:'+='+vertical+'px'},'slow');
        //    }
        //}
    }

    function check(){                  //检验拼图是否完成函数
        var flag=1;
        imgCell.each(function(){
            $(this).removeClass("current");
            if($(this).attr("shuffle-id") == $(this).attr("data-id")){

            }else{
                flag=0;
            }

        });
        if(flag){           //如果拼图完成
            countTimeStop();         //计时结束
            imgCell.hide();           //拼图隐藏
            $(".game_box").css("background-image","url("+image_src+")");           //显示原图
            $(".success_mask").show();          //成功蒙版显示
            $(".mask_black").show();
            console.log($(".seconds").html()+ $(".million_seconds").html());
            $(".check_range").addClass("check_range_available");
        }else{
            //alert("失败！");
        }
    }

    function initiation(){               //初始化函数
        $("html,body").removeClass("ovf_hidden");
        $(".game_box").css("background-image","url("+image_src+")");
        $(".img_Cell").hide();
        $(".time_message").html("你还有"+"<span>10</span>"+"秒时间看原图哦!");
        $(".start_game_word").text("Ready？");
        $(".restart_button").hide();
        $(".check_range").removeClass("check_range_available");
    }


    function countDownTime(){               //10秒倒计时
        var time=10;
        var count=setInterval(function(){
            time--;
            $(".time_message span").text(time);
            if(time==0){
                clearInterval(count);
                $(".mask_black").show();
                $(".start_game_word").show();
                setTimeout(function(){
                    $(".start_game_word").text("Go!");
                },1000);
                setTimeout(function(){
                    $(".mask_black").hide();
                    $(".start_game_word").hide();
                    NineModule.init();            //进入拼图
                    $(".restart_button").show();
                },2000);

            }else{

            }
        },1000);
    }

    function countTimeStart(){        //拼图用时计时函数
        times=0;
        countTimes = setInterval(function() {
            times ++;
            var ms = Math.floor(times / 100).toString();

            if(ms.length <= 1) {
                ms = "0" + ms;
            }
            var hm = Math.floor(times % 100).toString();
            if(hm.length <= 1) {
                hm = "0"+hm;
            }
            $(".seconds").html(ms+".");
            $(".million_seconds").html(hm);
        }, 10);
    }

    function countTimeStop(){                 //拼图用时计时结束函数
        clearInterval(countTimes);
        console.log("stop!");
    }

    $(".restart_button").click(function(){
        //initiation();
        //countDownTime();
        window.location.reload();
    });

    $(".share_friends").click(function(){
        $(".success_mask").hide();
        $(".mask_black").hide();
        $(".mask_share").show();
        //document.body.style.overflow="hidden";
        $("html,body").addClass("ovf_hidden");
    });

    $(".mask_share").click(function(){
        $(".mask_share").hide();
        $(".success_mask").show();
        $("html,body").addClass("ovf_hidden");
    });

    $(".activity").click(function () {
        $(".mask_black").show();
        $(".rule-box").show();
        $("html,body").addClass("ovf_hidden");
    });

    //$(".check_range_available").click(function(){
    $(".restart").on("click",".check_range_available",function(){
        $(".mask_black").show();
        $(".rank_list").show();
        $("html,body").addClass("ovf_hidden");
    });

    $(".close_button").click(function(){
        $(".success_mask").hide();
        $(".mask_black").hide();
        $(".rank_list").hide();
        $(".mask_share").hide();
        $(".rule-box").hide();
        $("html,body").removeClass("ovf_hidden");
    });

    $(".click_wechat").click(function(){
        $(".success_message").hide();
        $(".follow_wechat").show();
        $("html,body").addClass("ovf_hidden");
    });

    $(".music_switch").click(function(){
        if($(this).hasClass("fa-volume-up")){
            $(this).removeClass("fa-volume-up");
            $(this).addClass("fa-volume-off");
            document.getElementsByClassName("background_music")[0].pause();      //音乐暂停
        }else{
            $(this).removeClass("fa-volume-off");
            $(this).addClass("fa-volume-up");
            document.getElementsByClassName("background_music")[0].play();           //音乐播放
        }
    });

});