$(function () {

    var myShakeEvent = new Shake({
        threshold: 10
    });

    myShakeEvent.start();

    function shakeEventDidOccur() {
        var height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

        var gift_index = randomInteger(0, 8);
        $(".christmas_tree").css({
            "animation": "tree_move 2s",
            "-moz-animation": "tree_move 2s",
            "-webkit-animation": "tree_move 2s",
            "-o-animation": "tree_move 2s",
            "animation-fill-mode": "forwards",
            "-moz-animation-fill-mode": "forwards",
            "-webkit-animation-fill-mode": "forwards",
            "-o-animation-fill-mode": "forwards"
        });
        setTimeout(function () {
            $(".gift").eq(gift_index).show().animate({top: Math.floor(height * 0.85) + 'px'}, 'slow');
            setTimeout(function () {
                $(".prize_show").show();
                $(".gift").eq(gift_index).css("top", "0").hide();
                $(".christmas_tree").css({
                    "animation": "none",
                    "-moz-animation": "none",
                    "-webkit-animation": "none",
                    "-o-animation": "none"
                });
            }, 2000);
        }, 3000);
        window.removeEventListener('shake', shakeEventDidOccur, false);

    }

    $(".music_button").click(function () {
        var play = $(".play_button");
        var pause = $(".pause_button");
        if (play.css("display") == "block") {
            play.hide();
            pause.css("display", "block");
            document.getElementsByClassName("background_music")[0].pause();      //音乐暂停
        } else {
            play.css("display", "block");
            pause.hide();
            document.getElementsByClassName("background_music")[0].play();           //音乐播放
        }
    });

    $(".start_game").click(function () {
        $(".mask_shake").show();
        setTimeout(function () {
            $(".mask_shake").hide();
            $(".start_game").hide();
            //$(".merry_text").hide();
            //$(".box_group").hide();
            $(".christmas_tree").show();
            $(".main").css("background-image", "url('images/background.png')");
            var gift_index = randomInteger(0, 4);
            window.addEventListener('shake', shakeEventDidOccur, false);
        }, 2000);
    });

    //$(".mask_shake").click(function(){
    //    $(this).hide();
    //    var gift_index=randomInteger(0,4);
    //    window.addEventListener('shake', shakeEventDidOccur, false);
    //(function (){
    //    $(".christmas_tree").css({
    //        "animation":"tree_move 2s",
    //        "-moz-animation":"tree_move 2s",
    //        "-webkit-animation":"tree_move 2s",
    //        "-o-animation":"tree_move 2s",
    //        "animation-fill-mode": "forwards",
    //        "-moz-animation-fill-mode": "forwards",
    //        "-webkit-animation-fill-mode": "forwards",
    //        "-o-animation-fill-mode": "forwards"
    //    });
    //    setTimeout(function(){
    //        $(".gift").eq(gift_index).show().animate({top:Math.floor(height*0.8)+'px'},'slow');
    //        setTimeout(function(){
    //            $(".prize_show").show();
    //            $(".gift").eq(gift_index).hide();
    //        },2000);
    //    },2000);
    //
    //})();
    //});

    $(".rule_button").click(function () {
        $(".rule_div").show();
    });

    $(".rule_div .close_button").click(function () {
        $(this).parents(".rule_div").hide();
    });

    $(".prize_button").click(function () {
        var array = [
            {
                "src": "images/photo.jpeg",
                "name": "Kindle",
                "lock": 1
            },
            {
                "src": "images/background.png",
                "name": "candy",
                "lock": 2
            },
            {
                "src": "images/background.png",
                "name": "candy",
                "lock": 2
            },
            {
                "src": "images/photo.jpeg",
                "name": "iPhone",
                "lock": 5
            }
        ];
        for (var i = 0; i < array.length; i++) {
            var gift_item = $("<div class='gift_item'>" +
                "<img class='prize_img'>" +
                "<img src='images/finish.png' class='prize_finish'>" +
                "<span class='share_times'>0/5</span>" +
                "<p class='prize_name'></p>" +
                "<div class='clear_button'>开启</div>" +
                "</div>");
            gift_item.find(".prize_img").attr("src", array[i].src);
            gift_item.find(".prize_name").text(array[i].name);
            if (array[i].lock == 5) {
                gift_item.find(".prize_finish").css("display", "block");
                gift_item.find(".share_times").hide();
                gift_item.find(".clear_button").addClass("unlock_button");
            } else {
                gift_item.find(".prize_finish").hide();
                gift_item.find(".clear_button").removeClass("unlock_button");
                gift_item.find(".share_times").show().text(array[i].lock + "/5");
            }
            gift_item.appendTo(".gift_groups");
        }
        $(".prize_list").show();
    });

    $(".prize_div .close_button").click(function () {
        $(this).parents(".prize_div").hide();
        if ($(this).parents(".prize_div").hasClass("prize_show")) {
            window.addEventListener('shake', shakeEventDidOccur, false);
        }
    });

    $(".prize_list").on("click", ".unlock_button", function () {
        console.log("1");
        $(".prize_list").hide();
        var img_src = "";
        $(".prize_img_show").attr("src", img_src);
        $(".prize_show").show();
    });


});

function randomInteger(low, high) {
    return low + Math.floor(Math.random() * (high - low));
}