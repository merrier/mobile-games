var arr = [0,0,0,0,0,100];
var data={
    types:{
        type1:"一等奖",
        type2:"二等奖",
        type3:"三等奖",
        type4:"四等奖",
        type5:"五等奖",
        type6:"六等奖",
        type7:"未中奖"
    },
    alerts:{
        alert1:"亲，您已经抽了 1 次奖,你不能再参加本次活动了喔!"
    },
    details:{
        no1:"一等奖：网时奖励200小时 。奖品数量：3",
        no2:"二等奖：网时奖励100小时 。奖品数量：5",
        no3:"三等奖：广播台免费点首歌 。奖品数量：10",
        no4:"本次活动每人可以转 1 次",
        no5:"我们的中奖率高达10%！！"
    },
    //----------抽奖的机会数---------
    actv:{
        cnt:3
    }
};
$(function () {
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                window.setTimeout(callback, 1000 / 60)
            }
    })();
    var totalDeg = 360 * 3 + 0;
    var steps = [];
    var proNum = [];
    var prizeDeg = [];
    var prizeDeg4 = [6,136,248,77];
    var prizeDeg5 = [6,96,176,256,129];
    var prizeDeg6 = [6,206,66,156,286,119];
    var prizeDeg7 = [6,59,126,190,246,300,100];
    var prizearr = ["一等奖","二等奖","三等奖","四等奖","五等奖","六等奖"];
    var prize, sncode;
    var count = 0;
    var now = 0;
    var a = 0.05;
    var wrapper, inner, timer, running = false;
    var deg;
    function countSteps() {
        var t = Math.sqrt(2 * totalDeg / a);
        var v = a * t;
        for (var i = 0; i < t; i++) {
            steps.push((2 * v * i - a * i * i) / 2)
        }
        steps.push(totalDeg);
    }

    function prizeShow(prize){
        var prizenum = prize;
        if(prizenum <= prizearr.length-1){
            var text = prizearr[prizenum - 1];
            $(".mask_title_prize").text(text);
            $(".mask_turn_prize").text(text);
            $(".mask_turntable_prize").show();
            $(".mask_black").show();
        }else{
            $(".mask_turntable_noprize").show();
            $(".mask_black").show();
        }
    }

    function step() {
        wrapper.style.webkitTransform = 'rotate(' + steps[now++] + 'deg)';
        wrapper.style.MozTransform = 'rotate(' + steps[now++] + 'deg)';
        if (now < steps.length) {
            requestAnimFrame(step);
            return;
        } else  {
            running = false;
            //----------转盘转完之后的操作----------
            setTimeout(function () {
                prizeShow(prize);
            },500);
        }
    }

    function arrChange(num){
        var arrnum = num;
        var pronum = 0;
        for(var i=0;i<arrnum;i++){
            pronum += arr[i];
            proNum.push(pronum);
        }
        return proNum;
    }


    function start(deg) {
        var num = Math.floor(Math.random()*99);
        //--------设置中奖与未中奖的概率------
        //if (num<data.num){
        //deg = deg || lostDeg[parseInt(lostDeg.length * Math.random())];
        //}else{
        //deg = deg || prizeDeg[parseInt(prizeDeg.length * Math.random())];
        //}

        //if(num<1){
        //    deg = data.Deg.prizeD.Deg1;
        //}else if(num>=1&&num<4){
        //    deg = data.Deg.prizeD.Deg2;
        //}else if(num>=4&&num<10){
        //    deg = data.Deg.prizeD.Deg3;
        //}else if(num>=10&&num<20){
        //    deg = data.Deg.prizeD.Deg4;
        //}else if(num>=20&&num<35){
        //    deg = data.Deg.prizeD.Deg5;
        //}else if(num>=35&&num<80){
        //    deg = data.Deg.prizeD.Deg6;
        //}
        //else{
        //    deg = deg || lostDeg[parseInt(lostDeg.length * Math.random())];
        //}

        var len = arr.length;
        proNum = arrChange(len);
        switch (len){
            case 4:
                prizeDeg = prizeDeg4;
                break;
            case 5:
                prizeDeg = prizeDeg5;
                break;
            case 6:
                prizeDeg = prizeDeg6;
                break;
            case 7:
                prizeDeg = prizeDeg7;
                break;
        }

        if(num<proNum[0]){
            deg = prizeDeg[0];
        }

        for(i=0;i<len-1;i++){
            if(num>=proNum[i]&&num<proNum[i+1]){
                deg = prizeDeg[i+1];
            }
        }

        running = true;
        clearInterval(timer);
        //-------------设置中几等奖的概率-----------
        if (deg == prizeDeg4[0] || deg == prizeDeg5[0] || deg == prizeDeg6[0] || deg == prizeDeg7[0]) {prize =1;}
        else if (deg == prizeDeg4[1] || deg == prizeDeg5[1] || deg == prizeDeg6[1] || deg == prizeDeg7[1]) {prize =2;}
        else if (deg == prizeDeg4[2] || deg == prizeDeg5[2] || deg == prizeDeg6[2] || deg == prizeDeg7[2]) {prize =3;}
        else if (deg == prizeDeg5[3] || deg == prizeDeg6[3] || deg == prizeDeg7[3]) {prize =4;}
        else if (deg == prizeDeg6[4] || deg == prizeDeg7[4]) {prize =5;}
        else if (deg == prizeDeg7[5]) {prize =6;}
        else {prize =7;}
        totalDeg = 360 * 3 + deg;
        steps = [];
        now = 0;
        countSteps();
        requestAnimFrame(step);
    }
    window.start = start;
    wrapper = document.getElementById('cn-outer');
    inner = document.getElementById('cn-inner');
    i = 10;
    $("#cn-inner").click(function () {
        if (running) return;
        //if (count >= data.actv.cnt) {
        //    alert(data.alerts.alert1);
        //    return;
        //}
        start();
        running=true;
        count++;
    })
});


//$(document).ready(function () {
//    $("#p1").html(data.details.no1);
//    $("#p2").html(data.details.no2);
//    $("#p3").html(data.details.no3);
//	$("#p4").html(data.details.no4);
//	$("#p5").html(data.details.no5);
//});


$(function(){
    //-------------------蒙版的通用关闭----------------
    $(".mask_close").click(function(){
        $(".mask_common").fadeOut();
        $(".mask_black").fadeOut();
    });

    $(".mask_black").click(function(){
        $(".mask_black").fadeOut();
        $(".mask_common").fadeOut();
    });

    //--------------------我的奖品-------------------
    $(".con_btn_myprize").click(function(){
        $(".mask_myprize").show();
        $(".mask_black").show();
    });

    //--------------------分享朋友圈---------------------
    $(".con_btn_share").click(function(){
        $(".h_f_box").show();
        $(".mask_black").show();
    });

    $(".h_f_box").click(function(){
        $(".h_f_box").hide();
        $(".mask_black").hide();
    });

    //---------------------为TA助力---------------------
    $(".con_btn_help").click(function(){
        $(".mask_black").show();
        $(".mask_help_success").show();
        setTimeout(function(){
            $(".mask_black").fadeOut();
            $(".mask_help_success").fadeOut();
        },1000)
    });

    //-------------------活动说明-------------------
    $(".con_activity_des").click(function(){
        $(".rule_box").show();
        $(".mask_black").show();
    });


});