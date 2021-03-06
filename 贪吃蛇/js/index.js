// ---------------------Tools---------------------
(function(){
	//工具对象
		var Tools={
			getRandom:function(min,max){
				return Math.floor(Math.random()*(max-min+1))+min;
			}
		}
		window.Tools=Tools;
})();
//----------------------Parent--------------------
(function(window){
	function Parent(options){
		options=options || {};
		this.width=options.width || 20;
		this.height=options.height || 20;
	}
	Parent.prototype.test=function(){
		console.log('test');
	}
	window.Parent=Parent;
})(window,undefined);
//----------------------Food-----------------------
(function(){
//记录上一次创建的食物,为删除做准备
var elements=[];
function Food(options){
	//防止报错
	options=options || {};
	this.x=options.x || 0;
	this.y=options.y || 0;
	// this.width=options.width || 20;
	// this.height=options.height || 20;
	Parent.call(this,options);
	this.color=options.color || 'green';

}
// 渲染食物
Food.prototype.render=function(map){
	// 删除之前创建的食物
	remove();

	//随机设置食物的位置
	this.x=Tools.getRandom(0,map.offsetWidth/this.width-1)*this.width;
	this.y=Tools.getRandom(0,map.offsetHeight/this.height-1)*this.height;
	// 动态创建div 页面上显示的食物
	var div=document.createElement('div');
	map.appendChild(div);

	elements.push(div);

	//设置div的样式
	div.style.left=this.x+'px';
	div.style.top=this.y+'px';
	div.style.position='absolute';
	div.style.width=this.width+'px';
	div.style.height=this.height+'px';
	div.style.backgroundColor=this.color;
}
function remove(){
	for(var i=elements.length-1;i>=0;i--){
		//删除div
		elements[i].parentNode.removeChild(elements[i]);
		//删除数组中的元素
		//第一个参数,从哪个元素开始删除
		//第二个参数,删除几个参数
		elements.splice(i,1);
	}
}
window.Food=Food;
})();
//-------------------------Snake-------------------------
(function(){
	//记录之前创建的蛇
	var elements=[];
	function Snake(options){
		options=options || {};
		// this.width=options.width || 20;
		// this.height=options.height || 20;
		Parent.call(this,options);
		this.direction=options.direction || 'right';
		//第一个元素是蛇头
		this.body=[
			{x:3,y:2,color:'red'},
			{x:2,y:2,color:'blue'},
			{x:1,y:2,color:'blue'}
		];
	}
	// 蛇渲染
	Snake.prototype.render=function(map){
		//删除之前创建的蛇
		remove();
		//把每一个蛇节渲染到地图上
		for(var i=0,len=this.body.length;i<len;i++){
			//蛇节
			var object=this.body[i];
			var div=document.createElement('div');
			map.appendChild(div);
			//记录当前蛇
			elements.push(div);
			//设置样式
			div.style.position='absolute';
			div.style.width=this.width+'px';
			div.style.height=this.height+'px';
			div.style.left=object.x*this.width+'px';
			div.style.top=object.y*this.height+'px';
			div.style.backgroundColor=object.color;
		}
	}
	//私有的成员
	function remove(){
		for(var i=elements.length-1 ;i>=0;i--){
			//删除div
			elements[i].parentNode.removeChild(elements[i]);
			//删除数组中的元素
			elements.splice(i,1);
		}
		
	}
	function extend(parent,child){
			for(var key in parent){
				if(child[key]){
					continue;
				}
				child[key]=parent[key];
			}
		}
	//控制蛇移动的方法
	Snake.prototype.move=function(food,map){
		//控制蛇的身体移动(当前蛇节到上一个蛇节的位置)
		for(var i=this.body.length -1 ;i > 0;i--){
			this.body[i].x=this.body[i-1].x;
			this.body[i].y=this.body[i-1].y;
		}
		//控制蛇头的移动
		//判断蛇移动的方向
		var head=this.body[0];
		switch(this.direction){
			case 'right':
				head.x+=1;
				break;
			case 'left':
				head.x-=1;
				break;
			case  'top':
				head.y-=1;
				break;
			case 'bottom':
				head.y+=1;
				break;

		}
		//2.4判断蛇头是否和食物的坐标重合
		var headX=head.x * this.width;
		var headY=head.y * this.height;
		if(headX===food.x && headY=== food.y){
			//让蛇增加一节
			// 获取蛇的最后一节
			var last=this.body[this.body.length -1];
			// this.body.push({
			// 	x: last.x,
			// 	x: last.y,
			// 	color: last.color
			// });
			var obj={};
			extend(last,obj);
			this.body.push(obj);
			//随机在地图上重新生成食物
			food.render(map);
		}

	}
	//暴露构造函数给外部
	window.Snake=Snake;
})();
//---------------------------------Game----------------------
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
})();
//--------------------------------调用---------------------
(function(){
	var map=document.getElementById('map');
	var game=new Game(map);
	game.start();
})();
