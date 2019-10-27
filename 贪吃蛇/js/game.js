(function(){
	var that;
	function Game(map){
		this.food=new Food();
		this.snake=new Snake();
		this.map =map;
		//存储game对象
		that=this;
	}
	Game.prototype.start=function(){
		// 1.把蛇和食物对象,渲染到地图上
		this.food.render(this.map);
		this.snake.render(this.map);
		//2.开始游戏的逻辑
		//2.1让蛇移动起来
		//2.2当蛇到边界游戏结束
		runSnake();
		//2.3通过键盘控制蛇的移动方向
		bindKey();
		//2.4当蛇遇到食物做相依的处理

	}
	//私有的函数
	//通过键盘控制蛇的移动方向
	function bindKey(){
		document.addEventListener('keydown',function(e){
			// 37 - left
			// 38 - top
			// 39 - right
			// 40 - bottom
			switch(e.keyCode){
				case 37:
				this.snake.direction='left';
				break;
				case 38:
				this.snake.direction='top';
				break;
				case 39:
				this.snake.direction='right';
				break;
				case 40:
				this.snake.direction='bottom';
				break;
			}
		}.bind(that),false)
	}
	//让蛇走动
	function runSnake(){
		var timerId=setInterval(function(){
			//让蛇走一格
			//在定时器的function中this是指向window对象的
			//要获取游戏对象中的蛇属性
			this.snake.move(this.food,this.map);
			this.snake.render(this.map);
			//2.2当蛇到边界游戏结束
			// 获取蛇头的坐标
			var maxX=this.map.offsetWidth / this.snake.width;
			var maxY=this.map.offsetHeight / this.snake.height;
			var headX=this.snake.body[0].x;
			var headY=this.snake.body[0].y;
			if(headX < 0 || headX>=maxX){
				alert('Gamve Over');
				clearInterval(timerId);
			}
			if(headY < 0 || headY >= maxY){
				alert('Gamve Over');
				clearInterval(timerId);
			}
		}.bind(that),150)
	}
	window.Game=Game;
})()
