;(function($){
	$.fn.creaplug=function(opt){
		var set=$.extend({
			"data":null,
			"radio":null,
			"checked":null
		},opt);
		return $(this).each(function(){
			rander();
			$(".cols").on("click",".btn1",function(){
				if ($(this).text()=="更多▼"){
					$(this).parent().prev().height("auto");
					$(this).parent().parent().css("background","#ccc");
					$(this).text("收起▲")
				}else{
					$(this).parent().prev().height("40px");
					$(this).parent().parent().css("background","none");
					$(this).text("更多▼")
				}
			})


			$(".right").on("click","span",function(){
				if($(this).parent().is("li")){
					$(this).addClass("bg").parent().siblings().children("span").removeClass("bg");
				}else{
					$(this).addClass("bg").siblings().removeClass("bg")
				}
			})

			$("#cont").on("click","span",function(){
				var ind=$(this).parents(".cols").index();
				var chuan=$("#list li").eq(ind);
				var creat="<span>"+$(this).text()+"<em></em></span>";
					chuan.html(creat)
			})
		})

		function rander(){
			var str="";
			if(set.radio){
				$.each(set.data,function(i,obj){
					str+="<div class='headr'><ul><li>"+obj.name+"</li></ul></div>";
				})
			}
			$("#cont").append($("str"));
		}
	}
})(jQuery)
