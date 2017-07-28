/**
 * Created by hmmoshang on 16/10/10.
 */
var index = $(".new").text();
var divnew = $("#got-it");
var divn = $(".click-new");
var dive = $(".RankList");
var divw = $(".img-group");
var divh = $("#rule-box");
if (index == 1) {
    divn.css("display", "block");
    $('#coin').click(function (e) {
            e.stopPropagation();
            if (divnew.css("display") === "none") {
                divnew.show();

            }

            document.onclick = function () {
                divnew.css("display", "none");
                divn.css("display", "none");
                dive.css("display", "");
                divw.css("display", "");

            }
        }
    )
    var divc = $("#packet-sexchange");
    $('#red-packet').click(function (e) {
            e.stopPropagation();

            if (divc.css("display") === "none") {
                divc.show();

            }
            document.onclick = function () {
                divc.css("display", "none");
            }
        }
    )
    var divb = $("#packet-exchange");
    $('#join_in').click(function (e) {

            e.stopPropagation();

            if (divb.css("display") === "none") {
                divb.show();

            }
            document.onclick = function () {
                divb.css("display", "none");
            }

        }
    )
    $('#rules').click(function () {
            if (divh.css("display") === "none") {
                divh.show();
            }
            document.onclick = function () {
                divb.css("display", "none");

            }
        }
    )

} else {
    dive.css("display", "block");
    divw.css("display", "block");
    var divc = $("#packet-sexchange");
    $('#red-packet').click(function (e) {
            e.stopPropagation();

            if (divc.css("display") === "none") {
                divc.show();
            }
            document.onclick = function () {
                divc.css("display", "none");
            }
        }
    )
    var divb = $("#packet-exchange");
    $('#join_in').click(function (e) {

            e.stopPropagation();

            if (divb.css("display") === "none") {
                divb.show();

            }
            document.onclick = function () {
                divb.css("display", "none");
            }

        }
    )
    $('#rules').click(function () {

            if (divh.css("display") === "none") {
                divh.show();
            }
            document.onclick = function () {
                divb.css("display", "none");
            }
        }
    )
}


