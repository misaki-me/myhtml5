$(function(){
	setTimeout(function(){
		$('.section:eq(0)').addClass('conmein');
	},200)
	$('#fullpage').fullpage({
		//显示项目符号
		navigation:true,
		//循环滚动
		loopBottom:true,
		onLeave:function(index,nextIndex,direction){
			if(nextIndex != 1){
			//如果不是第一屏幕就给背景添加旋转的类名
				$('#bg').addClass('rotate');
				$('.next-text').animate({'opacity':'0'});
				$('.download-link').animate({'opacity':'1'});
			}else{
				$('#bg').removeClass('rotate');
				$('.next-text').animate({'opacity':'1'});
				$('.download-link').animate({'opacity':'0'});
				$('.p4-text').css('transform','translate(-50%,0) translateZ(0px) rotateY(0deg)');
				$('.p4').css('transform',' translate(-50%,-50%) translateZ(0px) rotateY(0deg) rotateX(0deg)');
			}
			//第二屏幕的制作
			if (nextIndex == 2) {
				$('.p2').css('transform',' translate(-50%,-50%) translateZ(0px) scale(1)');
				$('.p2-1').css({'transform':'translate(-50%,-50%) scale(3)','opacity':'0'});
				$('.introduce').animate({'opacity':'0'},1000);
			}else{
				$('.p2').css('transform',' translate(-50%,-50%) translateZ(2000px) scale(1)');
				$('.p2-1').css({'transform':'translate(-1200px,-50%) rotateY(-180deg) rotateX(10deg) scale(.5)','opacity':'1'});
			}
			//第三屏幕的制作
			if (nextIndex == 3) {
				$('.p3').css('transform','translateZ(-50px) rotateX(30deg)');
				$('.title3').css('transform','translateZ(0px) rotateY(0deg)');
				$('.introduce').animate({'opacity':'1'},2000);
				$('.p4-text').css('transform','translate(50%,0) translateZ(-1200px) rotateY(60deg)');
				$('.p4').css('transform',' translate(50%,-50%) translateZ(-1200px) rotateY(60deg) rotateX(-60deg)');
			}
			//第四屏幕的制作
			if (nextIndex == 4) {
				$('.p3').css('transform','translateZ(-200px) rotateX(-45deg) translateX(3000px)');
				$('.title3').css('transform','translateZ(1200px) rotateY(-60deg)');	
				$('.p4-text').css('transform','translate(-50%,0) translateZ(0px) rotateY(0deg)');
				$('.p4').css('transform',' translate(-50%,-50%) translateZ(0px) rotateY(0deg) rotateX(0deg)');		
				$('.introduce').animate({'opacity':'0'},1000);
			}
			if (index == 4 && nextIndex == 3) {
					
			}
			if (index == 3 && nextIndex == 4) {
				
			}
		}
	});
});