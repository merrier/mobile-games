/**
 * Created by hmmoshang on 16/12/27.
 */
$(function () {
    // 指示动画
    setTimeout(function () {
        $('.click').show();
    }, 1200);

    $('.click').animate({
        top: '17rem'

    }, 2000);

// 点击旋转
    $('.help_him').click(function () {
        if (document.getElementsByClassName('bar')[0].style.width == '100%') {
            alert('已经助力满了哦');
        } else {
            $('.light').rotate({
                angle: 0,
                animateTo: 360,
                duration: 1000
            })
        }
        ;
    })
    // 礼品描述
    $('.gift_packet').click(function () {
        $('.click').hide();
        $('.word_description').show();
        $('.mask_black').show();
        $('.gift_description').show();
    })
    $('.sign').click(function () {
        $('.click').hide();
        $('.word_description').show();
        $('.mask_black').show();
        $('.gift_description').show();
    })
    $('.mask_black').click(function () {
        $('.mask_black').hide();
        $('.word_description').hide();
        $('.gift_description').hide();
    })
    // 进度条动态展示与福袋变化展示
    var array = [
        {
            "name": "极致福袋",
            "num": 1
        },
        {
            "name": "女神福袋",
            "num": 7
        },
        {
            "name": "男神福袋",
            "num": 10
        },
        {
            "name": "万能福袋",
            "num": 5
        },
        {
            "name": "人气福袋",
            "num": 5
        },
        {
            "name": "吃货福袋",
            "num": 5
        }
    ];
    // $('.textn').text(Math.floor(Math.random()*7));
    var x = $('.textn').text();
    // alert(x);
    switch (x) {
        case '0' :
            $('.gift_name').text(array[0].name);
            $('.bar').css('width', array[0].num * 10 + '%');
            break;
        case '1' :
            $('.gift_name').text(array[1].name);
            $('.bar').css('width', array[1].num * 10 + '%');
            break;
        case '2' :
            $('.gift_name').text(array[2].name);
            $('.bar').css('width', array[2].num * 10 + '%');
            break;
        case '3' :
            $('.gift_name').text(array[3].name);
            $('.bar').css('width', array[3].num * 10 + '%');
            break;
        case '4' :
            $('.gift_name').text(array[4].name);
            $('.bar').css('width', array[4].num * 10 + '%');
            break;
        case '5' :
            $('.gift_name').text(array[5].name);
            $('.bar').css('width', array[5].num * 10 + '%');
            break;
    }


});

