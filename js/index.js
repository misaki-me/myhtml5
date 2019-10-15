$(function(){
		var liNum=5*5*5;//暂且认为个数为125个
		var nowX,lastX,minusX=0,nowY,lastY,minusY=0;
		var roY=0,roX=0,roZ=-2000;
		var timer1,timer2;
		var img=new Image();
		var wrap=$('#wrap')
		img.src='images/bg.png';
		$(img).on('load',function(e){
			e.stopPropagation();
			wrap.css({
				"background":'#023b3b url('+img.src+') center no-repeat',
				"background-size": "cover"
			});
		});
		init();
		//初始化
		function init(){
			//随机排版
			for (var i = 0; i < data.length; i++) {
				var li=$('<li><p class="title">'+data[i].title+'</p><p class="author">'+data[i].details+'</p><p class="date">'+data[i].date+'</p></li>');
				var X=(Math.random()-0.5)*5000;
				var Y=(Math.random()-0.5)*5000;
				var Z=(Math.random()-0.5)*5000;
				li.css({
					"transform":'translate3d('+X+'px,'+Y+'px,'+Z+'px)'
				})
				$('#main').append(li);
			}
			setTimeout(function(){
				Grid();
				$('#styleBtn').css({
					'transform':'scale(1)',
					"opacity":1
				});
			},300);
			//选择排版方式
			$('#styleBtn li').each(function(i){
				$(this).on('click',function(e){
					console.log(1);
					e=e || window.event;
					var index=$(this).index();
					switch(index)
					{
						case 0:
							Table();
							break;
						case 1:
							Sphere();
							break;
						case 2:
							Helix();
							break;
						case 3:
							Grid();
							break;
					}
				});
			});
			
		}
		// 拖拽 滚轮
		$(document).mousedown(function(e){
			e=e || window.event;
			lastX=e.clientX;
			lastY=e.clientY;
			clearInterval(timer1);
			$(this).on("mousemove",function(e){
				e=e || window.event;
				nowX=e.clientX;
				nowY=e.clientY;
				minusX=nowX-lastX//两点的差值
				minusY=nowY-lastY
				roY+=minusX*0.2;
				roX-=minusY*0.2;
				$('#main').css({
					'transform':'translateZ('+roZ+'px) rotateX('+roX+'deg) rotateY('+roY+'deg)'
				});
				lastX=nowX;//前一点的x坐标
				lastY=nowY;
			});
			return false;
		}).mouseup(function(){
			$(this).off('mousemove');
			timer1=setInterval(function(){
				minusX*=0.95;
				minusY*=0.95;
				if (Math.abs(minusX)<0.5) {
					clearInterval(timer1)
				}
				roY+=minusX*0.2;
				roX-=minusY*0.2;
				$('#main').css({
					'transform':'translateZ('+roZ+'px) rotateX('+roX+'deg) rotateY('+roY+'deg)'
				});
			},13);
		}).mousewheel(function(e,d){
			roZ+=d*80;
			roZ=Math.min(0,roZ);
			roZ=Math.max(-8000,roZ);
			$('#main').css({
					'transform':'translateZ('+roZ+'px) rotateX('+roX+'deg) rotateY('+roY+'deg)'
			});
			timer2=setInterval(function(){
				d*=0.85;
				if (Math.abs(d)<0.01) {
					clearInterval(timer2);
				}
				roZ+=d*80;
				roZ=Math.min(0,roZ);
				roZ=Math.max(-8000,roZ);
				$('#main').css({
						'transform':'translateZ('+roZ+'px) rotateX('+roX+'deg) rotateY('+roY+'deg)'
				});
			},13);
		});
		// 整齐排版
		function Grid(){
			var x=400,y=400,z=800;//水平 垂直间隔
			var firstX=-2*x;//第一个Li水平偏移量
			var firstY=-2*y;//第一个Li垂直偏移量
			var firstZ=-2*z;//第一个Li z轴偏移量
			$('#main li').each(function(i){
			var ix=(i%25)%5;//x方向增加的倍数
			var iy=parseInt((i%25)/5);//y方向增加的倍数
			var iz=parseInt(i/25);//z方向增加的倍数
			$(this).css({
				"transform":'translate3d('+(firstX+ix*x)+'px,'+(firstY+iy*y)+'px,'+(firstZ+iz*z)+'px)'				
			});
			})
		}
		//螺旋排版
		function Helix(){
			var roY=10,y=10;
			var midLi=Math.floor($('#main li').length/2);
			var firstY=-10*midLi;
			$('#main li').each(function(i){
				$(this).css({
					'transform':'rotateY('+10*i+'deg) translateY('+(firstY+y*i)+'px) translateZ(1000px)'
				})
			})
		}
		//球形排版
		function Sphere(){
			var z=800;
			var firstRox=0;
			var firstRoy=0;
			var roX=20,roY=360/(data.length/18);
			$('#main li').each(function(i){
				var iY=Math.floor(i/18);
				$(this).css('transform','rotateY('+(firstRoy+iY*roY)+'deg) rotateX('+(firstRox+20*i)+'deg) translateZ('+z+'px)')
			});
		}
		//表格排版
		function Table(){
			var tX = 160 , tY = 200;
			var firstX = -9*tX + 60;
			var firstY = -4*tY;
			var arr = [
				{x:firstX,y:firstY},
				{x:firstX+17*tX,y:firstY},
				{x:firstX , y:firstY+tY },
				{x:firstX+tX , y:firstY+tY},
				{x:firstX+12*tX , y:firstY+tY },
				{x:firstX+13*tX , y:firstY+tY },
				{x:firstX+14*tX , y:firstY+tY },
				{x:firstX+15*tX , y:firstY+tY },
				{x:firstX+16*tX , y:firstY+tY },
				{x:firstX+17*tX , y:firstY+tY },
				{x:firstX , y:firstY+tY*2 },
				{x:firstX+tX , y:firstY+tY*2},
				{x:firstX+12*tX , y:firstY+tY*2 },
				{x:firstX+13*tX , y:firstY+tY*2 },
				{x:firstX+14*tX , y:firstY+tY*2 },
				{x:firstX+15*tX , y:firstY+tY*2 },
				{x:firstX+16*tX , y:firstY+tY*2 },
				{x:firstX+17*tX , y:firstY+tY*2 }
			];
			var arr1=[
				{x:firstX+3*tX,y:firstY+tY*8},
				{x:firstX+4*tX,y:firstY+tY*8},
				{x:firstX+5*tX,y:firstY+tY*8},
				{x:firstX+6*tX,y:firstY+tY*8},
				{x:firstX+7*tX,y:firstY+tY*8},
				{x:firstX+8*tX,y:firstY+tY*8},
				{x:firstX+9*tX,y:firstY+tY*8},
				{x:firstX+10*tX,y:firstY+tY*8},
				{x:firstX+11*tX,y:firstY+tY*8},
				{x:firstX+12*tX,y:firstY+tY*8},
				{x:firstX+13*tX,y:firstY+tY*8},
				{x:firstX+14*tX,y:firstY+tY*8},
				{x:firstX+15*tX,y:firstY+tY*8},
				{x:firstX+16*tX,y:firstY+tY*8},
				{x:firstX+17*tX,y:firstY+tY*8},
				{x:firstX+3*tX,y:firstY+tY*9},
				{x:firstX+4*tX,y:firstY+tY*9},
				{x:firstX+5*tX,y:firstY+tY*9},
				{x:firstX+6*tX,y:firstY+tY*9},
				{x:firstX+7*tX,y:firstY+tY*9},
				{x:firstX+8*tX,y:firstY+tY*9},
				{x:firstX+9*tX,y:firstY+tY*9},
				{x:firstX+10*tX,y:firstY+tY*9},
				{x:firstX+11*tX,y:firstY+tY*9},
				{x:firstX+12*tX,y:firstY+tY*9},
				{x:firstX+13*tX,y:firstY+tY*9},
				{x:firstX+14*tX,y:firstY+tY*9},
				{x:firstX+15*tX,y:firstY+tY*9},
				{x:firstX+16*tX,y:firstY+tY*9},
				{x:firstX+17*tX,y:firstY+tY*9}
			];
			$('#main li').each(function(i){
				var x , y;
				if ( i < 18 )
				{
					x = arr[i].x;
					y = arr[i].y;
				}
				else if (i>89 && i<120) 
				{
					x = arr1[i%89-1].x;
					y = arr1[i%89-1].y;
				}
				else
				{
					var iX = (i+18) % 18;
					var iY = parseInt((i+18)/18) + 1;
					x = firstX+iX*tX;
					y = firstY+iY*tY;
				}
				$(this).css({
					transform : 'translate('+x+'px,'+y+'px)'
				});
			});
		}
		var mainLi=$('#main li');
		var show=$('#show');
		mainLi.click(function(e){
			show.fadeIn(1000).css({
				'transform':'scale(1)'
			});
			e.stopPropagation();
			var now=$(this).index();
			$('#show').find('.s-src').find('a').attr('href',''+data[now].src+'');
			$('#show').find('.s-dec').text(''+data[now].details+'');
			$('#show').find('.s-title').text(''+data[now].title+'');
			$('#show').find('.s-img').html('<img width="100%" height="100%" src="'+data[now].images+'">');
		})
		$(document).click(function(){
			show.fadeOut(1000,function(){
				$(this).css({
					'transform':'rotateY(0deg) scale(1.5)'
				})
			}).css({
			'transform':'rotateY(180deg) scale(0.1)'
			});
		});
		show.click(function(e){
			e.stopPropagation();
				show.css({
					'transform':'rotateY(0deg) scale(1.5)',
					"display":'none'
				});
		});
	})
	//隐藏页面
	$(function(){
		var i=0;//外部函数的变量
		document.onkeydown=function(ev){
			ev=ev||window.event;
			i+=parseInt(ev.keyCode);
			if(i==308)
			{
				window.open('隐藏页面/index.html');
			}
		};
	});//立即执行这个闭包
	move(100);