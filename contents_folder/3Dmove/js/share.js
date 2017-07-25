/**
 * Created by dell on 2017/3/12.
 */
$(".helpBtn").click(function () {

});
$(".gameBtn").click(function () {
    self.location='demo.html';
});
//礼品盒跳动
(function time(){
  setTimeout(function(){
      $('.share_content').removeClass('animated bounce').addClass('animated bounce').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('animated bounce');
      });
      time();
  },500);
})();
