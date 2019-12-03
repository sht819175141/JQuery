define(function(require,exports,module){
	require("../jq/jquery-2.1.1.js");
	require("../css/style.css");
	exports.mo=function(){
		$(".box").hover(function(){
			$(".min b").show();
			$(".max").show();
			$(".min").on("mousemove",function(e){

				var l=e.pageX-$(this).offset().left-$("b").width()/2;
				var t=e.pageY-$(this).offset().top-$("b").height()/2;
				var maxl=$(this).outerWidth()-$("b").outerWidth();
				var maxh=$(this).outerHeight()-$("b").outerHeight();
				
				if(l<0)l=0;
				if(t<0)t=0;
				if(l>maxl)l=maxl;
				if(t>maxh)t=maxh;
				$("b").css({"left":l,"top":t});
				
				var lx=$(this).outerWidth()/$("b").outerWidth()*l;
				var ty=$(this).outerHeight()/$("b").outerHeight()*t;

				$("#imgs").css({"left":-lx,"top":-ty});
			})
			$(".min").on("mouseup",function(){
				$(document).off("mousemove");
				$(document).off("mouseup");
			})
		
		},function(){
			$(".min b").hide();
			$(".max").hide();
		})
	}
})