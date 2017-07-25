/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/6/12>
 // +--------------------------------------------------------------------------*/
// JavaScript Document

$(function(){

    //------------------正则表达式验证-----------------
    function regularExpression(type,val){
        var test_type = type;
        var val = val;
        var test_rule;
        switch (test_type){
            case "positive_integers":
                test_rule = /^[0-9]*[1-9][0-9]*$/;    //正整数
                break;
            case "positive_integers_zero":
                test_rule = /^[0-9]*[0-9][0-9]*$/;    //正整数(包括0)
                break;
        }
        var result = test_rule.test(val);
        return result;
    }


    //---------------------输入比分正则验证--------------------
    $(".enter_score_show").delegate(".score_input","blur",function(){
        var val = $(this).val();
        var result = regularExpression("positive_integers_zero",val);
        if(!result){
            $(this).val("");
            $(".enter_score_tips").show();
            return false;
        }else{
            $(".enter_score_tips").hide();
        }
    });


    //-----------------确定按钮表单验证---------------
    $(".enter_score_form").delegate(".common_btn_confirm","click",function(event){
        var state = true;
        $(".score_input").each(function(){
            var val = $(this).val();
            if(val==""||val==null){
                event.preventDefault();
                $(".enter_score_tips").show();
                state = false;
            }
        });
        if(state == true){
            alert("提交成功");
        }
    });

    //---------------已过竞猜时间蒙版关闭--------------
    battle_outdate_btn

});


