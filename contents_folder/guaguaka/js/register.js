// JavaScript Document
$(document).ready(function(e) {
	
})
//注册是否能被点击
/*$(".rect").keyup(function(){
	var phone=$(".rect").eq(0).val();
	var y_z=$(".rect").eq(1).val();
	if(phone!=''&&y_z!=''){
		$(".mask_zhuce").hide()
	}
	else{
		$(".mask_zhuce").show()
	}
})*/
//倒计时

function get_yzm(val){
	var countdown=30; 
	var val=val;
	var mobile=$("#phone_number").val();
	if(checkMobile(mobile)){
		var yzm=MathRand();//验证码

		$.ajax({
			url: '/Game/Fuweng/sendCode',
			type: "POST",
			dataType: 'json',
			data: {
				phone: phone,
				sms_id: 351,
				code: yzm
			},
			success: function (data) {
				;
				console.log(data);
				console.log(typeof(data));

				var aa=data;
				if (data.status == 200) {
					$("#getyzm").next().empty().append(data.message).show();
				} else if (data.status == 203) {
					$("#getyzm").next().empty().append(data.message).show();
				} else {
					$("#getyzm").next().empty().append(data.message).show();
				}
			},
			error: function (data) {

				console.log(data);
				console.log(typeof(data));
				if (data.status == 200) {
					$("#getyzm").next().empty().append(data.message).show();
				} else if (data.status == 203) {
					$("#getyzm").next().empty().append(data.message).show();
				} else {
					$("#getyzm").next().empty().append(data.message).show();
				}

			}
		})

			settime(countdown,val);//倒计时
	}
}
//30s倒计时
function settime(countdown,val) {
	if (countdown==0){ 
    $(".small_mask").hide();
    $(val).html("获取验证码"); 
    countdown =30; 
    MathRand();
    return false;
} else {
 $(".small_mask").show();
 $(val).html("重新发送(" + countdown + ")");
  countdown--; 
} 
setTimeout(function() { 
settime(countdown,val) 
},1000)
} 

function validateForm(){
	if(check_Verification_Code()){
		with (document.getElementById("itemForm")) {  
            method = "post";  
            action = "Wwwww";  
            submit();  
        }  
	}
	
	
	
}
//手机号码的验证
function checkMobile(mobile){
        var phoneReg=/^1[35847][0-9][0-9]{8}$/;
        if(!phoneReg.test(mobile)){
            $("#getyzm").nextAll(".frm_desc").empty().append('*请确认输入的是手机号').show();
           return false;
        }
		else{
             $("#getyzm").nextAll(".frm_desc").empty().hide();
			 return true;
        }
}
//验证码生成
function MathRand() 
{ 
var Num=""; 
for(var i=0;i<6;i++) 
{ 
Num+=Math.floor(Math.random()*10); 
} 
document.getElementById("Lb_Random").innerText=Num; 
} 
//手机验证码验证
function check_Verification_Code(){
	
	var input_yzm_val=$("#inputyzm").val();
	var yzm_val=$(".yzm").text();
	if($("#phone_number").val()==""){
		$(".yzm_div").find(".frm_desc").empty().append('*请确认输入的是手机号').show();
	}
	if(input_yzm_val!=""){
	if(input_yzm_val!=yzm_val){
		$("#inputyzm").next().empty().append('*验证码输入错误').show();
		return ;
	}
	else{
		$("#inputyzm").next().empty().hide();
		return true;
	}
	
	}
	else{
		$("#inputyzm").next().empty().append('*验证码不能为空').show();
	}
}