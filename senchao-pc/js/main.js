
window.onload = function(){
	
	//城市列表数据请求     xml获取渲染
	//$.ajax({
	//	type:"get",
	//	url:"data/index.xml",
	//	success:function(data){
	//		var dict = data.querySelector("city").querySelectorAll("cityName");
	//		var htmlStr = "";
	//		for(var i=0;i<dict.length;i++){
	//			htmlStr += "<span>" + dict[i].innerHTML + "</span>";
	//		}
	//		$(".city-list").html(htmlStr);
	//	}
	//})
	//城市列表数据请求     ajax获取渲染
	$.ajax({
		type:"get",
		url:"data/index.json",
		async:false,
		success:function(result){
			var dict = result.data.city;
			var $span = "";
			for(var i=0;i<dict.length;i++){
				$span += "<span>" + dict[i].cityname + "</span>";
			}
			$(".city-list").append($span);
		}
	})
	
	//城市列表功能
	cityListPlan();
	
	//购物车
	scCart();
	
	//菜单栏
	menuPlan();
	
}

//城市列表数据请求     xml获取渲染
//$.ajax({
//	type:"get",
//	url:"data/index.xml",
//	success:function(data){
//		var dict = data.querySelector("city").querySelectorAll("cityName");
//		var htmlStr = "";
//		for(var i=0;i<dict.length;i++){
//			htmlStr += "<span>" + dict[i].innerHTML + "</span>";
//		}
//		$(".city-list").html(htmlStr);
//	}
//})
//城市列表数据请求     ajax获取渲染
//	$.ajax({
//		type:"get",
//		url:"data/index.json",
//		async:false,
//		success:function(result){
//			var dict = result.data.city;
//			var $span = "";
//			for(var i=0;i<dict.length;i++){
//				$span += "<span>" + dict[i].cityname + "</span>";
//			}
//			$(".city-list").append($span);
//		}
//	})
//城市列表功能
function cityListPlan(){
	//城市列表最大层
	var cityWarp = document.getElementById('J_cityWarp');
	//城市名称
	var cityName = document.querySelector('.city-name');
	//城市列表
	var cityList = document.getElementById('J_moreCity');
	//城市列表子列表
	var cityListSon  = cityList.getElementsByTagName('span');
	//获取当前地区
	var area = document.querySelector('.area');
	//保存当前城市名称class
	var cityNameClass = cityName.className;
	//鼠标移入城市区域
	cityWarp.onmouseover = function(){
		jquery.addClass(cityName,'city-active');
		jquery.show(cityList);
	}
	//鼠标移出城市区域 方法1
	cityWarp.onmouseout = function(){
		//封装removeClass来移出选中的class
		jquery.removeClass(cityName,'city-active')
		jquery.hide(cityList);
	}
//	//鼠标移出城市区域 方法2	
//	cityWarp.onmouseout = function(){
//		//通过事先保存的城市名称的class再赋值上去
//		cityName.className = cityNameClass;
//		jquery.hide(cityList);
//	}

	//事件委托绑定城市列表事件
//	cityList.onclick = function(event) {
//		var ev = event || window.event;
//		//获取点击目标
//		var tar = event.target;
//		//获取当前点击元素的标签
//		if(tar.nodeName == 'SPAN'){
//			//获取当前点击元素innerhtml 赋值到城市名称上面
//			cityName.innerHTML = tar.innerHTML;
//			//获取点击后的当前的地区
//			area.innerText = "当前地区：" + tar.innerText;
//			//移除选中class
//			jquery.removeClass(cityName,'city-active')
//			//隐藏城市列表
//			jquery.hide(cityList);
//		}
//	}
	//循环绑定城市列表事件
	for (var i = cityListSon.length-1; i >= 0; i--) {
		cityListSon[i].onclick = function(){
			//获取当前点击元素innerhtml 赋值到城市名称上面
			cityName.innerHTML = this.innerHTML;
			//移除选中class
			jquery.removeClass(cityName,'city-active');
			//隐藏城市列表
			jquery.hide(cityList);
		}
	}
}

//购物车
function  scCart(){
	//获取购物车最大层
	var cart = document.getElementById('J_mycartWarp');
	//获取购物车
	var cartDom = document.getElementById('J_mycartArea');
	//获取要显示购物车区域
	var  myCart = document.getElementById('J_mycart');
	//购物车绑定鼠标移入事件
	cart.onmouseover = function(ev){
		//给购物车添加class
		jquery.addClass(cartDom,'carthover');
		//显示购物车列表
		jquery.show(myCart);
	}
	//购物车绑定鼠标移出事件
	cart.onmouseout = function(){
		//移除选中的class
		jquery.removeClass(cartDom,'carthover');
		//隐藏购物车列表
		jquery.hide(myCart);
	}
}


