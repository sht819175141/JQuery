;(function ($) {
    var newda = new Date(),
        //年
        newye = newda.getFullYear(),
        //月
        newmo = newda.getMonth() + 1,
        //日
        newday = newda.getDate();
    //下拉填充
    $("#year").val(newye);
    $("#mon").val(newmo);
    //扩展参数
    $.fn.aa = function (opt) {
        var obj = {
            y: newye,
            m: newmo
        }
        var ste = $.extend({}, obj, opt);
        //传的参数
        var yea = ste.y,
            mon = ste.m;
        //31天的月份
        var arr = [1, 3, 5, 7, 8, 10, 12],

            date = new Date(yea, mon - 1, 1),

            year = date.getFullYear(),
            mont = date.getMonth() + 1,
            dat = new Date(year, mont - 1, 1),
            da = dat.getDay(),
            //30加上星期几=总共的个数;
            tt = 30 + da;
        //行数
        rr = Math.ceil(tt / 7);
        $.each(arr, function (i, val) {
            if (mont == val) {
                tt = 31 + da;
            }
            ;
        })
        for (var i = 0; i < rr; i++) {
            var tr = $("<tr></tr>");
            for (var j = 0; j < 7; j++) {
                tr.append($("<td></td>"))
            }
            ;
            $("tbody").append(tr)
        }
        ;

        for (var x = 0; x < tt; x++) {

            if (x < da) {
                var bb = "";
            } else {
                var bb = x - da + 1;
            }
            $("tbody td").eq(x).html(bb)

            if (newye == year && newmo == mont && newday == bb) {
                $("tbody td").eq(x).addClass("col");
            }
        }
        ;
    }
})(jQuery)
