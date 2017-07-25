/**
 * Created by hmmoshang on 16/10/25.
 */
$(function () {
    $(".game-rules").click(function () {
        $(".mask_black").show();
        $(".rule_box").show();
    })
    $(".mask_black").click(function () {
        $(".mask_black").hide();
        $(".rule_box").hide();
    })

})