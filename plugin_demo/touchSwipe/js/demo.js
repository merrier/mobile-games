/**
 * Created by Yangyue on 2016/12/28.
 */
$(document).ready(function() {
    var nowpage = 0;

    //给最大的盒子增加事件监听
    $(".container").swipe({
        swipe:function(event, direction, distance, duration, fingerCount) {
            if (direction == "up") {        //向上滑动页面
                nowpage = nowpage + 1;
                $(".page").eq((nowpage-1)%5).addClass("pt-page-moveToTop");         //当前显示页面向上滑动移出视窗
                $(".page").eq((nowpage%5)).addClass("page_current pt-page-moveFromBottom");     //下个页面显示并向上滑动至视窗
                $(".container").swipe('disable');       //页面处于滑动动画时禁止swipe插件
                setTimeout(function(){
                    $(".page").eq((nowpage-1)%5).removeClass("page_current pt-page-moveToTop");      //移除滑动动画效果
                    $(".page").eq((nowpage%5)).removeClass("pt-page-moveFromBottom");           //移除滑动动画效果
                    $(".container").swipe('enable');     //页面滑动动画结束时重新启用swipe插件
                },600);
            } else if (direction == "down") {      //向下滑动页面
                if(nowpage==0){            //当前页面为第一个页面时
                    nowpage = nowpage +4;
                    console.log("a");
                }else{
                    nowpage = nowpage -1;
                }
                $(".page").eq((nowpage+1)%5).addClass("pt-page-moveToBottom");      //当前显示页面向下滑动移出视窗
                $(".page").eq((nowpage%5)).addClass("page_current pt-page-moveFromTop");     //下个页面显示并向下滑动至视窗
                $(".container").swipe('disable');
                console.log(nowpage%5);
                console.log((nowpage+1)%5);
                console.log(nowpage);
                setTimeout(function(){
                    $(".page").eq((nowpage+1)%5).removeClass("page_current pt-page-moveToBottom");
                    $(".page").eq((nowpage%5)).removeClass("pt-page-moveFromTop");
                    $(".container").swipe('enable');
                },600);
            }
        },

        swipeLeft:function(event, direction, distance, duration, fingerCount){
            $(".swipe_prompt").html("direction->"+direction+"<br>"+"distance->"+distance);
        },
        swipeRight:function(event, direction, distance, duration, fingerCount){
            $(".swipe_prompt").html("direction->"+direction+"<br>"+"distance->"+distance);
        },
        swipeStatus:function(event,phase,direction,distance,duration,fingerCount,fingerData,currentDirection){
            $(".swipe_prompt").html("direction->"+direction+"<br>"+"currentDirection->"+currentDirection);
        },
        tap:function(event,target){
            console.log(event);
            console.log($(target).attr("class"));
            $(".swipe_prompt").text("tap");
        },
        doubleTap:function(event,target){
            console.log(event);
            console.log($(target).attr("class"));
            $(".swipe_prompt").text("doubleTap");
        },
        hold: function(event, target) {
            console.log(event);
            console.log($(target).attr("class"));
            $(".swipe_prompt").text("hold");
        },
        threshold:30

    });
});