//菜单栏
function menuPlan(){
	//获取整个菜单
	var warpMenu = document.getElementById('J_warpMenu');
	//获取菜单
	var menu = document.getElementById('J_menu');
	//获取菜单列表
	var menuList = menu.getElementsByTagName('li');
	//获取二级菜单
	var sonMenu = document.getElementById('J_sonMenu');
	//获取二级菜单列表
	var sonMenuList = sonMenu.querySelectorAll('.commonidty-son-detail');
	//三级菜单列表
	var homeList = document.getElementById('J_home').getElementsByTagName('li');
	//三级菜单子列表
	var sonHomeList = document.querySelectorAll('#J_sonHome .commonidty-son-ul');

	//for循环绑定菜单列表鼠标移出移入事件 建议不理解的同学使用for循环绑定事件 不用事件委托
	for(var i = 0,len = menuList.length; i < len; i++) {
		//给每个元素赋index
		menuList[i].index = i;
		//给每个元素赋times
		menuList[i].times = null;
		menuList[i].onmouseover = function(){
			jquery.paddingMove(this,40);
			//判断当前选中
			if(!jquery.hasClass(this,'lihoverstyle')){
				//显示二级子菜单
				jquery.show(sonMenu);
				//移出选中的class
				jquery.removeClass(menuList,'lihoverstyle')
				//当前添加class
				jquery.addClass(this,'lihoverstyle');
				//隐藏所有的子菜单内容
				jquery.hide(sonMenuList);
				//判断当前子菜单是否有内容
				if(sonMenuList[this.index]){
					//显示对应的菜单内容
					jquery.show(sonMenuList[this.index]);
				}
			}
		};
		menuList[i].onmouseout = function(){
			jquery.paddingMove(this,0);
		}
	}
	/*
	 * 绑定菜单栏最大区域移出事件
	 * onmouseleave 事件类似于onmouseout事件。 唯一的区别是 onmouseleave 事件不支持冒泡 。
	*/
	warpMenu.onmouseleave = function(){
		//隐藏菜单栏对应内容
	 	jquery.hide(sonMenu);
	 	//移出选中菜单栏class
	 	jquery.removeClass(menuList,'lihoverstyle');
	}

	//三级菜单事件
  	for(var j = 0, hLen = homeList.length; j < hLen;j++){
  		//给每个元素赋index
		homeList[j].index = j;
		homeList[j].onclick = function(){
			//移出选中的class
			jquery.removeClass(homeList,'active');
			//隐藏所有的三级子菜单内容
			jquery.hide(sonHomeList);
			//当前元素添加class
			jquery.addClass(this,'active');
			//判断当前三级子菜单是否有内容
			if(sonHomeList[this.index]){
				//显示对应的三级菜单内容
				jquery.show(sonHomeList[this.index]);
			}
		}
  	}
	
	//事件委托绑定菜单栏鼠标移入事件  
//	 menu.onmouseover = function(event){
//	 		//兼容ie
//	 		var ev = event || window.event
//	 		,_current = ev.target  || ev.srcElement;
//	 		//判断如果是li标签子元素话赋值到li
//	 		_current = (ev.target.tagName == 'H3' ) ?  ev.target.parentNode : _current; 
//	 		_current = (ev.target.tagName == 'A' ) ?  ev.target.parentNode.parentNode : _current; 
//	 		if(_current.tagName == 'LI'){
//	 			//获取当前元素索引
//	 			var curIndex =	Array.prototype.slice.call(menuList).indexOf(_current);
//	 			//执行动画
//	 			jquery.paddingMove(_current,20);
//	 			//判断当前元素是否被选中
//	 			if(!jquery.hasClass(_current,'lihoverstyle')){
//	 				//显示二级子菜单
//	 				sonMenu.style.display = 'block';
//	 				//移除被选中class
//	 				jquery.removeClass(menuList,'lihoverstyle');
//	 				//隐藏显示的子菜单
//	 				jquery.hide(sonMenuList);
//	 				//当前选中元素添加class
//	 				jquery.addClass(_current,'lihoverstyle');
//	 				//判断当前子菜单是否有内容
//	 				if(sonMenuList[curIndex]){
//	 					//显示对应的菜单内容
//						jquery.show(sonMenuList[this.index]);
//	 				}
//	 			}
//	 		}
//	 }
//	 //事件委托绑定菜单栏鼠标移出事件
//	 menu.onmouseout = function(event){
//	 	var ev = event || window.event
//	 		,_current = ev.target;
//	 	//判断如果是li标签子元素话赋值到li
//	 	_current = (ev.target.tagName == 'H3' ) ?  ev.target.parentNode : _current; 
//	 	_current = (ev.target.tagName == 'A' ) ?  ev.target.parentNode.parentNode : _current; 
//	 	if(_current.tagName == 'LI'){
			//动画归0
//	 		jquery.paddingMove(_current,0);
//	 	}
//	 }
  	
}
//菜单栏鼠标移入方法 除了首页别的页面可能都会调用
//function productMove(){
//	var product = document.getElementById('J_productMove')
//		,menu  = document.getElementById('J_warpMenu');
//	product.onmouseenter = function(){
//		jquery.show(menu);
//	}
//	product.onmouseleave = function(){
//		jquery.hide(menu);
//	}
//}