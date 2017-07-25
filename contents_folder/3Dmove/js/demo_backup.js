$(function () {
    //手写拖拽
    var params = {
        currentX: 0,       //鼠标x坐标
        oldCurrentX: 0,      //之前鼠标X坐标
        disX: 0,             //坐标差
        flag: false,       //鼠标状态
        //currentY: 0,       //鼠标y坐标
        //disY: 0,             //相对Y坐标
        //currentBlock: 1,     //当前显示的块
        phoneDis:function(event){
            //获取触摸点位置
            var e = event || window.event;
            var touch = e.touches[0];
            params.oldCurrentX=parseInt(touch.pageX);
        },
        getMousePos:function(event){
            if(params.flag){
                //获取鼠标位置
                var e = event || window.event;
                var touch = e.touches[0];
                params.currentX=parseInt(touch.pageX);
                params.disX=params.currentX-params.oldCurrentX;
                params.oldCurrentX=params.currentX;
            }
        }
    };



    //创建场景
    var s = new C3D.Stage();
    s.size(window.innerWidth, window.innerHeight).material({
        //color: "#cccccc"
        background:"url(../images/front.jpg)"
    }).update();
    document.getElementById('main').appendChild(s.el);

    //创建1个立方体放入场景

    var panoRect = {w: 2586, h: 1170};
    var bgData = [
        {url: 'images/zwj/p1.png'},
        {url: 'images/zwj/p2.png'},
        {url: 'images/zwj/p3.png'},
        {url: 'images/zwj/p4.png'},
        {url: 'images/zwj/p5.png'},
        {url: 'images/zwj/p6.png'},
        {url: 'images/zwj/p7.png'},
        {url: 'images/zwj/p8.png'},
        {url: 'images/zwj/p9.png'},
        {url: 'images/zwj/p10.png'},
        {url: 'images/zwj/p11.png'},
        {url: 'images/zwj/p12.png'},
        {url: 'images/zwj/p13.png'},
        {url: 'images/zwj/p14.png'},
        {url: 'images/zwj/p15.png'},
        {url: 'images/zwj/p16.png'},
        {url: 'images/zwj/p17.png'},
        {url: 'images/zwj/p18.png'},
        {url: 'images/zwj/p19.png'},
        {url: 'images/zwj/p20.png'}
    ];

    var panoRect2 = {w: 2586, h: 1170};
    var bgData2 = [
        {url: 'images/zwj/p1.png'},
        {url: 'images/zwj/p2.png'},
        {url: 'images/zwj/p3.png'},
        {url: 'images/zwj/p4.png'},
        {url: 'images/zwj/p5.png'},
        {url: 'images/zwj/p6.png'},
        {url: 'images/zwj/p7.png'},
        {url: 'images/zwj/p8.png'},
        {url: 'images/zwj/p9.png'},
        {url: 'images/zwj/p10.png'},
        {url: 'images/zwj/p11.png'},
        {url: 'images/zwj/p12.png'},
        {url: 'images/zwj/p13.png'},
        {url: 'images/zwj/p14.png'},
        {url: 'images/zwj/p15.png'},
        {url: 'images/zwj/p16.png'},
        {url: 'images/zwj/p17.png'},
        {url: 'images/zwj/p18.png'},
        {url: 'images/zwj/p19.png'},
        {url: 'images/zwj/p20.png'}
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

    //第一层
    var pano = createPano(bgData, panoRect);
    pano.position(0, 0, -400).updateT();
    s.addChild(pano);

    //第二层
    var pano2 = createPano(bgData2, panoRect2);
    pano2.position(0, 0, -800).updateT();
    s.addChild(pano2);

    // //响应屏幕调整尺寸
    // function resize() {
    //     s.size(window.innerWidth, window.innerHeight).update();
    // }
    //
    // window.onresize = function () {
    //     resize();
    // };
    // resize();

    //刷新场景
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
    function (callback) {
        setTimeout(callback, 1000 / 60);
    };

    function goLeft() {

        rotateDistance -= 1;
        pano.rotate(0, 0.01, 0).updateT();
        pano2.rotate(0, 0.01, 0).updateT();
        if (rotateDistance > 0) {
            requestAnimationFrame(goLeft);
        }

    }

    function goRight() {

        rotateDistance -= 1;
        pano.rotate(0, -0.01, 0).updateT();
        pano2.rotate(0, -0.01, 0).updateT();
        if (rotateDistance > 0) {
            requestAnimationFrame(goRight);
        }

    }

    //给最大的盒子增加事件监听(滑动页面)
    $("#main").swipe({
        swipeLeft:function(event, direction, distance, duration, fingerCount){
            console.log("goLeft");
        },
        swipeRight:function(event, direction, distance, duration, fingerCount){
            console.log("goRight");
        },
        swipeStatus: function (event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection) {
            rotateDistance = distance;
            if (params.disX<0) {        //向左滑动页面
                console.log("goLeft");
                requestAnimationFrame(goLeft);
            } else if (params.disX>0) {      //向右滑动页面
                console.log("goRight");
                requestAnimationFrame(goRight);
            }
        },
        threshold: 10
    });

    //绑定移动端touch事件
    document.getElementById('main').addEventListener("touchstart", function(){
        console.log("touchstart");
        params.flag= true;
        params.phoneDis();
        pano.position(0, 0, -410).updateT();
        pano2.position(0, 0, -810).updateT();
    });
    document.getElementById('main').addEventListener("touchend", function(){
        console.log("touchend");
        params.flag= false;
        pano.position(0, 0, -400).updateT();
        pano2.position(0, 0, -800).updateT();
    });
    document.getElementById('main').addEventListener("touchmove", function(){
        params.getMousePos(event)
    });

});