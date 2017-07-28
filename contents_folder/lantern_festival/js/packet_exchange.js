var diva = $("#packet-exchange");
$('#join_in').click(function (e) {

        e.stopPropagation();

        if (diva.css("display") === "none") {
            diva.show();

        }
    }
);


var div = $("#packet-sexchange");
$('#red-packet').click(function (e) {
        e.stopPropagation();

        if (div.css("display") === "none") {
            div.show();

        }
    }
);

document.onclick = function () {


    div.css("display", "none");
    diva.css("display", "none");


};


