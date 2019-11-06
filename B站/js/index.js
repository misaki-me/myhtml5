(function(){
	var $li=$('.h-t-m-left>ul>li');
	$li.hover(function(){
		$(this).find('.hide').show();},
	function(){
		$(this).find('.hide').hide();
	});
	//导航条
	var content=$('#content');
	var contentlength=content.length;
	var slide=$('#slide');
	var top=content.offset().top;
	var slideLi=$('#slide ul li');
	var nav=$('#content .nav');
	var blue=$('#slide ul li.blue');
	var index=0;
	var onoff=true;
	var minus=($(window).height()-slide.height())/2;
	minus=Math.max(0,minus);
	$(window).resize(function(){
		minus=($(window).height()-slide.height())/2;
		minus=Math.max(0,minus);
		slide.css('top',minus+'px');
	}).scroll(function(){
		var Top=$(document).scrollTop();
		if (Top>100) {
			slide.css('top',minus+'px');
		}else{
			slide.css('top','230px');
		}
	});
	slideLi.click(function(){
		onoff=false;
		index=$(this).index();
		var This=this;
		$(this).addClass('on').siblings().removeClass('on');
		var navtop=nav.eq(index).offset().top;
		$('body,html').animate({
			scrollTop:navtop
		},500,function(){
			onoff=true;
		});
		blue.show().animate({
			top:$(This).position().top+'px',
		},400,function(){
			$(this).hide();
		});
	});
	$(window).scroll(function(){
		if (onoff) {
		var scrollTop=$(document).scrollTop();
		for (var i = 0; i < nav.length; i++) {
			if (scrollTop<nav.eq(i).offset().top) {
				index=i-1;
				if (index<0) {
					index=0;
					slideLi.removeClass('on');
				}else{
					slideLi.eq(index).addClass('on').siblings().removeClass('on');
					blue.show().stop(true).animate({
						top:slideLi.eq(index).position().top+'px',
					},100,function(){
						$(this).hide();
					});
				}	
				break;
			}
		}
		}
	});
})();