$(function(){
	//购物车
	$('.h_right .h_r_shop').hover(function(){
		$(this).addClass('hover');
		$('.h_right .h_r_s_hide').stop().slideDown();
	},function(){
		$(this).removeClass('hover');
		$('.h_right .h_r_s_hide').stop().slideUp();
	});
	// 轮播图
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
	//轮播图左侧列表
	$(function(){
		var $li = $('.details>ul>li');
		$li.hover(function(){
			$(this).find('.b_hide').show();
		},function(){
			$(this).find('.b_hide').hide();
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
			console.log(index);
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
	(function(){
		var $search = $('.search');
		var $s_right = $('.s_right');
		var $input = $('.s_left input');
		var $tip = $('.s_l_tip');
		var $hide = $('.s_hide');
		var $one = $('.list ul li');
		var $product = $('.allMore');
		var $productUl = $('.more');

		$search.hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		});
		$s_right.hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		});
		$input.focus(function(){
			$search.addClass('focus');
			$tip.fadeOut(200);
			$hide.show();
		}).blur(function(){
			$search.removeClass('focus');
			$tip.fadeIn(200);
			$hide.hide();
		});
		$one.hover(function(){
			$product.stop().slideDown(300);
		},function(){
			$product.stop().slideUp(300);
		});
		$product.hover(function(){
			$(this).stop().show();
		},function(){
			$(this).stop().slideUp(300);
		});
		$one.hover(function(){
			var index = $(this).index();
			$productUl.eq(index).show().siblings().hide();
		});
	})();

		//家电选项卡
		$('.citembox').find('.con').find('.rbgimg').eq(0).show();
		$('.citembox').find('.title-more').find('.more').find('li').hover(function(){
			var index=$(this).index();
			$(this).parents('.citembox').find('.con').find('.rbgimg').eq(index).show().siblings().hide();
			console.log(index);
			$(this).parents('.citembox').find('.title-more').find('.more').find('li').eq(index).addClass('selected').siblings().removeClass('selected');
			
		});
		//content
	(function(){
		
		var $li = $('#content .c_content .c_c_li');
		var $btn = $("#content .c_c_btn div");
		var $tab = $('#content .c_c_tab li');
		var $boxWrap = $('#content .c_content .box_wrap');
		var length = $boxWrap.length;

		var color = '';
		$li.each(function(i){
			switch (i)
			{
				case 1:
					color = '#3f9';
					break;
				case 2:
					color = '#ec0000';
					break;
				case 3:
					color = '#00f';
					break;
			
			}
			$(this).css('borderColor' , color).find('h3').css('color' , color);
		});
		$boxWrap.each(function(){
			this.a = 0;
		});
		$li.hover(function(){
			$(this).find('.c_c_btn').show();
		},function(){
			$(this).find('.c_c_btn').hide();
		});

		$tab.click(function(){
			var index = $(this).index();
			var pIndex = $(this).parent().parent().parent().index();
			$boxWrap.eq(pIndex)[0].a = index;
			$(this).addClass('on').siblings().removeClass('on');
			$boxWrap.eq(pIndex).stop(true).animate({
				marginLeft : -$boxWrap.eq(pIndex)[0].a * 296 + 'px'
			},500);

		});

		$btn.click(function(){
			var i = $(this).index();
			var pIndex = $(this).parent().parent().index();
			if ( i )
			{
				if ( $boxWrap.eq(pIndex)[0].a < length-1 )
				{
					$boxWrap.eq(pIndex)[0].a ++;
					
				}else
				{
					return;
				}
			}
			else
			{
				if ($boxWrap.eq(pIndex)[0].a>0)
				{
					$boxWrap.eq(pIndex)[0].a --;
				}
				else
				{
					return;
				}
			}
			$('#content .c_c_tab').eq(pIndex).find('li').eq($boxWrap.eq(pIndex)[0].a).addClass('on').siblings().removeClass('on');
			$boxWrap.eq(pIndex).stop(true).animate({
				marginLeft : -$boxWrap.eq(pIndex)[0].a * 296 + 'px'
			},500);
		});
	})();

	/*video*/
	(function(){
		var $img = $('#video .v_content li img');
		var $span = $('#video .v_content li span');
		var $hide = $('#video .v_hide');
		var $li = $('#video .v_content li');
		var $close = $('#video .v_h_content p .s2');

		$img.hover(function(){
			var index = $(this).parent().index();
			$span.eq(index).addClass('hover');
		},function(){
			var index = $(this).parent().index();
			$span.eq(index).removeClass('hover');
		});
		$span.hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		});
		hSize();
		$(window).resize(hSize);
		$li.click(function(){
			var html = $(this).find('.p1').html();
			$hide.find('.s1').html( html );
			$hide.fadeIn(500,function(){
				$(this).find('.v_h_content').animate({
					opacity : 1
				},300,function(){
					$(this).animate({
						top : '50%'
					},300);
				});
			});
		});
		$close.click(function(){
			$(this).parent().parent().animate({
				top : '-30%',
				opacity : 0
			},300,function(){
				$hide.fadeOut(300);
			});
		});
		function hSize(){
			$hide.css({
				width : $(window).width() + 'px',
				height : $(window).height() + 'px'
			});
		}
		
		
	})();
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