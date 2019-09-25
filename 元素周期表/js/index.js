$(function(){
		
		var arr=[82,238,97];
		var liNum=5*5*5;//暂且认为个数为125个
		var nowX,lastX,minusX=0,nowY,lastY,minusY=0;
		var roY=0,roX=0,roZ=-1000;
		var timer1,timer2;
		init();
		// var arr=[82,238,97]
		function init(){
			//随机排版
			for (var i = 0; i <data.length; i++) {
				var li=$('<li class='+data[i].class+'><span class="index">'+(i+1)+'</span><p class="title">'+data[i].title+'</p><p class="author">'+data[i].cn+'</p><p class="date">'+data[i].w+'</p></li>');
				// var li=$('<li></li>');
				var X=(Math.random()-0.5)*5000;
				var Y=(Math.random()-0.5)*5000;
				var Z=(Math.random()-0.5)*5000;
				li.css({
					"transform":'translate3d('+X+'px,'+Y+'px,'+Z+'px)'
				})
				$('#main').append(li);
				color(i,data[i].color);
			}
			setTimeout(function(){
				Table();
				$('#styleBtn').css({
					'transform':'scale(1)',
					"opacity":1
				});
			},300);
			//选择排版方式
			$('#styleBtn li').each(function(i){
				$(this).click(function(e){
					e=e || window.event;
					var index=$(this).index();
					switch(index)
					{
						case 0:
							change("orange");
							break;
						case 1:
							change("yellow");
							break;
						case 2:
							change("pink");
							break;
						case 3:
							change("purple");
							break;
						case 4:
							change("red");
							break;
						case 5:
							change("aqua");
							break;
						case 6:
							change("lime");
							break;
						case 7:
							change("green");
							break;
						case 8:
							change("blue");
							break;	
						case 9:
							change("gray");
							break;	
					}
					e.stopPropagation();
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
		
		//表格排版
		function Table(){
			var tX = 200 , tY = 200;
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
				}else if (i>89 && i<120) {
					x = arr1[i%89-1].x;
					y = arr1[i%89-1].y;
				}else
				{
					var iX = (i+18) % 18;
					var iY = parseInt((i+18)/18) + 1;
					x = firstX+iX*tX;
					y = firstY+iY*tY;
				}
				$(this).click(function(e){
					$(this).siblings().css({
						"opacity":'0.5',
						"z-index":"1",
						"transition":"0.1s"
					});
					$(this).css({
						'transform':'translate('+x+'px,'+y+'px) scale(3)',
						'opacity':'1',
						'z-index':"2"
					})
					e.stopPropagation();
				});
				$(this).css({
					transform : 'translate('+x+'px,'+y+'px)'
				});
				$(this).hover(function(e){
					$(this).css({
						transform:'translate('+x+'px,'+y+'px) scale(1.5)',
						transition:'0.5s'
					})
					e.stopPropagation();
				},function(e){
					$(this).css({
						transform:'translate('+x+'px,'+y+'px) scale(1)',
						transition:'0.5s',
					})
					$('#main li').css({
						opacity:'1'
					})
					e.stopPropagation();
				})
			});
		}
		$(document).click(function(e){
			$('#main li').css({
				opacity:1
			})
			e.stopPropagation();
		});
		function color(i,arr){
			$('#main li').eq(i).css({
				border:"3px solid rgba("+arr+",.75)",
				boxHhadow:"0 0 12px rgba("+arr+",.5)"
			});
			$('#main li').eq(i).find('p').css({
				color:"rgba("+arr+",0.7)"
			});
			$('#main li').eq(i).find('span').css({
				color:"rgba("+arr+",0.7)"
			});
			$('#main li .title').eq(i).css({
				color:"rgba("+arr+",0.7)",
				textShadow:"0 0 20px rgba("+arr+",.9)"
			});
		}
		function change(color){
			$('#main li.'+color+'').siblings().css({
				opacity:'.5',
				transition:'0.5s'
			})
			$('#main li.'+color+'').css({
				opacity:'1',
				transition:'0.5s'
			})
		}
	})