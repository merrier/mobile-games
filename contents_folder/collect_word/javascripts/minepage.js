/**
 * Created by hmmoshang on 16/10/26.
 */

var wordlist = ["新", "世", "顺", "百", "货", "义", "界", "庆", "店", "我", "爱", "你", "来", "快", "乐", "好"];
var classlist = ["xin", "shi", "shun", "bai", "huo", "yi", "jie", "qing", "dian", "wo", "ai", "ni", "lai", "kuai", "le", "hao"];
var str = document.getElementsByClassName("own-word")[0];
var perstr = str.lastChild.nodeValue;
var ownlist = perstr.split(",");
var numlist = [];
for (var i = 0; i < ownlist.length; i++) {
    var stra = ownlist[i];
    for (var j = 0; j < wordlist.length; j++) {
        var strb = wordlist[j];
        if (stra == strb) {
            numlist.push(j);
        }
    }
}
for (var q = 0; q < numlist.length; q++) {
    var strc = numlist[q];
    var awardword = document.getElementsByClassName(classlist[strc]);
    $(awardword).addClass("not-award");
}
var awardtext0 = document.getElementsByClassName("ticket-info")[0];
var flaga = 1;
for (var j = 0; j < awardtext0.childNodes.length; j++) {

    var abc = awardtext0.childNodes[j];
    if (!($(abc).hasClass("not-award"))) {
        flaga = 0;
    }
}
if (flaga == 1) {
    $(".win-word0").show();

}
if (flaga == 0) {
    $(".lost-word0").show();

}


var awardtext1 = document.getElementsByClassName("ticket-info")[1];
var flagb = 1;
for (var j = 0; j < awardtext1.childNodes.length; j++) {

    var abc = awardtext1.childNodes[j];
    if (!($(abc).hasClass("not-award"))) {
        flagb = 0;
    }
}
if (flagb == 1) {
    $(".win-word1").show();

}
if (flagb == 0) {
    $(".lost-word1").show();

}

var awardtext2 = document.getElementsByClassName("ticket-info")[2];
var flagc = 1;
for (var j = 0; j < awardtext2.childNodes.length; j++) {

    var abc = awardtext2.childNodes[j];
    if (!($(abc).hasClass("not-award"))) {
        flagc = 0;
    }
}
if (flagc == 1) {
    $(".win-word2").show();

}
if (flagc == 0) {
    $(".lost-word2").show();

}

var awardtext3 = document.getElementsByClassName("ticket-info")[3];
var flagd = 1;
for (var j = 0; j < awardtext3.childNodes.length; j++) {

    var abc = awardtext3.childNodes[j];
    if (!($(abc).hasClass("not-award"))) {
        flagd = 0;
    }
}
if (flagd == 1) {
    $(".win-word3").show();

}
if (flagd == 0) {
    $(".lost-word3").show();

}

var awardtext4 = document.getElementsByClassName("ticket-info")[4];
var flage = 1;
for (var j = 0; j < awardtext4.childNodes.length; j++) {
    var abc = awardtext4.childNodes[j];
    if (!($(abc).hasClass("not-award"))) {
        flage = 0;
    }
}
if (flage == 1) {
    $(".win-word4").show();

}
if (flage == 0) {
    $(".lost-word4").show();

}

var awardtext5 = document.getElementsByClassName("ticket-info")[5];
var flagf = 1;
for (var j = 0; j < awardtext5.childNodes.length; j++) {

    var abc = awardtext5.childNodes[j];
    if (!($(abc).hasClass("not-award"))) {
        flagf = 0;
    }
}
if (flagf == 1) {
    $(".win-word5").show();

}
if (flagf == 0) {
    $(".lost-word5").show();

}

