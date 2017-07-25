/**
 * Created by ykzhu on 2016/1/11.
 */
$(document).ready(function(){
//整体游戏的倒计时
    var time_id;
    function countDown(seconds){
         time_id= window.setTimeout(function(){
            seconds--;
            if(seconds>=0){
                var txt = "00 : " + ((seconds < 10) ? "0" + seconds : seconds) ;
                $(".count_time_box").text(txt);
                countDown(seconds);

            }
           /* else if(seconds>=0&&seconds<=30){
                var txt = "00 : " + ((seconds < 10) ? "0" + seconds : seconds) ;
                $(".count_time_box").text(txt);
                countDown(seconds);
                $("#protagonist").removeClass("ani_mon").addClass("ani_mon_2");

            }*/
            else{
                $(".mask_game").show();//蒙板
                $(".game_btn_mask").show();/*猴子的动画结束*/
                $("#protagonist").attr("class","img_responsive");
                $(".game_over").show();//活动结束
                $("#shoot_btn").unbind('click');//解除发射的点击时间
                $(".stone").remove();//礼物删除
            }
        },1000)
    }
    //5s的倒计时
    function jump(count) {
        window.setTimeout(function(){
            count--;
            if(count > 0) {
               $(".count_down_img").hide();
               $("#count_img_"+count).css("display","block");
                jump(count);
            } else {
                $(".count_down_img").hide();
                $("#protagonist").addClass("ani_mon");
               // $("#p_stone").addClass("ani_s_1");
                $(".game_btn_mask").hide();
                $(".count_down").remove();//倒计时消失
                countDown(60);
            }
        }, 1000);
    }
    //游戏开始
    $("#start_btn").click(function(){
        $(this).hide();
        $(this).next().show();
        $(".mask_game").hide();
        $(".game_rule_details").hide();
        $("#count_img_5").css("display","block");
        $(".game_btn_mask").show();
        jump(5);
        });
    //游戏结束
  $("#shoot_btn").click(function(){
      $("#protagonist").attr("src","images/monkey1.png")//发射后的猴子
     var m_r=$("#protagonist").css("left")//猴子的位置/
    /* var m_r_num=Number($("#protagonist").css("left").replace("px",""))+50+"px";*/
    $(".game_con_footer").append("<img src='images/stone.png' class='img_responsive stone ani_s_t'  style=left:"+m_r+">");//添加香蕉
      //0.5s内不能发射
    //$(".game_btn_mask").show();
    setTimeout(function(){
          // $(".game_btn_mask").hide();
           $("#protagonist").attr("src","images/monkey0.png")//准备发射的猴子
    },30);
      shoot_score(m_r);
  })
    //随机图片
 function random_img(){
     var r=Math.random()*100;
     var r_img_num=Math.ceil(r);
     if(r_img_num>=1&&r_img_num<=2){
         return 100;
     }
     if(r_img_num>=3&&r_img_num<=5){
         return 80;
     }
     if(r_img_num>=6&&r_img_num<=10){
         return 60;
     }
     if(r_img_num>=11&&r_img_num<=20){
         return 50;
     }
     if(r_img_num>=21&&r_img_num<=30){
         return 40;
     }
     if(r_img_num>=31&&r_img_num<=45){
         return 20;
     }
     if(r_img_num>=46&&r_img_num<=60){
         return 10;
     }
     if(r_img_num>=61&&r_img_num<=75){
         return 'j';
     }
     if(r_img_num>=76&&r_img_num<=90){
         return 'b';
     }
     if(r_img_num>=91&&r_img_num<=100){
         return 'z';
     }
    }
    //打礼物
  function shoot_score(m_r){
      var m_r=Number(m_r.replace("px",""));//香蕉的位置
      var p_len=$(".p_li").length;
      for(var i=0;i<p_len;i++){
          var p_l=Number($(".p_li").eq(i).css("left").replace("px",""));//礼物的位置
          var s_l=m_r-p_l;//区间

          if(s_l>=0&&s_l<45){
            if(i==0){
                setTimeout(function(){
                    peng(i)
                },1650);
                return false;
              }
              if(i==1){
                  setTimeout(function(){
                      peng(i)
                  },1700);

                  return false;
              }
              if(i==2){
                  setTimeout(function(){
                      peng(i)
                  },1500);

                  return false;
              }
              if(i==3){
                  setTimeout(function(){
                      peng(i)
                  },1650);

                  return false;
              }
              if(i==4){
                  setTimeout(function(){
                      peng(i)
                  },1550);

                  return false;
              }

          }
      }
  }
    function peng(i){
        var src_count=random_img();//随机礼物
        var img_src=$(".p_li").eq(i).find("img").attr("src");
        var score_count_s= img_src.indexOf('_');
        var score_count_e=img_src.indexOf('.')
        var score_count=img_src.substring(score_count_s+1,score_count_e);
        $(".p_score_box").show().find(".p_img_socre").attr("src","images/score_"+score_count+".png");//分数
        if(score_count=='z'){
            //活动结束
            $(".ani_s_t").remove();
            $(".stone").remove();//礼物删除
            $(".mask_game").show();//蒙板
            $(".game_btn_mask").show();/*猴子的动画结束*/
            $("#protagonist").attr("class","img_responsive");
            $(".game_over").show();//活动结束
            $("#shoot_btn").unbind('click');//解除发射的点击时间
            $(".p_img_socre").css("width","80%")
            clearTimeout(time_id);
            return false;
        }
        else
          if(score_count=='j'){
              $(".p_li").eq(i).find("img").attr("src","images/p_"+src_count+".png");//礼物
              var score_num=Number($(".score").text());
            /*  if(score_num<1000){
                $("#protagonist").removeClass("ani_mon").addClass("ani_mon_0");
              }
              if(score_num>=1000&&score_num<2000){
                  $("#protagonist").removeClass("ani_mon_1").addClass("ani_mon");
              }
             if(score_num>=2000&&score_num<3000){
                 $("#protagonist").removeClass("ani_mon_2").addClass("ani_mon_1");
             }
              if(score_num>=3000&&score_num<4000){
                  $("#protagonist").removeClass("ani_mon_3").addClass("ani_mon_2");
              }
              if(score_num>=4000){
                  $("#protagonist").removeClass("ani_mon_4").addClass("ani_mon_3");
              }*/
              clearTimeout(time_id);
              var seconds=Number($(".count_time_box").text().split(":")[1])+11;
              countDown(seconds);
         }
         else
            if(score_count=='b'){
            //变图片
              $(".p_li").each(function(index){
                var src_count=random_img();//随机礼物
                  $(".p_li").eq(index).find("img").attr("src","images/p_"+src_count+".png");

             })

           }
            //正常的图片
           else{
                $(".p_li").eq(i).find("img").attr("src","images/p_"+src_count+".png");//礼物
                //分数变化
                var score=Number($(".score").text());
                $(".score").text(score+Number(score_count));
                var score_now=Number( $(".score").text());
               if(score_now>=1000){
                   $("#protagonist").removeClass("ani_mon").addClass("ani_mon_1");
               }
                if(score_now>=2000){
                    $("#protagonist").removeClass("ani_mon_1").addClass("ani_mon_2");
                }
                if(score_now>=3000){
                    $("#protagonist").removeClass("ani_mon_2").addClass("ani_mon_3");
                }
                if(score_now>=4000){
                    $("#protagonist").removeClass("ani_mon_3").addClass("ani_mon_4");
                }
          }
        setTimeout(function(){
            $(".p_score_box").hide()
        },300);
    }
})