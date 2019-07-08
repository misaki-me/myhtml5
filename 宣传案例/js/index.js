$(function(){
			var k=$(window).height();//当前屏幕的高度
			var flag=false;
			//点击next往下滚动一屏幕
			$('.next').click(function(event){
				$.fn.fullpage.moveSectionDown();
			});
			$('#fullpage').fullpage({
				//是否显示项目导航
				navigation:true,
				//项目导航对其方式
				navigationPosition:'left',
				//回调函数滚动到第第二屏后的回调函数,接收anchorLink 和index两个参数,anchorLink是链接的名称,index是序号,从1开始计算
				afterLoad:function(anchorLink,index){
					//往第二屏滚动的时候,next先消失 等所有动画都完毕了next才淡出
					if(index==2){
						$('.next').fadeOut();
						//缓动动画要加到时间的后面,回调函数的前面
						$('.search').show().animate({'right':370},1500,'easeOutBack',function(){
							//方块走进来,沙发2个字显示
							$('.search-words').animate({'opacity':1},500,function(){
								$('.search').hide();
								//图片往右上角,缩小
								$('.search-02-1').show().animate({'height':30,'right':250,'bottom':452,'width':148},1000);
								//同时 沙发图片 变大
								$('.goods-02').show().animate({'height':218},1000);
								//同时白色文字渐渐的显示出来
								$('.words-02').animate({'opacity':1},500,function(){
									$('.next').fadeIn();
								})
							});
						});
					}
				},
				//刚开始滚动屏幕就触发的回调函数onLeave
				//滚动前的回调函数,接收 index,nextIndex,direction 3个参数:index是离开的'页面'的序号,从1开始计算:nextIndex 是滚动到的'页面'的序号,从1开始计算:direction判断往上滚动还是往下滚动,值是 up 或 down
				onLeave:function(index,nextIndex,direction){
					$('.next').fadeOut();
					//第二屏到第三屏的过渡
					if (index == 2 && nextIndex == 3) {
						//当第二屏幕往第三屏滚动的时候,沙发显示并且往第三屏跑	白色盒子显示
						//沙发要往第三屏走,走的距离 就是 当前屏幕的高度-main到底部的高度 - 沙发到main的距离(当前屏幕的高度-250)
						$('.shirt-02').show().animate({'bottom':-(k - 250),'width':207,'left':260},2000,function(){
							$('.img-01-a').animate({'opacity':1},500,function(){
								$('.btn-01-a').animate({'opacity':1},500,function(){
									$('.next').fadeIn();
								})
							})
						});
						$('.cover').show();
					}
					//第三屏到第四屏的过渡
					if (index == 3 && nextIndex == 4) {
						$('.shirt-02').hide();
						//沙发的距离  当前屏幕的高度  -250 + 第三屏幕的50距离
						$('.t1f').show().animate({'bottom':-((k - 250) + 50),'left':260},2000,function(){
							$(this).hide();//动画结束之后自动隐藏
							$('.car-img').show();
							$('.car').animate({'left':1500},4000,'easeInElastic',function(){
								$('.note').show();
								$('.note-img, .words-04-a').animate({'opacity':1},1000,function(){
									$('.next').fadeIn();
								});
							});
						});
					}
					//第四屏到第五屏的过渡
					if (index == 4 && nextIndex == 5) {
						//小手上来
						$('.hand-05').animate({'bottom':0},1000,function(){
							//鼠标显示
							$('.mouse-05-a').animate({'opacity':1});
							//沙发从800到70
							$('.t1f-05').show().animate({'bottom':70},1000,function(){
								//单子上走,走完之后,我们的文字翻转
								$('.order-05').animate({'bottom':390},function(){
									$('.words-05').addClass('words-05-a');
									$('.next').fadeIn();
								});
							});
						});
					}
					//第五屏到第六屏的过渡
					if (index == 5 && nextIndex == 6) {
						//沙发的距离 当前屏幕的高度 减去 box 的 bottom 500
						$('.t1f-05').animate({'bottom':-(k-500),'left':'40%','width':65},1500,function(){
							$('.t1f-05').hide();
						});
						$('.box-06').animate({'left':'38%'},1500,function(){
							$('.box-06').animate({'bottom':40},500,function(){
								$('.box-06').hide();
								//行走过程就是 背景移动的过程 x坐标
								$('.section:eq(5)').animate({'backgroundPositionX':'100%'},4000,function(){
									//当背景动画执行完毕 boy大小复原
									$('.boy').animate({'height':305,'bottom':116},1000,function(){
										$(this).animate({'right':500},500,function(){
											//门显示出来 模拟打开的效果
											$('.door').animate({'opacity':1},200);
											//之后girl显示出来
											$('.girl').show().animate({'right':350,'height':305},500,function(){
												$('.pop-07').show();
												$('.next').fadeIn();
											});
										});
									});
								});
								//光的速度
								$('.words-06-a').show().animate({'left':'30%'},2000,'easeOutElastic');
								$('.pop-06').show();							
							});
						});
					}
					//第六屏到第七屏的过渡
					if (index == 6 && nextIndex == 7) {
						setTimeout(function(){
							$('.star').animate({'width':120},500,function(){
								$('.good-07').show();
								$('.next').fadeIn();
							});
						},2000);
					}
					//第七屏到第八屏的过渡
					$('.beginShoping').hover(function(){
						$('.btn-08-a').toggle();//toggle 显示和隐藏的切换
					});
					//大手跟随鼠标移动
					$(document).mousemove(function(event){
						var x = event.pageX-$('.hand-08').width()/2;
						var y = event.pageY+10;
						//手的top值不能小于minY值		当前屏幕的高度 k 减去手的高度 449
						var minY=k-449;
						if(y<minY){
							y=minY
						}
						//把鼠标在页面中的坐标 给 hand 大手 left top
						$('.hand-08').css({'left':x,'top':y});	
					});
					//当我们点击 再来一次的时候,分两步进行
					// 1.返回第一屏
					$('.again').click(function(){
						$.fn.fullpage.moveTo(1);
						//2.让我们的图片(做动画的元素清除行内样式就可以)
						$('img,.move').attr('style','');
					});

				},
			});
		});