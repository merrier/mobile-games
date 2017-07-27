/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://www.merrier.wang> <Date:2016/6/12>
 // +--------------------------------------------------------------------------*/
// JavaScript Document

$(function () {

    var prizeData = [
        {
            name: "奖品1",
            price: "22",
            id: "1"
        },
        {
            name: "奖品2",
            price: "90",
            id: "2"
        },
        {
            name: "奖品3",
            price: "100",
            id: "3"
        },
        {
            name: "奖品4",
            price: "450",
            id: "4"
        },
        {
            name: "奖品5",
            price: "780",
            id: "5"
        },
        {
            name: "奖品6",
            price: "700",
            id: "6"
        },
        {
            name: "奖品7",
            price: "380",
            id: "7"
        },
        {
            name: "奖品8",
            price: "509",
            id: "8"
        }
    ];


    //------------------------进度条更新-----------------------
    (function progressBarUpdate() {
        var id = $(".hide_money_box").find(".hide_money_id").text();
        var already_num = parseInt($(".hide_money_box").find(".hide_money_already").text());


        if (id != undefined && id != "") {
            var int_id = parseInt(id);
            var aim_num = prizeData[int_id - 1].price;
            var name = prizeData[int_id - 1].name;

            var percent = parseInt(already_num / aim_num * 100);
            var need_num = aim_num - already_num;

            $(".prize_name_show").text(name);
            $(".prize_friends_already").text("好友已筹集¥" + already_num);
            $(".main_prize_already").text("您已筹集¥" + already_num);

            if (already_num > aim_num) {    //已经筹集够
                $(".prize_progress_bar").css("width", "100%");
                $(".prize_progress_tips").text("距离目标,还需筹集¥0");
            } else {  //还需要继续筹集
                $(".prize_progress_bar").css("width", percent + "%");
                $(".prize_progress_tips").text("距离目标,还需筹集¥" + need_num);
            }
        }
    })();


    //---------------------帮TA筹集按钮---------------------
    $(".btn_friends_help").click(function () {
        $.ajax({
            dataType: "json",
            url: "hahahahahah.html",
            type: "POST",
            success: function (data) {

            },
            error: function (data) {

            }
        });
    });

    //-----------------------将奖品的index值传给"发起众筹"按钮------------------------
    function prizeIndexAttr(index) {
        $(".sign_btn_launch.btn_launch_changeable").attr("data-id", index);
    }


    var prize_index = 0;
    //-----------------------奖品向左和向右滑动--------------------
    $(".btn_prize_show").click(function () {

        if (!$(".prize_show_main").is(":animated")) {
            if ($(this).hasClass("prize_show_right")) {   //向右滑动
                if (prize_index == 5) {                   //如果是最后一页,就跳转到第一页
                    $(".prize_show_main").animate({
                        left: "0"
                    });
                    prize_index = 0;
                } else {
                    prize_index += 1;
                    $(".prize_show_main").animate({
                        left: -100 * prize_index + "%"
                    });
                }
            } else {                                     //向左滑动
                if (prize_index == 0) {                  //如果是第一页,就跳转到最后一页
                    $(".prize_show_main").animate({
                        left: "-500%"
                    });
                    prize_index = 5;
                } else {
                    prize_index -= 1;
                    $(".prize_show_main").animate({
                        left: -100 * prize_index + "%"
                    });
                }
            }
        }

        prizeIndexAttr(prize_index + 1);
    });


    //----------------------发起众筹按钮-----------------------
    $(".sign_btn_launch.btn_launch_changeable").click(function () {
        var data_id = $(this).attr("data-id");
        console.log(data_id);
    });


    //----------------------点击签到按钮-------------------------
    $(".btn_sign_able").click(function () {
        $.ajax({
            dataType: "json",
            url: "hahahahahah.html",
            type: "GET",
            success: {},
            error: function (data) {
                var data = 3;
                var before = $(".sign_money>span").text();
                var now = parseInt(before) + data;
                $(".sign_money>span").text(now);
                $(".btn_sign_able").hide().siblings(".btn_sign_disable").show();
            }
        });
    });
});


