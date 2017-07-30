$(document).ready(function () {
    $(".show_li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var index = $(this).index();
        $(".cus_list").addClass("hide");
        $(".cus_list").eq(index).removeClass("hide");
    });

    //活动规则
    $(".rule_div").click(function () {
        $(".mask").show();
        $(".rule_box").show();
    });
    $(".mask").click(function () {
        $(this).hide();
        $(".rule_box").hide();
        $(".register").hide();
    });
    cus_list_int();
    /*               点击查看更多                  */

    $(".show_more").click(function () {
        if ($(".cus_tr:gt(5)").is(":hidden")) {
            $(" .cus_tr:gt(5)").show();
        }
        else {
            $(" .cus_tr:gt(5)").hide();
        }

    });
    $(".show_more2").click(function () {
        if ($(".cus_tr2:gt(5)").is(":hidden")) {
            $(" .cus_tr2:gt(5)").show();
        }
        else {
            $(" .cus_tr2:gt(5)").hide();
        }

    });
    //转发给好友
    $(".z_f").click(function () {
        $(".h_f_box").show();
    });
    //分享框
    $(".h_f_box").click(function () {
        $(".h_f_box").hide();
    });
    //点赞
    $(".h_f").click(function () {
        var li_2 = "<li class='cus_tr2 clearfix'>" + '<div class="cus_mess">' +
            "<ul>" +
            ' <li class="cus_li"><span class="sequence">' + '2' + '</span></li>' +
            ' <li class="cus_li"><img src="images/img9.png" class="img_responsive cus_img"/></li>' +
            '<li class="cus_li"><span class="cus_name">' + "无能" + '</span></li>' +
            ' </ul>' +
            ' </div>' +
            '<div class="cus_mess"><span class="cus_score">' + "助力一次" + '</span></div>' + "</li>"
        $(".cus_list").eq(1).children("ul").prepend(li_2);
        cus_list_int();
    });
    //注册
    $(".a_c").click(function () {
        $(".mask").show();
        $(".register").show();
    });
    $(".close_page").click(function () {
        $(".mask").hide();
        $(".register").hide();
    });
    /*        排行榜             */
    function cus_list_int() {

        var len = $(".cus_tr").length;
        var len2 = $(".cus_tr2").length;
        if (len >= 6) {
            $(".show_more").show();
        }
        $(".cus_tr:gt(5)").hide();
        if (len2 >= 6) {
            $(".show_more2").show();
        }
        $(".cus_tr2:gt(5)").hide();
    }

});
