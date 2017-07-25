/**
 * Created by hmmoshang on 16/11/8.
 */
$(function () {
    $(".activity").click(function () {
        $(".mask_black").show();
        $(".rule-box").show();
    });
    $(".mask_black").click(function () {
        $(".mask_black").hide();
        $(".rule-box").hide();
        $(".rank_list").hide();
    });
    $(".start").click(function () {
        // $(".vision1").css("animation-name","rotate1,rotate4");
        // $(".vision1").css("animation-duration","1s,2s");
        // $(".vision1").css("animation-iteration-count","3,1");
        // $(".vision1").css("animation-delay","0s,3s");
        // $(".vision1").addClass("animation_name");
        $('.vision4').rotate({
            angle:0,
            animateTo:360,
            duration:1000

        })
        $('.vision2').rotate({
            angle:0,
            animateTo:360,
            duration:1000

        })
        $('.vision3').rotate({
            angle:0,
            animateTo:360,
            duration:1000

        })
       setTimeout(function () {
           $(".vision1").animate({width:"12rem",height:"12rem"})

       },1000)
        if($(".text").text() == "0"){

            setTimeout(function () {
                    $(".vision").hide();
                    $(".start").hide();
                    $(".modal_block").show();
                    $(".refer_ranklist").show();

                },5000)
        }

    });
    $(".share_friends").click(function () {

        $(".share").show();
    });
    $(".share").click(function () {
        $(".share").hide();
    });
    $(".refer_ranklist").click(function () {
        $(".mask-black").show();
        $(".rank_list").show();
        $("html,body").addClass("stop_hua");
    });
    $(".close_button").click(function () {
        $(".mask-black").hide();
        $(".rank_list").hide();
        $("html,body").removeClass("stop_hua");

    })

// $(".vision1").rotate({bind:{
//
//         $(this).rotate({
//             angle:0,
//             animateTo:360
//         })
//
//
//
// }})

});
 
function playPause() {
    alert("111111");
    var music = document.getElementById('music');
    var music_btn = document.getElementById('music_btn');
    if (music.paused){
        music.play();
        music_btn.setAttribute('src','images/pause.jpg') ;
    }
    else{
        music.pause();
        music_btn.setAttribute('src','images/play.jpg') ;
    }
}