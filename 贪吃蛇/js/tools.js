(function(){
	//工具对象
		var Tools={
			getRandom:function(min,max){
				return Math.floor(Math.random()*(max-min+1))+min;
			}
		}
		window.Tools=Tools;
})()