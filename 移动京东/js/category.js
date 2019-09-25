window.onload=function(){
	// 获取左侧栏
	var ct_cLeft=document.querySelector('.ct_cLeft');
	// 获取用来滑动的列表
	var ulBox=ct_cLeft.querySelector('ul:first-of-type');
	// 获取左侧栏的高度
	var leftHeight=ct_cLeft.offsetHeight;
	var ulBoxHeight=ulBox.offsetHeight;
	var lis=ulBox.querySelectorAll('li');
	// 设置静止状态下的最大top值
	var maxTop=0;
	// 设置静止状下的最小top值
	var minTop=leftHeight-ulBoxHeight;
	// 滑动状态下的最大top值
	var maxbounceTop=maxTop+100;
	// 滑动状态下的最小top值
	var minbounceTop=minTop-100;
	// 实现滑动
	var startY=0;
	var moveY=0;
	var distanceY=0;
	// 记录当前滑动的距离
	var currentY=0;
	// 添加滑动事件
	ulBox.addEventListener('touchstart',function(e){
		// 获取手指的起始坐标
		startY=e.targetTouches[0].clientY;
	});
	ulBox.addEventListener('touchmove',function(e){
		moveY=e.targetTouches[0].clientY;
		// 计算距离的差异
		distanceY=moveY-startY;
		// 判断滑动的时候是否超出当前指定的滑动区间
		if(currentY+distanceY>maxbounceTop||currentY+distanceY<minbounceTop){
			console.log('超出范围了')
			return;
		}
		// 先将之前可能添加的过渡效果清除
		ulBox.style.transition='none';
		// 实现偏移操作:应该在之前的滑动距离的基础之上再进行滑动
		ulBox.style.top=(currentY+distanceY)+'px';
	});
	ulBox.addEventListener('touchend',function(e){
		// 判断当前滑动的距离是否再静止状态下的最小值top值之间
		if (currentY+distanceY<minTop) {
			currentY=minTop;
			// 回到minTop位置
			ulBox.style.transition='top 0.5s';
			ulBox.style.top=minTop+'px';
		}else if (currentY+distanceY > maxTop) {
			currentY=maxTop;
			// 回到minTop位置
			ulBox.style.transition='top 0.5s';
			ulBox.style.top=maxTop+'px';
		}else{
			// 记录当前滑动的距离
			currentY+=distanceY;
		}
	});

	// 为每一个li元素设置添加一个索引值
	for (var i = 0; i < lis.length; i++) {
		lis[i].index=i;
	}
	// 绑定fastCLick
	if ('addEventListener' in document) {
		document.addEventListener('DOMContentloaded',function(){
			FastClick.attach(document.body);
		},false);
	}
	// 绑定移动端的tap事件
	ulBox.addEventListener('click',function(e){
		// 1.修改li元素的样式,将所有li元素的active样式清除,再为当前被点击的li元素添加active样式
		for (var i = 0; i < lis.length; i++) {
			lis[i].classList.remove('active');
		}
		// 当前被点击的li元素添加active样式
		var li=e.target.parentNode;
		li.classList.add('active');
		// 2.移动的当前的li元素到父容器的最顶部,但是不能超出之前设定了静止状态下的最小top值
		var liHeight=li.offsetHeight;
		var index=li.index;
		// 开启过渡
		ulBox.style.transition='top .5s';
		// 设置偏移
		if (-index*liHeight < minTop) {
			// 只能偏移到minTop位置
			ulBox.style.top=minTop+'px';
			currentY=minTop;
		}else{
			ulBox.style.top=-index*liHeight+'px';
			currentY=-index*liHeight;
		}
	});
	var myScroll=new IScroll('.ct_hotCategory',{
		mouseWheel:true,
		scrollbars:true
	});
}