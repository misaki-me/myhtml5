$(function(){
		var liNum=5*5*5;//暂且认为个数为125个
		var nowX,lastX,minusX=0,nowY,lastY,minusY=0;
		var roY=0,roX=0,roZ=-6000;
		var timer1,timer2;
		// var img=new Image();
		var wrap=$('#wrap');
		// img.src='images/bg.png';
		// $(img).on('load',function(e){
		// 	e.stopPropagation();
		// 	wrap.css({
		// 		"background":'#023b3b url('+img.src+') center no-repeat',
		// 		"background-size": "cover"
		// 	});
		// });
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
				Table();
				$('#styleBtn').css({
					'transform':'scale(1)',
					"opacity":1
				});
			},300);
			//选择排版方式
			$('#styleBtn li').each(function(i){
				$(this).on('click',function(e){
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
		document.addEventListener('touchstart',function(e){
			var touch=e.touches[0];
			lastX=Number(touch.pageX);
			lastY=Number(touch.pageY);
			clearInterval(timer1);
			this.addEventListener('touchmove',move);
			function move(e){
				var touch=e.touches[0];
				nowX=Number(touch.pageX);
				nowY=Number(touch.pageY);
				minusX=nowX-lastX//两点的差值
				minusY=nowY-lastY
				roY+=minusX*0.5;
				roX-=minusY*0.5;
				$('#main').get(0).style.transform='translateZ('+roZ+'px) rotateX('+roX+'deg) rotateY('+roY+'deg)';
				lastX=nowX;//前一点的x坐标
				lastY=nowY;
			};
			return false;
		});
		document.addEventListener('touchend',function(e){
			var touch=e.touches[0];
			this.removeEventListener('touchmove',move);
			timer1=setInterval(function(){
				minusX*=0.95;
				minusY*=0.95;
				if (Math.abs(minusX)<0.5) {
					clearInterval(timer1)
				}
				roY+=minusX*0.5;
				roX-=minusY*0.5;
				$('#main').get(0).style.cstransforms='translateZ('+roZ+'px) rotateX('+roX+'deg) rotateY('+roY+'deg)';
			},13);
		});
		$(document).mousewheel(function(e,d){
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
	});
(function(win, doc) {
        const maxW = win.innerWidth;
        const maxH = win.innerHeight;
        const maxSize = 5;
        const minSize = 1;
        let isMoving = false;
        let timer = null;

        let canvas = doc.getElementById('canvas');
        canvas.width = maxW;
        canvas.height = maxH;
        let ctx = canvas.getContext('2d');

        let stars = [];      // 存放作为背景使用的星星
        let move_stars = []; // 存放鼠标移动时绘制的星星

        function CanvasStar(num) {
            this.num = num;
        };

        CanvasStar.prototype = {
            render() {
                for (let i = 0; i < this.num; i++) {
                    let alpha = Math.random() + 0.1;
                    stars[i] = new Star(i, getOneRandom(maxW), getOneRandom(maxH), getOneRandom(maxSize, minSize), true, alpha);
                }
                animate();
            }
        };

        function Star(id, x, y, r, isCache, dot_alpha) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.r = r;
            this.dot_alpha = dot_alpha;
            this.show = .5;    // 作用：控制 鼠标绘制点的隐藏
            this.direct = getOneRandom(180) + 180;
            this.isCache = isCache;
            this.cacheCanvas = doc.createElement('canvas');
            this.ctx_cache = this.cacheCanvas.getContext('2d');
            if(isCache) {
                this.cache();
            }
        };

        Star.prototype = {

            draw() {
                // 绘制一个Star
                if(!this.isCache) {
                    let alpha = Math.random() + 0.1;
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                    ctx.closePath();
                    
                    ctx.shadowColor = '#fff';
                    ctx.shadowBlur = 2 * this.r;
                    ctx.fillStyle = `rgba(255, 255, 255, ${ this.dot_alpha })`;
                    ctx.fill();
                    ctx.restore();
                }else {
                    ctx.drawImage(this.cacheCanvas, this.x - 3 * this.r, this.y - 3 * this.r)
                }
            },

            move() {
                this.y -= 0.25;
                if(this.y < -10) {
                    this.y = maxH + 10;
                }
                this.draw();
            },

            // 使鼠标绘制的点抖动起来
            shake(arr) {
                this.show -= 0.01;
                if(this.show < 0) {
                    return;
                }
                let speed = .5;
                this.x += Math.cos(this.direct * Math.PI / 180) * speed;
                this.y += Math.sin(this.direct * Math.PI / 180) * speed;
                this.draw();
                this.link();
            },

            link() {
                if(!this.id) return;
                let len = move_stars.length;
                // 关键思想：取当前id，之前的4个点，每绘制一次就向前取4个点，以此类推
                // 而不是move_stars最后的四个点，否则的话只有最后几个点会被连接起来
                let arr = move_stars.slice(this.id - 3, this.id);
                let endIdx = arr.length - 1;

                ctx.save();
                for(let i = endIdx; i >= 0; i--) {
                    if(i == endIdx && !!arr[endIdx]) {
                        ctx.moveTo(arr[endIdx].x, arr[endIdx].y);
                        ctx.beginPath();
                        ctx.lineTo(this.x, this.y);
                    }
                    if(i != endIdx && !!arr[i] && arr[i].show > 0) ctx.lineTo(arr[i].x, arr[i].y);
                }
                ctx.closePath();

                ctx.strokeStyle = 'rgba(255, 255, 255, 0.125)';
                ctx.stroke();
                ctx.restore();
            },
            cache() {
                this.cacheCanvas.width = 6 * this.r;
                this.cacheCanvas.height = 6 * this.r;

                this.ctx_cache.save();
                this.ctx_cache.beginPath();
                this.ctx_cache.arc(this.r * 3, this.r * 3, this.r, 0, 2 * Math.PI, false);
                this.ctx_cache.closePath();

                this.ctx_cache.shadowColor = '#fff';
                this.ctx_cache.shadowBlur = 2 * this.r;
                this.ctx_cache.fillStyle = `rgba(255, 255, 255, ${this.dot_alpha})`;
                this.ctx_cache.fill();
                this.ctx_cache.restore();
            }
        };

        // 动画
        function animate() {
            ctx.clearRect(0, 0, maxW, maxH);
            let len = stars.length;
            for(let i = 0; i < len; i++) {
                stars[i].move();
            }

            let len2 = move_stars.length;
            if(isMoving) {
                for(let i = 0; i < len2; i++) {
                    if(move_stars[i]) move_stars[i].shake(move_stars);
                }
            }else {
                move_stars = []
            }
            requestAnimationFrame(animate);
        };

        // 获取区间内的随机数
        function getOneRandom(max, min = 0) {
            return Math.floor(Math.random() * (max - min) + min);
        };

        // 获取正负号
        function getSign() {
            return Math.random() > .5 ? -1 : 1;
        };

        // 鼠标移动事件
        doc.addEventListener('mousemove', function(e) {
            let x = e.clientX, y = e.clientY;
            // 控制绘制密度 以及点之间的距离    两个重要的点
            // 密度是控制绘制的数量     dis_x = Math.abs(x - pre_star.x);
            // 距离是在已绘制的点基础上、控制点的间距

            // 控制绘制密度 和 控制点之间的距离  不是一个功能哦（需要实际操作去体会， 文字很难表述~.~）
            // 没有控制距离的话 绘制的图形，太规则了，不够分散    x = x + getSign() * getOneRandom(50)

            let len = move_stars.length;
            let dis_x, dis_y;
            if(!len) {
                move_stars.push( new Star(len, x, y, getOneRandom(maxSize, 3), true, 1) );
            }

            if(move_stars[len - 1]) {
                // 当前的星还没有push到move_stars里，所以上个星是move_stars[len - 1]
                let pre_star = move_stars[len - 1];
                if(pre_star) {
                    dis_x = Math.abs(x - pre_star.x);
                    dis_y = Math.abs(y - pre_star.y);
                }
                x = x + getSign() * getOneRandom(50);
                y = y + getSign() * getOneRandom(50);
                if(dis_x > 5 && dis_y > 5) move_stars.push( new Star(len, x, y, getOneRandom(maxSize, minSize), true, 1) );
            }

            isMoving = true;
            clearInterval(timer);   // 清除上一次的定时器（此时还没触发）
            timer = setInterval(function() {
                isMoving = false;
                clearInterval(timer);    // 鼠标停止再清除下定时器
            }, 500)

        }, false);

        window.CanvasStar = CanvasStar;
})(window, document);
let canvasStar = new CanvasStar(200);
    canvasStar.render();