/**
 * Created by hmmoshang on 16/11/2.
 */
$(function () {
    $(".btn-help").click(function () {
        $(".mask_black").show();
        $(".mask-common").show();
    });
    $(".btn_give").click(function () {
        $(".mask_black").hide();
        $(".mask-common").hide();
    })
});

var random_class = document.getElementsByClassName('word_give')[0];
var random_word = random_class.lastChild;
var wordlist = ["新", "世", "顺", "百", "货", "义", "界", "庆", "店", "我", "爱", "你", "来", "快", "乐", "好"];
var abc = Math.floor(Math.random() * 16);
random_word = wordlist[abc];
var txt = document.createTextNode(random_word);
random_class.appendChild(txt);