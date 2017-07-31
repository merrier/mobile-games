//----------------------活动奖品和HOME切换---------------------
$(".foot_title_btn").click(function () {
    var index = $(this).index();
    $(this).addClass("foot_title_btnnow").siblings().removeClass("foot_title_btnnow");
    $(".main_foot_content").eq(index).show().siblings(".main_foot_content").hide();
});

//--------------------我要刮奖按钮------------------
$(".btn_goplay").click(function () {
    window.location.href = './main.html';
});

//------------------中奖概率设置-------------------
var type;
var data = {
    texts: {
        prizetext: {
            text1: "恭喜您，一等奖！",
            text2: "恭喜您，二等奖！",
            text3: "恭喜您，三等奖！",
            text4: "恭喜您，四等奖！",
            text5: "恭喜您，五等奖！"
        },
        noprizetext: {
            text1: "很遗憾，您未中奖！",
            text2: "很遗憾，您未中奖哦！",
            text3: "很遗憾，您未中奖啊！"
        }
    },
    alerts: {
        alert1: "亲，您抽奖机会已用完,好友助力可以继续游戏哦!"
    },
    details: {
        no1: "一等奖：网时奖励200小时 。奖品数量：3",
        no2: "二等奖：网时奖励100小时 。奖品数量：5",
        no3: "三等奖：广播台免费点首歌 。奖品数量：10",
        no4: "四等奖：本次活动每人可以转 1 次",
        no5: "五等奖：我们的中奖率高达10%！！"
    },
    num: 35  //设置中奖概率
};

function prizeText() {
    var text;
    var noprizetext = [data.texts.noprizetext.text1, data.texts.noprizetext.text2, data.texts.noprizetext.text3];
    var num = Math.floor(Math.random() * 99);
    //--------设置中奖与未中奖的概率------
    //if (num<data.num){
    //deg = deg || lostDeg[parseInt(lostDeg.length * Math.random())];
    //}else{
    //deg = deg || prizeDeg[parseInt(prizeDeg.length * Math.random())];
    //}
    if (num > data.num) {
        type = "noprize";
        text = noprizetext[parseInt(noprizetext.length * Math.random())];
    } else {
        if (num < 1) {
            type = "prize1";
            text = data.texts.prizetext.text1;
        } else if (num >= 1 && num < 4) {
            type = "prize2";
            text = data.texts.prizetext.text2;
        } else if (num >= 4 && num < 10) {
            type = "prize3";
            text = data.texts.prizetext.text3;
        } else if (num >= 10 && num < 20) {
            type = "prize4";
            text = data.texts.prizetext.text4;
        } else if (num >= 20 && num < 35) {
            type = "prize5";
            text = data.texts.prizetext.text5;
        }
    }
    return text;
}

function prizeShow() {
    var text = $(".canvas_content").text();
    if (type == "noprize") {
        $(".mask_noprize").show();
        $(".mask_black").show();
    } else if (type == "prize1") {
        $(".mask_prize_title").text("恭喜您中了一等奖");
        $(".mask_prize_content").text("一等奖");
        $(".mask_prize").show();
        $(".mask_black").show();
    } else if (type == "prize2") {
        $(".mask_prize_title").text("恭喜您中了二等奖");
        $(".mask_prize_content").text("二等奖");
        $(".mask_prize").show();
        $(".mask_black").show();
    } else if (type == "prize3") {
        $(".mask_prize_title").text("恭喜您中了三等奖");
        $(".mask_prize_content").text("三等奖");
        $(".mask_prize").show();
        $(".mask_black").show();
    } else if (type == "prize4") {
        $(".mask_prize_title").text("恭喜您中了四等奖");
        $(".mask_prize_content").text("四等奖");
        $(".mask_prize").show();
        $(".mask_black").show();
    } else if (type == "prize5") {
        $(".mask_prize_title").text("恭喜您中了五等奖");
        $(".mask_prize_content").text("五等奖");
        $(".mask_prize").show();
        $(".mask_black").show();
    }
}


$(document).ready(function () {
    var text = prizeText();
    var prizedetail = [data.details.no1, data.details.no2, data.details.no3, data.details.no4, data.details.no5];
    var len = prizedetail.length;
    $(".canvas_content").text(text);
    for (var i = 0; i < len; i++) {
        $(".foot_prize_des").eq(i).text(prizedetail[i]);
    }
});

