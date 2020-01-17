'use strict';
var Swiper = function (targetEle, callback, initIndex) {
    this.wrap = document.querySelector(targetEle);
    if (!this.wrap)return;
    this.startIndex = initIndex || 0;
    this.items = this.wrap.querySelectorAll("p");
    this.len = this.items.length;
    this.itemHeight = this.items[0].offsetHeight;
    this.bindEvent();
    if (callback)this.callback = callback;
    this.moveTo(initIndex);
};
Swiper.prototype = {
    transitionEnd: function () {
        var el = document.createElement('element');

        var transitions = {
            'WebkitTransform': 'webkitTransitionEnd',
            'OTransform': 'oTransitionEnd',
            'MozTransform': 'TransitionEnd',
            'MsTransform': 'msTransitionEnd',
            'transform': 'transitionEnd'
        };
        for (var t in transitions) {
            if (el.style[t] !== undefined) {
                this.transform = t;
                return transitions[t];
            }
        }
    },
    moveTo: function (idx) {
        this.wrap.style.top = -idx * this.itemHeight + "px";
    },
    stopDefault: function (e) {
        e = e || window.event;
        if (e && e.preventDefault) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            window.event.returnValue = false;
            e.cancelBubble = true;
            window.event.cancelBubble = true;
        }
        return false;
    },
    bindEvent: function () {
        this.currentSpan = 0;
        this.index = this.startIndex || 0;
        this.timeSpan = 0;
        this.isTouched = false;
        var l = this.len - 5;
        var startTime, endTime;
        var that = this;

        function _touchstart(e) {
            that.isTouched = !0;
            var computedStyle = getComputedStyle(that.wrap),
                top = computedStyle.getPropertyValue("top");
            this.style.top = top;
            that.removeTransition();
            clearInterval(that.timer);
            startTime = new Date().getTime();
            that.startPointY = e.touches ? e.touches[0].pageY : e.y;
            that.startPointX = e.touches ? e.touches[0].pageX : e.x;
            that.currentSpan = parseFloat(top);
        }

        function _touchmove(e) {
            that.stopDefault(e);
            if (!that.isTouched) return;

            that.movePointY = e.touches ? e.touches[0].pageY : e.y;
            that.movePointX = e.touches ? e.touches[0].pageX : e.x;

            that._spanY = that.movePointY - that.startPointY;
            that._spanX = that.movePointX - that.startPointX;

            if (Math.abs(that._spanX) - Math.abs(that._spanY) > 0) {
                return;//上下滑动幅度比左右滑动幅度大，阻止页面切换
            }

            this.style.top = that._spanY + that.currentSpan + "px";
        }

        function _touchend(e) {
            that.isTouched = !1;
            endTime = new Date().getTime();
            that.timeSpan = endTime - startTime;
            //根据手势计算滑动的距离，返回一个数值，越大表示滑动的越多
            var count = 1;
            if (that.timeSpan < 260 && that.timeSpan > 50) {
                count = Math.ceil(Math.abs(that._spanY * that.timeSpan / 2000));
            } else if (Math.abs(that._spanY) >= that.itemHeight * 0.5) {
                count = Math.ceil(Math.abs(that._spanY / that.itemHeight));
            }

            //根据上下滑动，重新计算索引
            var idx = that.index;//获取之前的索引，以便后续的操作都是在之前的索引基础上进行
            function getIndex(c) {
                //down
                if (that._spanY > 0) {
                    idx -= c;
                    if (idx < 0)idx = 0;
                }
                //up
                if (that._spanY < 0) {
                    idx += c;
                    if (idx > l)idx = l;
                }
            }
            getIndex(count);

            that.index = idx;//更新计算出来的索引
            that._spanY = 0; //重置移动距离
            //添加过渡效果
            that.addTransition();
            //根据索引移动到目标位置
            that.moveTo(idx);
            //触发回调，返回索引
            that.callback && that.callback(idx);
        }

        this.wrap.addEventListener("touchstart", _touchstart, false);
        this.wrap.addEventListener("mousedown", _touchstart, false);
        this.wrap.addEventListener("touchmove", _touchmove, false);
        this.wrap.addEventListener("mousemove", _touchmove, false);
        var doc = document.documentElement;
        doc.addEventListener("mouseup", _touchend, false);
        doc.addEventListener("touchend", _touchend, false);

        this.wrap.addEventListener(this.transitionEnd(), function () {
            that.removeTransition();
            that.currentSpan = parseFloat(this.style.top);
        }, false);
    },
    addTransition:function () {
        this.wrap.style.webkitTransition = "top .15s ease-out";
    },
    removeTransition: function () {
        this.wrap.style.webkitTransition = "";
    }
};


