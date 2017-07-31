$(function () {
//动态加载item
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
    for (m = 0; m < array.length; m++) {
        var gift_item = $("<div class='gift clearfix'>" +
            "<img src='images/photo.jpeg' class='gift_photo' />" +
            "<img src='images/finish.png' class='finish_photo' style='display: none'/>" +
            "<div class='gift_info'>" +
            "<p class='gift_name'>kindle</p>" +
            "<a class='btn_gift'>解锁</a>" +
            "</div>" +
            "</div>)");
        $(gift_item).find(".gift_photo").attr("src", array[m].src);
        $(gift_item).find(".gift_name").text(array[m].name);
        gift_item.appendTo(".gift_group");
    }
    // 音乐播放功能
    //$("#music_btn").click(function () {
    //    playPause();
    //});
    //$(".fa-pause-circle").click(function () {
    //    playPause();
    //});
    //
    //function playPause() {
    //    var music = document.getElementById('music');
    //
    //
    //    if (music.paused){
    //        music.play();
    //        $(".fa-pause-circle").show();
    //        $(".fa-play-circle").hide();
    //
    //    }
    //    else{
    //        music.pause();
    //        $(".fa-pause-circle").hide();
    //        $(".fa-play-circle").show();
    //    }
    //}

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

    //'已完成'动态传数据
    var text = document.getElementById('text');
    var text_arrary = $('#text').text().substr(1, 7);
    var data_arrary = [];
    var arrary_length = (text_arrary.length + 1) / 2;
    for (i = 0; i < arrary_length; i++) {
        var a = text_arrary.split(',')[i];
        data_arrary.push(a);
    }

    for (j = 0; j < data_arrary.length; j++) {
        if (data_arrary[j] == 5) {
            var gift = document.getElementsByClassName('finish_photo')[j];
            var buttton = document.getElementsByClassName('btn_gift')[j];
            $(gift).show();
            $(buttton).addClass('btn_finish');
        }
    }
    //活动规则
    $('.share_rules').click(function () {
        $('.mask_black').show();
        $('.rule-box').show();
    });
    $('.close').click(function () {
        $('.mask_black').hide();
        $('.rule-box').hide();
    });

    //   解锁
    var arrary_unlock = document.getElementsByClassName('btn_gift');
    for (k = 0; k < arrary_unlock.length; k++) {
        var btn_unlock = arrary_unlock[k];
        $(btn_unlock).click(function () {

        })
    }
    $('.btn_gift').click(function () {
        alert('111111');
    })

});

