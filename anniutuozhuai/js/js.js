var module=(function(){
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
					ty=e.pageY-t;
					$(".max").css({"width":lx+w,"height":ty+t})
			})
		})
		$(document).on("mouseup",function(){
           	$(this).off("mousemove");
       	})
	}
	return {
		dong:dong
	}
})()

