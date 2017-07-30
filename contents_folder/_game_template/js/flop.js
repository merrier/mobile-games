//如果需要在页面初始加载时显示加载进度。主要是指图片很多的情况下：

//可以使用第三方Jquery插件jquery.imgpreload.min.js

//调用里面的方法：imgpreload即可，实例如下：

var imgNum = 0;
var images = [];
$(function(){ preLoadImg(); });

//里面有两种方式
function preLoadImg() {
    //第一种方式：通过dom方法获取页面中的所有img，包括<images>标签和css中的background-image
    /*get all imgs those tag is <images>
     var imgs = document.images;
     for (var i = 0; i < imgs.length; i++) {
     images.push(imgs[i].src);
     }
     //get all images in style
     var cssImages = getallBgimages();
     for (var j = 0; j < cssImages.length; j++) {
     images.push(cssImages[j]);
     }*/

    //第二种方式：把所有该网页上用到的图片文件都预先放入一个数组里
    $.imgpreload(['images/bg1.jpg', 'images/bg2.jpg'], function () {
        //此处是显示进度百分比时需要用到的背景图，这个可以先加载进去
    });

    //then push all other images in array to load
    images.push("images/IMG_1512.jpg");
    images.push("images/IMG_1514.JPG");
    images.push("images/IMG_1517.JPG");


    /*这里是真正的图片预加载 preload*/
    $.imgpreload(images,
        {
            each: function () {
                /*this will be called after each image loaded*/
                var status = $(this).data('loaded') ? 'success' : 'error';
                if (status == "success") {
                    var v = (parseFloat(++imgNum) / images.length).toFixed(2);
                    $(".fakeloader_percentshow").html(Math.round(v * 100) + "<sup>%</sup>");
                }
            },
            all: function () {
                /*this will be called after all images loaded*/
                $(".fakeloader_percentshow").html("100<sup>%</sup>");
                $(".bg_flop").fadeOut(1200);
                $(".main").show();
            }
        });
}

//get all images in style（此方法引用其他博客的）
//function getallBgimages() {
//    var url, B = [], A = document.getElementsByTagName('*');
//    A = B.slice.call(A, 0, A.length);
//    while (A.length) {
//        url = document.deepCss(A.shift(), 'background-image');
//        if (url) url = /url\(['"]?([^")]+)/.exec(url) || [];
//        url = url[1];
//        if (url && B.indexOf(url) == -1) B[B.length] = url;
//    }
//    return B;
//}
//
//
//document.deepCss = function (who, css) {
//    if (!who || !who.style) return '';
//    var sty = css.replace(/\-([a-z])/g, function (a, b) {
//        return b.toUpperCase();
//    });
//    if (who.currentStyle) {
//        return who.style[sty] || who.currentStyle[sty] || '';
//    }
//    var dv = document.defaultView || window;
//    return who.style[sty] ||
//        dv.getComputedStyle(who, "").getPropertyValue(css) || '';
//}
//
//Array.prototype.indexOf = Array.prototype.indexOf ||
//    function (what, index) {
//        index = index || 0;
//        var L = this.length;
//        while (index < L) {
//            if (this[index] === what) return index;
//            ++index;
//        }
//        return -1;
//    }

//这样就能在页面图片很多，且网速很慢的情况下给予用户一个百分比提示。

//在做这个之前，由于每次本地测试加载都很快，百分比瞬间到100%然后消失，为了看上去有那么一回事，我还写了一个伪百分比进度条，仅供玩耍：
//var t = window.setTimeout("preLoad()", 100);
//function preLoad() {
//    $("#loading div").animate({width: step + "px"}, 50).text(step + "%");
//    step += 1;
//    if (step <= 100) {
//        t = window.setTimeout("preLoad()", 100);
//    } else {
//        clearTimeout(t);
//        $("#loading").fadeOut(1000);
//        $("#preloadImg").fadeOut(1000);
//
//        $(".main").show();
//    }
//};
    //(这是一个页面初始化完成之后，在页面上有一个模拟百分比不断增长的过程，到100%后消失进度条，显示主页面，不过跟实际页面加载没任何关系，可以忽悠不懂且有想要此功能的人，哈哈)