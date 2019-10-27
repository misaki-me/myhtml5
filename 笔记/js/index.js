(function(){
	var navbtn=$(".icon-daohang");
	var ul=$('.nav ul');
	var li=$('.nav ul li');
	var onoff=true;
	var reg=/\S[a-z]+/ig;
	navbtn.click(function(){
		onoff=!onoff;
		if (onoff) {
			ul.animate({
				left:'-222px'
			},500);
		}else{
			ul.animate({
				left:'0'
			},500);
		}
	});
	li.each(function(){
		$(this).click(function(){
			var name=$(this).find('div').text();
			$('.section').fadeOut(500);
			$('.'+name.match(reg)+'').fadeIn(500);
			console.log(name);
		});
	});
})();