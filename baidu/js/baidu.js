$(function(){
	var count=0;

	$("#search").on("keyup",function(e){
		var vall=$(this).val();
		var key=e.keyCode;
		var len=$("#list li").length;
		if($.inArray(key,[38,40])!=-1){
			countnum(key,len);
			$("#list li:nth-child("+count+")").addClass("libg").siblings().removeClass("libg")
			$(this).val($("#list").find(".libg").text());
			return;
		}

		if($.trim(vall)==""){
			$("#list").html("").hide()
		}else{
			$.ajax({
				method:"get",
				url:"server/data.json",
				async:true,
				datatype:"json",
				success:function(result){
					randerlist(result,vall)
					//console.log(result)
				}
			})
		}
	})

	function countnum(key,len){
		if(key==38){
			count--;
			if(count<0){
				count=len
			}
		}else if(key==40){
			count++;
			if(count>len){
				count=0
			}
		}
	}

	function randerlist(data,thisval){
		$("#list").html("")
		$.each(data,function(i,val){
			var datatxt=val.txt;
			if(datatxt.indexOf(thisval)!=-1){
				$("<li><a href='' style='font-weight:bold'>"+datatxt+"</a></li>").appendTo("#list")
				$("#list").show()
			}
		})
		//点击先创建的li，点击相应的内容在input里显示
		$(this).onclick=function(){
			$("#list").html("")
			$("#seach").val=this.innerHTML(下边出现的内容);
		}
	}

	$("#bd").onclick=function(){
		if(search.value==""){
			$("#list").html("").hide()
		}

		$.each(data,function(i,val){
			var datatxt=val.txt;
			if(datatxt.indexOf(thisval)!=-1 || datatxt.content.indexOf(thisval)!=-1){
				$("<li><a href='' style='font-weight:bold'>"+datatxt+"</a></li>").appendTo("#list")
				$("#list").show()

			}
		})
	}
})
