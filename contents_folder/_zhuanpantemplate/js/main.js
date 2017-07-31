var data={
	types:{
		type1:"一等奖",
		type2:"二等奖",
		type3:"三等奖",
		type4:"谢谢您的参与，请再接再厉"
	},
	alerts:{
		alert1:"亲，您已经抽了 1 次奖,你不能再参加本次活动了喔!",
	},
	details:{
		no1:"一等奖：网时奖励200小时 。奖品数量：3",
		no2:"二等奖：网时奖励100小时 。奖品数量：5",
		no3:"三等奖：广播台免费点首歌 。奖品数量：10",
		no4:"本次活动每人可以转 1 次",
		no5:"我们的中奖率高达10%！！"
	},
	actv:{
		cnt:1,
	},
	Deg:{
		lostD:{
			Deg1:6,  Deg2:126,   Deg3:246, 
		},
		prizeD:{
			Deg1:66,  Deg2:186, Deg3:306
		}
	},
	num:90  //设置中奖概率
};		
$(function () {
     window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
             window.setTimeout(callback, 1000 / 60)
        }
})();
    var totalDeg = 360 * 3 + 0;
    var steps = [];
    var lostDeg = [data.Deg.lostD.Deg1, data.Deg.lostD.Deg2, data.Deg.lostD.Deg3];
    var prizeDeg = [data.Deg.prizeD.Deg1, data.Deg.prizeD.Deg2, data.Deg.prizeD.Deg3];
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

    function step() {
        wrapper.style.webkitTransform = 'rotate(' + steps[now++] + 'deg)';
        wrapper.style.MozTransform = 'rotate(' + steps[now++] + 'deg)';
         if (now < steps.length) {
            requestAnimFrame(step);
            return;
        } else  {
            running = false;
            setTimeout(function () {
                if (prize) {
                    alert(data.types['type' + prize]);
                }
            });      
        }
    }
    function start(deg) {
        var num = Math.floor(Math.random()*100);
        if (num<data.num){
        deg = deg || lostDeg[parseInt(lostDeg.length * Math.random())];
        }else{
        deg = deg || prizeDeg[parseInt(prizeDeg.length * Math.random())];
        }	
        running = true;
        clearInterval(timer);
        if (deg == data.Deg.prizeD.Deg1) {prize =1;}
        else if (deg == data.Deg.prizeD.Deg3) {prize =2;}
        else if (deg == data.Deg.prizeD.Deg2) {prize =3;}
        else {prize =4;}
        totalDeg = 360 * 5 + deg;
        steps = [];
        now = 0;
        countSteps();
        requestAnimFrame(step);
    }
    window.start = start;
    wrapper = document.getElementById('cn-wrapper');
    inner = document.getElementById('inner');
    i = 10;
    $("#inner").click(function () {
        if (running) return;
        if (count >= data.actv.cnt) {
            alert(data.alerts.alert1);
            return;
        }
        start();
        running=true;
        count++;
    })
});
$(document).ready(function () {
    $("#p1").html(data.details.no1);
    $("#p2").html(data.details.no2);
    $("#p3").html(data.details.no3);
	$("#p4").html(data.details.no4);
	$("#p5").html(data.details.no5);
});