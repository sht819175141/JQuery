define(function(require,exports,module){
	require("../jq/jquery-2.1.1.js");
	require("../css/style.css");
	
		function dong(){
			$("#btn").on("click",function(){
				$("<div class='max'><div class='min'></div></div><div class='zhong'></div>").appendTo(document.body)
				zeng();
			})			
		}
		function zeng(){
			$(".min").on("mousedown",function(e){
				l=e.pageX;
				t=e.pageY;
				w=$(".max").outerWidth();
				t=$(".max").outerHeight();
				$(document).on("mousemove",function(e){
					var lx=e.pageX-l,
						ty=e.pageY-t,
						noww=lx+w,
						nowt=ty+t
						if(noww<100) lx=100;
						if(nowt<100) ty=100;

						if(noww>600) lx=600;
						if(nowt>600) ty=600;
						$(".max").css({"width":noww,"height":nowt})
				})
			})
			$(document).on("mouseup",function(){
           		$(this).off("mousemove");
       		})
		}
	
	exports.dong=dong;
})