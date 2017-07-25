1.预加载的z-index为99999（在fakeLoader.min.js中进行设置）所以请确保其为最大。

2.main.html中下段代码为初始化预加载模块类型，以及背景颜色，具体参考fakeLoader.min.js
<script>
	$(document).ready(function(){
				$(".bg_flop").fakeLoader({
//      timeToHide:1200,
					bgColor:"#3498db",
					spinner:"spinner3"
});
});
</script>

3.class="main"为最顶层盒子，请确保没有同级元素。

4.displayPart为省略字数方法，需要省略字数的元素要有displayPart这个class，同时自定义其
属性，displayLength可显示长度，双字节字符的长度*2。

4.以下class名为固定：
  分享朋友圈按钮：btn_share;
  为他助力按钮：btn_help;
  活动说明：btn_activity_des;