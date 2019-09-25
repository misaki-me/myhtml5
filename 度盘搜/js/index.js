var oSearch = document.getElementById('search');
			var oList = document.getElementById('list')
			var oUl = oList.getElementsByTagName('ul')[0];
			var oLi=oUl.children;
			function fly( mJson ){
				oUl.innerHTML = '';
				var arr=[];
				for ( var i=0;i<mJson.s.length ;i++ )
				{
					var oLi = document.createElement('li');
					oLi.innerHTML = '<a href="javasript:voide(0)" >'+ mJson.s[i] +'</a>';
					oUl.appendChild( oLi );
					
				};
				
			}
			//键盘事件
			oSearch.onkeyup = function(){
				var val = this.value;
				
				var oS = document.createElement('script');
				oS.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+ val +'&cb=fly';
				document.body.appendChild( oS );
				if ( val )
				{
					oList.style.display = 'block';
				}
				else
				{
					oList.style.display = 'none';
				}

			};
			
			//获取下拉列表文本值
			setInterval(function(){
				for(var i=0;i<oLi.length;i++){
					//给对象缓存自有属性
					oLi[i].index=i;
					oLi[i].onclick=function(){
						oSearch.value=oLi[this.index].innerText;
						lost();
					}
				}	
				},300);
			
			//失去焦点事件
			function lost(){
				if(oUl){
//				oLi.parentNode.removeChild(oLi);//无法移除自己
//				oUl.parentNode.removeChild(oUl);
				oList.style.display="none";
				}
			}