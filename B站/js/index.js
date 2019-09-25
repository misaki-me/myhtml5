(function(){
			var $li=$('.h-t-m-left>ul>li');
			$li.hover(function(){
				$(this).find('.hide').show();},
			function(){
				$(this).find('.hide').hide();
			});
		})();