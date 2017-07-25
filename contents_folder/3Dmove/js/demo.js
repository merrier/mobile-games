/**
 * Created by gaotianyang on 2017/3/9.
 */
$(function () {
    //进度条页面加载完成时消失
    window.onload=function(){
        $("#progress").css({display:"none"})
    };
    //---------------------页面各种点击显示消失效果--------------------
    //点击开始游戏 蒙板消失
    $(".mb_start_btn").click(function () {
        $(".mask_black").hide();
        $(".mb_start").hide();
        $(".mb_rule_box").hide();
        $(".mb_prize_box").hide();
        params.number_find = 0;
    });
    //点击显示活动规则
    $(".mb_activity_rule").click(function () {
        $(".mask_black").show();
        $(".mb_rule_box").show();
    });
    //点击蒙板 提示消失
    $(".mask_black").click(function () {
        $(".mb_start").hide();
        $(".mask_black").hide();
        $(".mb_rule_box").hide();
        $(".mb_prize_box").hide();
    });
    // 点击显示我的奖品
    $(".mb_myprize").click(function () {
        var help = +$(".help_number_now").text();
        var status = +$(".gift_status_now").text();
        var gift = +$(".gift_category").text();

        $(".mask_black").show();
        $(".mb_prize_box").show();

        prizeMaskShow(status,help,gift);

    });
    //分享助力
    $(".mb_btn_help").click(function(e){
        e.stopPropagation();
        $(".mask_share").fadeIn();
    });
    $(".mask_share").click(function(){
        $(".mask_share").fadeOut();
    });


    var gift_img_prefix = "http://localhost:63342/document_server/game_design/contents_folder/3Dmove/images/dwl/gift/gift_";


    //---------------------我的奖品蒙版显示--------------------
    function prizeMaskShow(status,help,gift){

        $(".gift_status_now").text(status);
        $(".help_number_now").text(help);
        $(".gift_category").text(gift);

        $(".mb_prize_box .mb_rule").hide();
        $(".mb_prize_box .mb_btn").hide();

        if(status == 0){
            $(".mb_prize_no").show();
            $(".mb_prize_box .mb_start_btn").show();
        }else if(status == 1){
            $(".mb_prize_help").show();

            if(help == 5){
                $(".mb_prize_box .mb_btn_open").show();
            }else{
                $(".mb_prize_box .mb_btn_help").show();
            }
        }else if(status == 2){
            $(".mb_prize_box .mb_start_btn").show();

            $(".img_gift_category").attr("src",gift_img_prefix + gift + ".png");

            if(gift == 0){
                $(".mb_prize_nogift").show();
            }else{
                $(".mb_prize_gift").show();
            }
        }
    }


    //-----------------开启礼盒按钮点击----------------
    $(".mb_prize_box").delegate(".mb_btn_open","click",function(){
        var openid = $(".openid").text();
        var activity_info_id = $(".activity_info_id").text();
        $.ajax({
            type : "POST",
            url : "/mobile_game.php/GameChicks/unlock",
            dataType : "json",
            data : {"openid" : openid, "activity_info_id" : activity_info_id},
            success:function (data) {
                // data返回JSON数组，格式为{code : (int)状态码, msg : (str)文本信息, gift_info : (arr)数组}
                //例如{code : 1, msg : 恭喜您获得了, gift_info : {...}}
                //gift_info格式为{category : (int)奖品种类, unlocks : (int)助力人数, status : (int)礼物状态}

                $(".gift_status_now").text("2");

                var status = +data.gift_info.status,
                    help = +data.gift_info.unlocks,
                    gift = +data.gift_info.categofy;

                prizeMaskShow(status,help,gift);

            },
            error:function () {

            }
        });
    });

    //-----------------奖品蒙版初始化-----------------
    (function(){
        var help = +$(".help_number_now").text();
        var status = +$(".gift_status_now").text();
        var gift = +$(".gift_category").text();

        $(".help_find").text(help);
        $(".help_rest").text(5 - help);
        $(".mb_prize_box .mb_rule").hide();
        $(".mb_prize_box .mb_btn").hide();

        prizeMaskShow(status,help,gift);
    })();

    //手写拖拽
    var params = {
        currentX: 0,                //鼠标x坐标
        oldCurrentX: 0,             //之前鼠标X坐标
        disX: 0,                    //坐标差
        coefficientX: 0,            //坐标差比例系数
        flag: false,                //鼠标状态
        //currentY: 0,              //鼠标y坐标
        //disY: 0,                  //相对Y坐标
        //currentBlock: 1,          //当前显示的块
        number_all: 7,              //小鸡总数
        number_find: 0,             //找到的小鸡个数
        posx_arr: posXCreate(),     //小鸡x坐标数组
        posy_arr: posYCreate(),     //小鸡y坐标数组
        phoneDis: function (event) {
            //获取触摸点位置
            var e = event || window.event;
            var touch = e.touches[0];
            params.oldCurrentX = parseInt(touch.pageX);
        },
        getMousePos: function (event) {
            if (params.flag) {
                //获取鼠标位置
                var e = event || window.event;
                var touch = e.touches[0];
                params.currentX = parseInt(touch.pageX);
                params.disX = params.currentX - params.oldCurrentX;
                params.coefficientX = -params.disX/100;
                params.oldCurrentX = params.currentX;
            }
        }
    };


    //创建场景
    var s = new C3D.Stage();
    s.size(window.innerWidth, window.innerHeight - 80).material({
        color: "#f9d596"
        //background:"url(../images/front.jpg)"
    }).update();
    document.getElementById('mobiPage').appendChild(s.el);

    //创建1个立方体放入场景

    //游戏层
    var gamePanoRect = {w: 420, h: 60};
    var gameBgData = [
        {url: 'images/dwl/game/c1_60x60.png'},
        {url: 'images/dwl/game/c2_60x60.png'},
        {url: 'images/dwl/game/c3_60x60.png'},
        {url: 'images/dwl/game/c4_60x60.png'},
        {url: 'images/dwl/game/c8_60x60.png'},
        {url: 'images/dwl/game/c6_60x60.png'},
        {url: 'images/dwl/game/c7_60x60.png'}
    ];

    //商店层
    var shopPanoRect = {w: 2360, h: 1206};
    var shopBgData = [
        {url: 'images/dwl/qp/qp1.png'},
        {url: 'images/dwl/qp/qp2.png'},
        {url: 'images/dwl/qp/qp3.png'},
        {url: 'images/dwl/qp/qp4.png'},
        {url: 'images/dwl/qp/qp5.png'},
        {url: 'images/dwl/qp/qp6.png'},
        {url: 'images/dwl/qp/qp7.png'},
        {url: 'images/dwl/qp/qp8.png'},
        {url: 'images/dwl/qp/qp9.png'},
        {url: 'images/dwl/qp/qp10.png'},
        {url: 'images/dwl/qp/qp11.png'},
        {url: 'images/dwl/qp/qp12.png'},
        {url: 'images/dwl/qp/qp13.png'},
        {url: 'images/dwl/qp/qp14.png'},
        {url: 'images/dwl/qp/qp15.png'},
        {url: 'images/dwl/qp/qp16.png'},
        {url: 'images/dwl/qp/qp17.png'},
        {url: 'images/dwl/qp/qp18.png'},
        {url: 'images/dwl/qp/qp19.png'},
        {url: 'images/dwl/qp/qp20.png'}
    ];

    //背景层
    var mountainPanoRect = {w: 2580, h: 1306};
    var mountainBgData = [
        {url: 'images/dwl/bp/bp1.jpg'},
        {url: 'images/dwl/bp/bp2.jpg'},
        {url: 'images/dwl/bp/bp3.jpg'},
        {url: 'images/dwl/bp/bp4.jpg'},
        {url: 'images/dwl/bp/bp5.jpg'},
        {url: 'images/dwl/bp/bp6.jpg'},
        {url: 'images/dwl/bp/bp7.jpg'},
        {url: 'images/dwl/bp/bp8.jpg'},
        {url: 'images/dwl/bp/bp9.jpg'},
        {url: 'images/dwl/bp/bp10.jpg'},
        {url: 'images/dwl/bp/bp11.jpg'},
        {url: 'images/dwl/bp/bp12.jpg'},
        {url: 'images/dwl/bp/bp13.jpg'},
        {url: 'images/dwl/bp/bp14.jpg'},
        {url: 'images/dwl/bp/bp15.jpg'},
        {url: 'images/dwl/bp/bp16.jpg'},
        {url: 'images/dwl/bp/bp17.jpg'},
        {url: 'images/dwl/bp/bp18.jpg'},
        {url: 'images/dwl/bp/bp19.jpg'},
        {url: 'images/dwl/bp/bp20.jpg'}
    ];


    function createPano(imgs, rect) {
        var _len = imgs.length;
        var _step = rect.w / _len;
        var _radius = Math.floor(_step / 2 / Math.tan(Math.PI / _len)) - 1;
        var _sp = new C3D.Sprite();

        for (var i = 0; i < _len; i++) {
            var _p = new C3D.Plane();
            var _r = 360 / _len * i;
            var _a = Math.PI * 2 / _len * i;
            _p.size(_step, rect.h).position(Math.sin(_a) * _radius, 0, -Math.cos(_a) * _radius).rotation(0, -_r, 0).material({
                image: imgs[i].url,
                repeat: 'no-repeat',
                bothsides: false
            }).update();
            _sp.addChild(_p);
        }
        return _sp;
    }


    function createFirstPano(imgs, rect) {
        var _len = imgs.length;
        var _step = rect.w / _len;
        var _radius = 200;                              //1
        var _sp = new C3D.Sprite();

        for (var i = 0; i < _len; i++) {
            var _p = new C3D.Plane();
            var _r = 360 / 24 * params.posx_arr[i];     //2
            var _a = Math.PI * 2 / 24 * params.posx_arr[i];
            var _y = params.posy_arr[i];
            _p.size(_step, rect.h).position(Math.sin(_a) * _radius, _y, -Math.cos(_a) * _radius).rotation(0, -_r, 0).material({
                image: imgs[i].url,
                repeat: 'no-repeat',
                bothsides: false
            }).update();
            _sp.addChild(_p);
        }
        return _sp;
    }

    //---------------------------小鸡的点击事件--------------------------
    $("#main").delegate("div[data-name='game']>div", "click", function () {

        $(this).fadeOut();
        params.number_find++;
        $(".number_find").text(params.number_find);
        $(".number_rest").text(params.number_all - params.number_find);

        if (params.number_find == params.number_all) {
            $(".mb_prize_box").show();
            $(".mask_black").show();

            var openid = $(".openid").text();
            var activity_info_id = $(".activity_info_id").text();
            $.ajax({
                type : "POST",
                url : "/mobile_game.php/GameChicks/get_award",
                dataType : "json",
                data : {"openid" : openid, "activity_info_id" : activity_info_id},

                success:function (data) {
                    // data返回JSON数组，格式为{code : (int)VALUE, message : (str)VALUE}
                    //例如{code : 200, message : 用户添加成功}

                        var gift = +$(".gift_category").text();
                        var help = +$(".help_number_now").text();
                        var status = +$(".gift_status_now").text();

                        if(data.code == 200){
                            $(".gift_status_now").text("1");
                            status = 1;
                            prizeMaskShow(status,help,gift);
                        }else if(data.code == 400){
                            if(gift == 0){
                                $(".mb_prize_nogift").show();
                                $(".mb_prize_box .mb_start_btn").show();
                            }else{
                                $(".mb_prize_opened").show();
                                $(".mb_prize_box .mb_start_btn").show();
                            }
                        }


                },
                error:function () {

                }
            });




        }
    });


    //-------------------------小鸡Y坐标生成-----------------------
    function posYCreate() {
        var arr_posy = randArray(7, -180, 210, 30);
        return arr_posy;
    }

    //-------------------------小鸡X坐标生成------------------------
    function posXCreate() {
        var arr_posx = randArray(7, 0, 24, 1);
        return arr_posx;
    }


    //-------------------------随机区间数组生成-------------------------
    function randArray(n, min, max, radix) {
        var arr = [];
        var arr2 = [];
        for (var i = 0; i < (max / radix) - (min / radix) + 1; i++) {
            arr[i] = min + i * radix;
        }
        for (i = 0; i < n; i++) {
            var x = parseInt(Math.random() * arr.length);
            arr2[i] = arr[x];
            for (j = x; j < arr.length; j++) {
                arr[j] = arr[j + 1];
            }
            arr.length = arr.length - 1;
        }
        return arr2;
    }


    //游戏层(第一层)
    var gamePano = createFirstPano(gameBgData, gamePanoRect);
    gamePano.name("game").position(0, 0, -200).updateT();
    s.addChild(gamePano);

    //商店层(第二层)
    var shopPano = createPano(shopBgData, shopPanoRect);
    shopPano.position(0, 0, -500).updateT();
    s.addChild(shopPano);

    //背景层(第三层)
    var mountainPano = createPano(mountainBgData, mountainPanoRect);
    mountainPano.position(0, 0, -600).updateT();
    s.addChild(mountainPano);


    //刷新场景
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
        function (callback) {
            setTimeout(callback, 1000 / 60);
        };


    //------------------向左旋转------------------
    function goLeft() {

        rotateDistance -= 1;
        shopPano.rotate(0, 0.02+params.coefficientX, 0).updateT();
        mountainPano.rotate(0, 0.01+params.coefficientX, 0).updateT();
        gamePano.rotate(0, params.coefficientX, 0).updateT();
        if (rotateDistance > 0) {
            requestAnimationFrame(goLeft);
        }

    }

    //------------------向右旋转-------------------
    function goRight() {

        rotateDistance -= 1;
        shopPano.rotate(0, -0.02+params.coefficientX, 0).updateT();
        mountainPano.rotate(0, -0.01+params.coefficientX, 0).updateT();
        gamePano.rotate(0, params.coefficientX, 0).updateT();
        if (rotateDistance > 0) {
            requestAnimationFrame(goRight);
        }

    }

    //给最大的盒子增加事件监听(滑动页面)
    $("#main").swipe({
        swipeLeft: function (event, direction, distance, duration, fingerCount) {
            console.log("goLeft");
        },
        swipeRight: function (event, direction, distance, duration, fingerCount) {
            console.log("goRight");
        },
        swipeStatus: function (event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection) {
            rotateDistance = distance;
            if (params.disX < 0) {        //向左滑动页面
                //console.log("goLeft");
                //console.log(params.coefficientX);
                requestAnimationFrame(goLeft);
            } else if (params.disX > 0) {      //向右滑动页面
                //console.log("goRight");
                //console.log(params.coefficientX);
                requestAnimationFrame(goRight);
            }
        },
        threshold: 10
    });

    //绑定移动端touch事件
    document.getElementById('main').addEventListener("touchstart", function () {
        console.log("touchstart");
        params.flag = true;
        params.phoneDis();
        shopPano.position(0, 0, -530).updateT();
        mountainPano.position(0, 0, -630).updateT();
    });
    document.getElementById('main').addEventListener("touchend", function () {
        console.log("touchend");
        params.flag = false;
        shopPano.position(0, 0, -500).updateT();
        mountainPano.position(0, 0, -600).updateT();
    });
    document.getElementById('main').addEventListener("touchmove", function () {
        params.getMousePos(event)
    });
});