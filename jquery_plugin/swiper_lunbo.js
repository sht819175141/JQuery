;
(function ($, window, document, undefined) {
    var Beautifier = function (ele, opt) {
        this.$element = ele,
            this.defaults = {
                'type': 'fade',
                'initthis.index': 0,
                'speed': 2000,
                'animatetime': 1000,
                'prev': '',
                'next': '',
                'direction': 'horizontal',
                'autoPlay': false
            },

            this.options = $.extend({}, this.defaults, opt);
        this.len = this.$element.children().children().length;
        this.ind = this.options.initindex;
        this.movewidth = this.$element.width();
        this.moveheight = this.$element.width();
    }
    //定义Beautifier的方法
    Beautifier.prototype = {
        init: function () {
            $(".slide").width(this.movewidth);
            if (this.options.autoPlay == true) {
                this.autoplay();
            } else if (this.options.autoPlay == false) {
                this.direction();
            } else if (this.options.autoPlay == "") {
                this.direction();
            } else {
                alert("请正确输入自动轮播的参数，当前为true，false.或者为空")
            }
        },
        autoplay: function () {
            var timer = null;
            var opt=this.options;
            
            var len = this.$element.children().children().length;
            var ind = this.options.initindex;
            var movewidth = this.$element.width();
            var moveheight = this.$element.width();

            if (this.options.direction == 'horizontal') {
                $(".swiper_wrape").width(this.movewidth * (this.len + 1));
                if (this.options.type == "fade") {
                    timer = setInterval(function(){
                        ind++;
                        if (ind >= len) {
                            $($(".swiper_wrape").children().first().clone()).appendTo($(".swiper_wrape")).parent().stop().animate({
                                'left': -movewidth * ind
                            }, 2000, function () {
                                $(".swiper_wrape").children().last().remove();
                                $(".swiper_wrape").css('left', 0);
                            })
                            ind = 0;
                        } else {
                            $(".swiper_wrape").stop().animate({
                                'left': -movewidth * ind
                            }, 2000)
                        }
                    }, opt.speed);
                }
            } else if (this.options.direction == 'vertical') {
                if (this.options.type == "fade") {
                    if (this.ind >= this.len) {
                        $(".swiper_wrape").height(this.moveheight * (this.len + 1))
                        $($(".swiper_wrape").children().first().clone()).appendTo($(".swiper_wrape")).parent().stop().animate({
                            'top': -this.moveheight * this.ind
                        }, 800, function () {
                            $(".swiper_wrape").css('top', 0)
                            $(".swiper_wrape").children().last().remove();
                        })
                        this.ind = 0
                    } else {
                        $(".swiper_wrape").stop().animate({
                            'top': -this.moveheight * this.ind
                        }, this.options.speed)
                    }
                }
            } else {
                if (this.ind > this.len) {
                    this.ind = 0;
                }
                $(".swiper_wrape").children().eq(this.ind).stop().fadeIn().siblings().fadeOut()
            }
        },
        direction: function () {
            if (this.options.direction == "horizontal") {
                $(".swiper_wrape").width(this.movewwidth * this.len);
            } else if (this.options.direction == "vertical") {
                $(".swiper_wrape").height(this.moveheight * this.len)
            } else {
                $(".swiper_wrape").children().css('position', 'absolute')
            }
        }

    }
    //在插件中使用Beautifier对象
    $.fn.swiper_lunbo = function (options) {
        //创建Beautifier的实体
        var beautifier = new Beautifier(this, options);
        //调用其方法
        return beautifier.init();
    }
})(jQuery, window, document);