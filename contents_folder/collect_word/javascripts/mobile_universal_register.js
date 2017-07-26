/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://www.merrier.wang> <Date:2016/6/14>
 // +--------------------------------------------------------------------------*/
// JavaScript Document
$(function () {

    //---------------------提示信息动态插入------------------
    function regTipsInsert(box, tips) {
        $(".reg_tips").remove();
        $(".reg_tips_new").eq(0).clone(true).text(tips).addClass("reg_tips").removeClass("reg_tips_new")
            .insertAfter(box).show();
    }


    //-------------------------------获取appid--------------------------
    function getAppid(){
        var appid = 0;
        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: "/Simian/Auth/Login/getappid",
            async: false,
            data: {
                key: "jyzx"
            },
            success: function (data) {
                appid =data;
            },
            error: function () {
                console.log("error");
            }
        });
        console.log(appid);
        return appid;
    }


    //--------------------------------获取md5-----------------------------
    function getMd5(appid){
        var md5_code = 0;
        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: "/Simian/Auth/Login/getMD5API",
            async: false,
            data: {
                appid: appid,
                key: "jyzx"
            },
            success: function (data) {
                md5_code =data;

            },
            error: function () {

            }
        });
        console.log(md5_code);
        return md5_code;
    }


    //-----------------------------验证验证码是否正确----------------------------
    function checkCode(phone,code){
        var appid = getAppid();
        var md5_code = getMd5(appid);
        var pass = 0;

        var send_data = {
            sms_tels: phone,
            sms_code: code,
            sms_time: 60//秒,默认为60秒，如有修改可以直接值参数值，单位为秒
        };

        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: "/MeeZao/API/SmsApi/checkSmsEffectiveAPI",
            async: false,
            data: {
                md5_code: md5_code,
                key: "jyzx",
                data:send_data
            },
            success: function (data) {

                pass =data;

            },
            error: function (data) {
                console.log("error");
            }
        });

        return pass;
    }



    //------------------------------发送验证码并返回状态----------------------------
    function sendCode(phone, code){
        var appid = getAppid();
        var md5_code = getMd5(appid);
        var pass = 0;

        var send_data = {
            sms_tels: phone,
            sms_code: code,
            sms_time: 60//秒,默认为60秒，如有修改可以直接值参数值，单位为秒
        };

        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: "/MeeZao/API/SmsApi/checkSmsEffectiveAPI",
            async: false,
            data: {
                md5_code: md5_code,
                key: "jyzx",
                data:send_data
            },
            success: function (data) {

                pass =data;

            },
            error: function (data) {
                console.log("error");
            }
        });

        return pass;
    }

    ////验证手机号是否正确
    //function check_code_phone(phone,code){
    //    var pass = 0;
    //    var md5_code = 0;
    //    var appid = 0;
    //    //获取appid
    //    $.ajax({
    //        dataType: 'json',
    //        type: 'POST',
    //        url: "/Simian/Auth/Login/getappid",
    //        async: false,
    //        data: {
    //            key: "jyzx"
    //        },
    //        success: function (data) {
    //            appid =data;
    //        },
    //        error: function () {
    //            console.log("error");
    //        }
    //    });
    //    console.log(appid);
    //    //获取md5
    //    $.ajax({
    //        dataType: 'json',
    //        type: 'POST',
    //        url: "/Simian/Auth/Login/getMD5API",
    //        async: false,
    //        data: {
    //            appid: appid,
    //            key: "jyzx"
    //        },
    //        success: function (data) {
    //            md5_code =data;
    //
    //        },
    //        error: function () {
    //
    //        }
    //    });
    //    console.log(md5_code);
    //    var send_data = {
    //        sms_tels: phone,
    //        sms_code: code,
    //        sms_time: 60//秒,默认为60秒，如有修改可以直接值参数值，单位为秒
    //    };
    //    console.log(send_data);
    //    $.ajax({
    //        dataType: 'json',
    //        type: 'POST',
    //        url: "/MeeZao/API/SmsApi/checkSmsEffectiveAPI",
    //        async: false,
    //        data: {
    //            md5_code: md5_code,
    //            key: "jyzx",
    //            data:send_data
    //        },
    //        success: function (data) {
    //            console.log(data);
    //            pass =data;
    //
    //        },
    //        error: function (data) {
    //            console.log("error");
    //            console.log(data);
    //        }
    //    });
    //    return pass;
    //
    //}


    //-----------------------30s倒计时------------------------
    function countDown(countdown) {
        if (countdown == 0) {
            $(".reg_btn_mask").hide();
            $(".reg_btn_getcode").removeClass("reg_btn_gray").html("获取验证码");
            countdown = 40;
            return false;
        } else {
            $(".reg_btn_mask").show();
            $(".reg_btn_getcode").addClass("reg_btn_gray").html("重新发送(" + countdown + ")");
            countdown--;
        }
        setTimeout(function () {
            countDown(countdown);
        }, 1000)
    }


    //-------------------------获取验证码按钮点击----------------------
    $(".reg_box").delegate(".reg_btn_getcode", "click", function () {
        var countdown = 40;
        var phone = $.trim($(".reg_phone_number").val());
        var code = $.trim($(".reg_vercode").val());
        var phone_status = regularExpression("phone_number", phone);

        if (phone == "") {
            regTipsInsert(".reg_phone_number", "手机号不能为空!");
            return false;
        } else if (!phone_status) {
            regTipsInsert(".reg_phone_number", "请输入正确的手机号!");
            return false;
        } else {
            var code_status = checkCodePhone(phone, code);

            if (code_status.status != 200) {
                regTipsInsert(".reg_phone_number", "验证码发送失败!");
                return false;
            } else {
                $(".reg_tips").remove();
                countDown(countdown);//倒计时
            }

        }
    });


    //-----------------------------验证手机号是否正确-------------------------
    function checkCodePhone(phone, code) {
        var pass = 0;
        var md5_code = 0;
        var appid = 0;
        //获取appid
        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: "/Simian/Auth/Login/getappid",
            async: false,
            data: {
                key: "jyzx"
            },
            success: function (data) {
                appid = data;
            },
            error: function () {
                console.log("error");
            }
        });
        console.log(appid);
        //获取md5
        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: "/Simian/Auth/Login/getMD5API",
            async: false,
            data: {
                appid: appid,
                key: "jyzx"
            },
            success: function (data) {
                md5_code = data;

            },
            error: function () {

            }
        });
        console.log(md5_code);
        var send_data = {
            sms_tels: phone,
            sms_code: code,
            sms_time: 60//秒,默认为60秒，如有修改可以直接值参数值，单位为秒
        };
        console.log(send_data);
        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: "/MeeZao/API/SmsApi/systemSmsSendCheckAPI",
            async: false,
            data: {
                md5_code: md5_code,
                key: "jyzx",
                data: send_data
            },
            success: function (data) {
                console.log(data);
                pass = data;

            },
            error: function (data) {
                console.log("error");
                console.log(data);
            }
        });
        return pass;
    }



    //-------------------------手机号被占用的会员注册弹出页面表单验证-----------------------
    $(".universal_register_form").delegate(".form_btn_submit", "click", function () {
        var form = $(this).parents(".universal_register_form");
        var name = form.find(".reg_user_name:visible").val();
        //var gender = form.find("input:radio[name='gender_radio']:checked").val();
        var gender = form.find(".reg_gender_fieldset:visible").find("select option:selected").text();
        var phone = form.find(".reg_phone_number:visible").val();
        var code = form.find(".reg_vercode:visible").val();
        var code_status = check_code_phone(phone,code);
        var phone_status = regularExpression("phone_number", phone);

        if (name == "") {
            regTipsInsert(".reg_useer_name", "请输入姓名!");
            return false;
        } else if (gender == null) {
            regTipsInsert(".reg_gender_fieldset", "请选择性别!");
            return false;
        } else if (gender == "未知性别") {
            regTipsInsert(".reg_gender_fieldset", "性别不能为未知!");
            return false;
        } else if (phone == "") {
            regTipsInsert(".reg_phone_number", "请输入手机号码!");
            return false;
        } else if (!phone_status) {
            regTipsInsert(".reg_phone_number", "请输入正确的手机号!");
            return false;
        } else if (code == "") {
            regTipsInsert(".reg_vercode", "请输入验证码!");
            return false;
        } else if (code_status == 0) {
            regTipsInsert(".reg_vercode", "验证码错误!");
            return false;
        } else {


            $(this).siblings(".hide_btn_submit").trigger("click");


        }
    });

});