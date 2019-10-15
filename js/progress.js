var p=document.querySelector('#progress p');
var css=document.getElementById('css');
function move(num){
	clearInterval(p.timer);
	p.timer=setInterval(function(){
		if (parseInt(p.innerHTML)<num) 
		{
			var s=parseInt(p.innerHTML)+1;
			var w=500*s/100;
			p.innerHTML=s+'%';
			p.style.width=w+'px';
		}
		else
		{
			clearInterval(p.timer);
			if (num==100) {
				p.parentNode.parentNode.removeChild(p.parentNode);
				console.log(1)
				// css.parentNode.removeChild(css);
				var script=document.querySelector('.move');
				var length=script.length;
				for (var i = length-1; i >= 0; i--) {
					script[i].parentNode.removeChild(script[i]);
				}
			}
		}
	},10);
};