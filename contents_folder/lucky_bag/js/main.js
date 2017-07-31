/**
 * Created by Yangyue on 2016/12/26.
 */
$(document).ready(function () {
    var nowpage = 0;

    //--------------------------下拉翻页---------------------------------------------
    $(".main").swipe({
        swipe: function (event, direction, distance, duration, fingerCount) {
            if (direction == "up") {       //向上滑动页面
                nowpage = nowpage + 1;
                $(".page").eq((nowpage - 1) % 5).addClass("pt-page-moveToTop");    //当前显示页面向上滑动移出视窗
                $(".page").eq((nowpage % 5)).addClass("page_current pt-page-moveFromBottom"); //下个页面显示并向上滑动至视窗
                $(".main").swipe('disable');   //页面处于滑动动画时禁止swipe插件
                setTimeout(function () {
                    $(".page").eq((nowpage - 1) % 5).removeClass("page_current pt-page-moveToTop");  //移除滑动动画效果
                    $(".page").eq((nowpage % 5)).removeClass("pt-page-moveFromBottom"); //移除滑动动画效果
                    $(".main").swipe('enable');   //页面滑动动画结束时重新启用swipe插件
                }, 600);
            } else if (direction == "down") {         //向下滑动页面
                if (nowpage == 0) {            //当前页面为第一个页面时
                    nowpage = nowpage + 4;
                } else {
                    nowpage = nowpage - 1;
                }
                $(".page").eq((nowpage + 1) % 5).addClass("pt-page-moveToBottom");   //当前显示页面向下滑动移出视窗
                $(".page").eq((nowpage % 5)).addClass("page_current pt-page-moveFromTop"); //下个页面显示并向下滑动至视窗
                $(".main").swipe('disable');
                setTimeout(function () {
                    $(".page").eq((nowpage + 1) % 5).removeClass("page_current pt-page-moveToBottom");
                    $(".page").eq((nowpage % 5)).removeClass("pt-page-moveFromTop");
                    $(".main").swipe('enable');
                }, 600);
            }
        }

    });
    //--------------------------下拉翻页---------------------------------------------

    var gift_message = [
        {

            'bag_id': 1,  //福袋id
            'status': 0,   //领取状态：0表示已领取福袋但朋友助力次数未满；1表示朋友助力次数已满，但并未拆开福袋；2表示已拆开福袋
            'assistants': 2  //朋友助力次数
        },
        {
            'bag_id': 2,
            'status': 1,
            'assistants': 10
        },
        {
            'bag_id': 3,
            'status': 2,
            'assistants': 10
        }
    ];

    var test = '[{"bg_id":1,"status":0,"assistance":2},{"bg_id":2,"status":1,"assistance":10},{"bg_id":3,"status":2,"assistance":10}]';
    //var test='{"bg_id":1,"status":0,"assistance":2}';
    var gift_messages = $.parseJSON(test);
    console.log(test);
    console.log(gift_messages);
    console.log(gift_messages[0].bg_id);

    //-----------------------初始化页面-------------------------------------------
    (function initiate() {
        gift_message.forEach(function (elem, index) {
            var $this = $(".page").eq(gift_message[index].bag_id);
            var progress, width;
            switch (gift_message[index].status) {
                case 0:   //已领取福袋但助力次数未达10次
                    $this.find(".get_lucky_bag").text("分享朋友圈");
                    $this.find(".progress").show();    //显示助力进度
                    width = $this.find(".progress").width() / 10 * gift_message[index].assistants;
                    $this.find(".progressbar").css("width", width + "px");
                    break;
                case 1:   //朋友助力次数已满，但并未拆开福袋
                    $this.find(".get_lucky_bag").text("打开福袋");
                    $this.find(".progress").show();     //显示助力进度
                    width = $this.find(".progress").width();
                    $this.find(".progressbar").css({
                        "width": width + "px",
                        "border-radius": "0.3rem"
                    });
                    break;
                case 2:  //已拆开福袋
                    $this.find(".page_get").hide();
                    $this.find(".page_got").show();    //显示已领取福袋页面
                    break;
                default:    //还未领取福袋
                    break;
            }
        });
    })();
    //-----------------------初始化页面-------------------------------------------

    //--------------------------音乐播放、暂停---------------------------------------------
    $(".music_button").click(function () {
        var play = $(".play_button");
        var pause = $(".pause_button");
        if (play.is(":visible")) {
            play.hide();
            pause.show();
            document.getElementsByClassName("background_music")[0].pause();      //音乐暂停
        } else {
            play.show();
            pause.hide();
            document.getElementsByClassName("background_music")[0].play();           //音乐播放
        }
    });
    //--------------------------音乐播放、暂停---------------------------------------------

    //--------------------------活动详情页面显示--------------------------------------------
    $(".rule_detail").click(function () {
        $(".mask_rule_detail").show().css({       //淡入动画效果
            "animation": "fade-in 1s",
            "-webkit-animation": "fade-in 1s",
            "-moz-animation": "fade-in 1s",
            "-o-animation": "fade-in 1.5s",
            "animation-fill-mode": "forwards",
            "-moz-animation-fill-mode": "forwards",
            "-webkit-animation-fill-mode": "forwards",
            "-o-animation-fill-mode": "forwards"
        }).addClass('ovfHiden');
        $(".main").swipe('disable');
    });
    //--------------------------活动详情页面显示--------------------------------------------

    //--------------------------活动详情页面关闭--------------------------------------------
    $(".close_button").click(function () {
        $(this).parent().css({  //淡出动画效果
            "animation": "fade-out 1s",
            "-webkit-animation": "fade-out 1s",
            "-moz-animation": "fade-out 1s",
            "-o-animation": "fade-out 1s",
            "animation-fill-mode": "forwards",
            "-moz-animation-fill-mode": "forwards",
            "-webkit-animation-fill-mode": "forwards",
            "-o-animation-fill-mode": "forwards"
        });
        setTimeout(function () {
            $(".mask_rule_detail").hide();
            console.log("hide");
        }, 1000);
        $(".main").swipe('enable');
    });
    //--------------------------活动详情页面关闭--------------------------------------------

    //--------------------------分享朋友圈弹框显示--------------------------------------------
    $(".get_lucky_bag").click(function () {
        if ($(this).text().trim() !== "打开福袋") {     //
            $(".mask_share").show().css({           //分享朋友圈蒙版显示
                "animation": "fade-in 1s",
                "-webkit-animation": "fade-in 1s",
                "-moz-animation": "fade-in 1s",
                "-o-animation": "fade-in 1s",
                "animation-fill-mode": "forwards",
                "-moz-animation-fill-mode": "forwards",
                "-webkit-animation-fill-mode": "forwards",
                "-o-animation-fill-mode": "forwards"
            });
            $(".main").swipe('disable');
            if ($(this).text().trim() == "立即领取") {    //立即领取
                $(this).text("分享朋友圈");
                $(this).prevAll(".progress").eq(0).show();      //显示进度条
            }
        } else {                   //打开福袋
            $(this).parent().next(".page_got").show();
            $(this).parent().hide();
        }
    });
    //--------------------------分享朋友圈弹框显示--------------------------------------------


    //--------------------------分享朋友圈弹框消失--------------------------------------------
    $(".mask_share").click(function () {
        $(this).css({
            "animation": "fade-out 1s",
            "-webkit-animation": "fade-out 1s",
            "-moz-animation": "fade-out 1s",
            "-o-animation": "fade-out 1s",
            "animation-fill-mode": "forwards",
            "-moz-animation-fill-mode": "forwards",
            "-webkit-animation-fill-mode": "forwards",
            "-o-animation-fill-mode": "forwards"
        });
        setTimeout(function () {
            $(".mask_share").hide();
        }, 1000);
        $(".main").swipe('enable');
    });
    //--------------------------分享朋友圈弹框消失--------------------------------------------

});