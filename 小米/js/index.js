$(function(){
	$('.img-box').find('.pic').find('li').eq(0).show();
	$('.img-box').find('.tab').find('li').eq(0).addClass('select');
	//圆点切换
	$('.img-box').find('.tab').find('li').click(function(){
		var index=$(this).index();
		$(this).addClass('select').siblings().removeClass('select');
		$('.img-box').find('.pic').find('li').eq(index).stop().fadeIn(1000).siblings().stop().fadeOut(1000);
	});
	//右按钮切换
	var index=0;
	$('.img-box').find('.btn').find('.right').click(function(){
		index++;
		if(index==$('.img-box').find('.pic').find('li').length)index=0;
		$('.img-box').find('.pic').find('li').eq(index).stop().fadeIn(1000).siblings().stop().fadeOut(1000);
		$('.img-box').find('.tab').find('li').eq(index).addClass('select').siblings().removeClass('select');
	});
	//左按钮切换
	$('.img-box').find('.btn').find('.left').click(function(){
		index--;
		if(index==-1)index=$('.img-box').find('.pic').find('li').length-1;
		console.log(index);
		$('.img-box').find('.pic').find('li').eq(index).stop().fadeIn(1000).siblings().stop().fadeOut(1000);
		$('.img-box').find('.tab').find('li').eq(index).addClass('select').siblings().removeClass('select');
	});
	//自动播放
	var timer=null;
	function autoPlay(){
		timer=setInterval(function(){
			$('.img-box').find('.btn').find('.right').trigger('click');
		},2000);
	};
	$('.img-box').hover(function(){
		clearInterval(timer);
	},function(){
		autoPlay();
	});
	autoPlay();
		});
	//左侧列表
	$(function(){
	var timer=null;
	$('.img-box').find('.details').find('li').hover(function(){
		clearInterval(timer);//当悬停在列表上的时候清除掉隐藏详细信息的定时器
		$(this).css('background','#FF6700')
		var index=$(this).index();//改变列表颜色
		$('.img-box').find('.allList').find('.list').eq(index).show().siblings().hide();//显示当前列表的详细信息并隐藏所有列表的详细信息
	},function(){
		$(this).css('background','')
		clearInterval(timer);//当鼠标离开列表的时候清除掉隐藏详细信息的定时器
		timer=setTimeout(function(){
			$('.img-box').find('.allList').find('.list').hide();	
		},200);
	});
	$('.allList').mouseleave(function(){//当鼠标离开详细信息的时候执行
		clearInterval(timer);//当鼠标离开详细信息的时候清除掉隐藏详细信息的定时器
		$('.img-box').find('.allList').find('.list').hide();//隐藏所有的详细信息
	}).mouseover(function(){
		clearInterval(timer);
	});
		});
	//次要轮播图
	$(function(){
		var index=0;
		//左按钮
		$('.prev').click(function(){
			if(index<=0)return;
			index--;
			changeBanner($(this),index);
		});
		//右按钮
		$('.next').click(function(){
			var $ul=$(this).parents('.shop5').find('.shop5-1-5').find('ul');
			var len=$ul.length;
			if(index>=len-1)return;
			index++;
			changeBanner($(this),index);
			
		});
		//动画
		function changeBanner($obj,index){
			var $ul=$obj.parents('.shop5').find('.shop5-1-5').find('ul');
			var len=$ul.children().length;
			var left=index*-990;
			$ul.animate({'margin-left':left});
		}
	});

	//头部下拉列表
		$(function(){
			var timer=null;
			$('.banner').find('.list').find('ul').find('li').hover(function(){
				var index=$(this).index();
				clearInterval(timer);
				$(this).parents('.banner').find('.allMore').find('.more').eq(index).stop().slideDown(200).siblings().stop().slideUp(200);
			},function(){
				clearInterval(timer);
				timer=setTimeout(function(){
					$(".banner").find(".allMore").find(".more").stop().slideUp(200);
				},200)
			});
			//离开清除
			$(".banner").find(".allMore").mouseleave(function(){
				clearInterval(timer);
				$(".banner").find(".allMore").find(".more").stop().slideUp();
			}).mouseover(function(){
				clearInterval(timer);
			});	
		});

		//家电选项卡
		$('.citembox').find('.con').find('.rbgimg').eq(0).show();
		$('.citembox').find('.title-more').find('.more').find('li').hover(function(){
			var index=$(this).index();
			$(this).parents('.citembox').find('.con').find('.rbgimg').eq(index).show().siblings().hide();
			console.log(index);
			$(this).parents('.citembox').find('.title-more').find('.more').find('li').eq(index).addClass('selected').siblings().removeClass('selected');
			
		});
		//返回顶部
		$(function(){
			$(window).scroll(function(){
				if($(this).scrollTop()>=200){
					$("#top").stop(true,true).show().fadeIn("fast");
				}else{
					$("#top").stop(true,true).show().fadeOut("fast");
				}
			});
			$("#top").on("click",function(){
				$("html,body").animate({scrollTop:0},400);
			});
		});