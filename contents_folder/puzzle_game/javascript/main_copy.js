/**
 * Created by Yangyue on 2016/11/9.
 */

$(function(){

    var $gameBox = $('.gameBox');
    var image_src='images/shulan.jpg';
    var oriArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var imgArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var imgCell=$(".img_Cell");
    var firstImg,secondImg;
    var countTimes;
    var times = 0;

    initiation();    //初始化页面
    countDownTime();       //开始倒计时

    var NineModule = {

        init:function(){
            this.initNinePic();
            this.eventHanding();
        },
        initNinePic:function(){
            $(".time_message").html("你已经用时"+"<span class='seconds'>0</span>"+"."+"<span class='million_seconds'>0</span>"+"秒");
            countTimeStart();
            $(".img_all").hide();
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
            imgArr=oriArr.shuffle();
            console.log(imgArr);
            imgCell.each(function(){
                var index=$(this).index();
                console.log(index);
                $(this).css({
                    "position":"absolute",
                    "top":Math.floor(index/3)*4.6+"rem",
                    "left":(Math.floor(index%3)*4.6+0.1)+"rem"
                })
            });
            for(var i = 0,j=oriArr.length;i<j;i++){
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
            $(".move_Img").click(function(){
                clickCount++;
                if($(this).is(":animated")){
                    $(this).removeClass("move_Img");
                    console.log("add");clickCount--;

                }else{
                    $(this).addClass("move_Img");
                    $(this).addClass("current");
                    if(clickCount%2==0){

                        moveImg($(this),index,location);
                        setTimeout(check,1000);

                    }else{

                        index=$(this).index();
                        location.left=parseInt($(this).css("left"));
                        location.top=parseInt($(this).css("top"));
                        console.log(location);
                    }
                }

            });
        }

    };

    function moveImg(first,index,secondLocation){
        var firstImg=first,secondImg=imgCell.eq(index);
        var firstLocation={
            "left":parseInt(firstImg.css("left")),
            "top":parseInt(firstImg.css("top"))
        };
        var horizontal=Math.abs(parseInt(firstLocation.left)-parseInt(secondLocation.left));
        var vertical=Math.abs(parseInt(firstLocation.top)-parseInt(secondLocation.top));
        console.log(firstLocation);
        console.log(secondLocation);
        var data_id=firstImg.attr("data-id");
        firstImg.attr("data-id",secondImg.attr("data-id"));
        secondImg.attr("data-id",data_id);
        if(firstLocation.left<secondLocation.left){
            if(firstLocation.top<secondLocation.top){
                firstImg.animate({left:'+='+horizontal+'px',top:'+='+vertical+'px'},'slow');
                secondImg.animate({left:'-='+horizontal+'px',top:'-='+vertical+'px'},'slow');
            }else if(firstLocation.top==secondLocation.top){
                firstImg.animate({left:'+='+horizontal+'px'},'slow');
                secondImg.animate({left:'-='+horizontal+'px'},'slow');
            }else{
                firstImg.animate({left:'+='+horizontal+'px',top:'-='+vertical+'px'},'slow');
                secondImg.animate({left:'-='+horizontal+'px',top:'+='+vertical+'px'},'slow');
            }
        }else if(firstLocation.left==secondLocation.left){
            if(firstLocation.top<secondLocation.top){
                firstImg.animate({top:'+='+vertical+'px'},'slow');
                secondImg.animate({top:'-='+vertical+'px'},'slow');
            }else if(firstLocation.top==secondLocation.top){

            }else{
                firstImg.animate({top:'-='+vertical+'px'},'slow');
                secondImg.animate({top:'+='+vertical+'px'},'slow');
            }
        }else{
            if(firstLocation.top<secondLocation.top){
                firstImg.animate({left:'-='+horizontal+'px',top:'+='+vertical+'px'},'slow');
                secondImg.animate({left:'+='+horizontal+'px',top:'-='+vertical+'px'},'slow');
            }else if(firstLocation.top==secondLocation.top){
                firstImg.animate({left:'-='+horizontal+'px'},'slow');
                secondImg.animate({left:'+='+horizontal+'px'},'slow');
            }else{
                firstImg.animate({left:'-='+horizontal+'px',top:'-='+vertical+'px'},'slow');
                secondImg.animate({left:'+='+horizontal+'px',top:'+='+vertical+'px'},'slow');
            }
        }
    }

    function check(){
        var flag=1;
        imgCell.each(function(){
            $(this).removeClass("current");
            if($(this).attr("shuffle-id") == $(this).attr("data-id")){

            }else{
                flag=0;
            }

        });
        if(flag){
            alert("成功！");
            countTimeStop();
            imgCell.hide();
            $(".img_all").show();
        }else{
            //alert("失败！");
        }
    }

    function initiation(){
        $(".img_all").attr("src",image_src);
        $(".img_Cell").hide();
    }


    function countDownTime(){
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
                },2000);
                setTimeout(function(){
                    $(".mask_black").hide();
                    $(".start_game_word").hide();
                    NineModule.init();
                },4000);

            }else{

            }
        },1000);
    }

    function countTimeStart(){
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
            $(".seconds").html(ms);
            $(".million_seconds").html(hm);
        }, 10);
    }

    function countTimeStop(){
        clearInterval(countTimes);
        console.log("stop!");
    }

});