var slideSelector = function (target) {
    var parentDom;
    if (!target) {
        parentDom = document.querySelector('.container') || document.body;
    } else {
        parentDom = typeof target == 'string' ? document.querySelector(target) : target;
    }

    this.wrapper = !parentDom.querySelector('.slide-selector')
        ?
        this.createDom(parentDom,'slide-selector')
        :
        parentDom.querySelector('.slide-selector');

    this.mask = !parentDom.querySelector('.mask-layer')
        ?
        this.createDom(parentDom,'mask-layer')
        :
        document.querySelector('.mask-layer');

    this.defaults = {//默认配置相
        title: '标题',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9],//需要渲染的数据
        done: function (selected) {//点击确定的回调
            //console.log(selected)
        },
        afterSwipe: function (current) {//每次滑动结束的回调
            //console.log(current)
        },
        startIndex: 0
    };

    this.titles = {};

    this.mask.addEventListener('click', function () {
        this.hide();
    }.bind(this), false);

    this.parentDom = parentDom;
};
slideSelector.prototype = {
    init: function () {
        this.parentDom.style.cssText = 'width: 100%;height: 100%;overflow: hidden;';
        this.wrapper.className = this.wrapper.className.replace(' hide','');
        this.selectedIndex = this.data.startIndex || 0;
    },
    trim: function (str) {
        return str.replace(/(^\s+|\s+$)/, '');
    },
    subClass: function (settings,defaults) {
        var Class={};
        for (var name in defaults) {
            if(settings[name]){
                Class[name] = clone(settings[name])
            }else{
                Class[name] = clone(defaults[name])
            }
        }
        function clone(obj) {
            var o;
            if(typeof obj == "object"){
                if(obj === null){
                    o = null;
                }else{
                    if(obj instanceof Array){
                        o = [];
                        for(var i = 0, len = obj.length; i < len; i++){
                            o.push(clone(obj[i]));
                        }
                    }else{
                        o = {};
                        for(var k in obj){
                            o[k] = clone(obj[k]);
                        }
                    }
                }
            }else{
                o = obj;
            }
            return o;
        }
        return Class;
    },
    createDom:function (wrap,cls) {
        var _div = document.createElement('div');
        _div.className = cls;
        wrap.appendChild(_div);
        return _div;
    },
    tpl: '<header class="slide-header">' +
    '<div class="slide-title">{title}</div><span class="slide-cancel">取消</span><span class="slide-sure">确定</span>' +
    '</header>' +
    '<div class="slide-wrapper"><div class="slide-mask"></div>' +
    '<div class="slide-options">{content}</div>' +
    '</div>',
    show: function (data) {
        //收集入参，整合默认设置，入参有使用入参，入参无使用默认
        this.data = this.subClass(data,this.defaults);
        //缓存title，解决多个show()之间selectedIndex耦合的问题
        var rt = this.data.title;
        if(this.titles[rt]==undefined) this.titles[rt] = this.data.startIndex || 0;
        //初始化dom
        this.init();
        //渲染options
        this.render();
        //绑定swipe组件
        this.combineSwipe();
        //显示遮罩
        this.mask.className = this.trim(this.mask.className) + ' show';
        //展示slide content，相对于mask稍微延迟，貌似可以让页面渲染更流畅
        setTimeout(function () {
            this.wrapper.className = this.trim(this.wrapper.className) + ' slide-active';
        }.bind(this), 100);

        //绑定handler
        this.bindEvent();
    },
    render: function () {
        var _data = this.data,
            str = '<p class="slide-option">&nbsp;</p><p class="slide-option">&nbsp;</p>';
        _data.data.forEach(function (v, i) {
            str += '<p class="slide-option" data="' + i + '">' + v + '</p>';
        });
        str += '<p class="slide-option">&nbsp;</p><p class="slide-option">&nbsp;</p>';
        var template = this.tpl;//缓存tpl，防止tpl被覆盖
        template = template.replace('{title}', _data.title).replace('{content}', str);
        this.wrapper.innerHTML = template;
    },
    combineSwipe: function () {
        var that = this;
        //获取缓存titles中的initIndex
        var ct = this.data.title,
            initIndex = this.titles[ct];
        console.log(ct+':'+initIndex)
        this.swiper = new Swiper('.slide-options', function (idx) {
            that.titles[ct] = idx;

            that.selectedIndex = idx;
            !!that.data.afterSwipe && that.data.afterSwipe(idx);
        }, initIndex);
    },
    bindEvent: function () {
        var that = this;

        this.wrapper.onclick = function (e) {
            e.stopPropagation();
            var ev = e || window.event, target = ev.target || ev.srcElement;
            if (target.className == 'slide-cancel') {
                that.hide()
            }
            if (target.className == 'slide-sure') {
                that.hide();

                !!that.data.done && that.data.done({
                    index: that.selectedIndex,
                    value: that.data.data[that.selectedIndex]
                });
            }
        };

        //绑定隐藏事件，destroy dom
        var swipe = this.swiper, that = this;
        if (swipe) {
            if(that.wrapper.getAttribute('listening')) return;
            this.wrapper.addEventListener(swipe.transitionEnd(), _destroy, false)
        } else {
            //setTimeout(_destroy, 300)
            console.error('event listen error --transitionend')
        }

        function _destroy(){
            if (that.wrapper.className.indexOf('slide-active') == -1) that.destroy();
            that.wrapper.setAttribute('listening','true');
        }
    },
    hide: function () {
        this.wrapper.className = this.wrapper.className.replace(' slide-active', '');
        this.mask.className = this.mask.className.replace(' show', '');
        this.parentDom.style = '';
    },
    destroy: function () {
        this.wrapper.innerHTML = "";
        this.wrapper.className+= ' hide';
        this.wrapper.onclick = null;
    }
};
