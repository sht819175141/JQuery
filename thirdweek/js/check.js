;(function($){
	$.fn.addCont=function(opt){   //rData  cData
		var settings=$.extend({
			data:null
		},opt);
		
		return $(this).each(function(){
			var checkTitle='<p>已选</p>'
			$(this).append($(checkTitle))

			if(settings.data.rData){
				appList(this,settings.data.rData,"radio","")
			}
			if(settings.data.cData){
				appList(this,settings.data.cData,"checkbox","<input type='checkbox' name='ck'/>")
			}
			$(".cont ul").css("height",$(".cont ul li").eq(0).outerHeight(true))

			$(this).append("<input type='text'  id='show'/>")

			more()
			btnLi()
			clearSelfstyle()
			clearSelf()
			clearBoth()

		})

		//动态添加单选，多选
		function appList(that,data,cls,check){
			var checkDom='<div class="'+cls+'"><div class="noControl">不限</div><ul>'
			$.each(data,function(i,obj){
				checkDom+='<li>'+check+obj.name+'</li>'
			})
			checkDom+='</ul> <a href="javascript:;" class="more">更多▲</a> </div>'
			$(that).append($(checkDom))
		}
		//点击更多
		function more(){
			$(".more").on("click",function(){
				var	ul=$(this).prev(),
					lih=ul.find("li").outerHeight(true);
				if($(this).text()=="更多▲"){
					ul.css("height","auto");
					$(this).text("收起▼");
				}else{
					$(this).text("更多▲");
					ul.css("height",lih);
				}
			})
		}
		//判断点击单选，点击多选
		function btnLi(){
			$(".cont").on("click","li",function(){

				if(!$(".cont p:has(.empty)").length){
					$(".cont p").append($("<b class='empty'>全部清空</b>"))
				}
				$(this).parent().prev().removeClass("bg")
				//判断是否有多选框,有就是多选
				if($(this).has("input").length){
					//多选狂
					if(!$(this).hasClass("bj")){
						$(this).addClass("bj").find("input").prop("checked",true)
						$(".cont p").append($("<span>"+$(this).text()+"<strong>×</strong></span>"))
					}else{
						$(this).removeClass("bj").find("input").prop("checked",false)
						var txt=$(this).text();
						$(".cont p span").not("#radio").each(function(){
							if($(this).text().slice(0,-1)==txt){
								$(this).remove()
							}
						})
					}
				}else{ //单选
					if($(".cont p #radio").length){
						$("#radio").remove()
					}
					$(this).addClass("check").siblings().removeClass("check")
					$(".cont p").append($("<span id='radio'>"+$(this).text()+"<strong>×</strong></span>"))
				}
				showCont()
			})
		}
		//点击不限
		function clearSelfstyle(){
			$(".noControl").on("click",function(){
				if($(this).parent().attr("class")=="radio"){
					$(this).addClass("bg").next().find("li").removeClass("check")
					$("#radio").remove()
				}else{
					$(".cont p span").not("#radio").remove();
					$(this).addClass("bg").next().find(":checkbox:checked").prop("checked",false)
				}
				showCont()
			})
		}
		//点击叉号
		function clearSelf(){
			$(".cont").on("click","p span strong",function(){
				var span=$(this).parent()
				if(span.attr("id")=="radio"){
					$(".radio ul li.check").removeClass("check")
				}else{
					$(".checkbox li").each(function(){
						if(span.text().slice(0,-1)==$(this).text()){
							$(this).find(":checkbox").prop("checked",false)
						}
					})
				}
				$(this).parent().remove()
				showCont()
			})
		}
		//点击清空选项
		function clearBoth(){
			$(".cont").on("click",".empty",function(){
				$(".noControl").trigger("click").removeClass("bg")
			})
			$("#show").val("")
		}
		//下边显示值
		function showCont(){
			var arr=[]
			$(".cont p span").each(function(){
				arr.push($(this).text().slice(0,-1))
			})
			$("#show").val(arr)
		}
	}
})(jQuery)