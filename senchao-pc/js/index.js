//轮播数据请求       ajax
$.ajax({
	type:"get",
	url:"data/index.json",
	async:false,
	success:function(result){
		var dict = result.data.carousel;
		console.log(dict);
		var arr = dict.split(",");
		console.log(arr);
		var $li = "";
		for(var i=0;i<arr.length;i++){
			$li += "<li><a href='javascript:;'><img src="+ arr[i] +"/></a></li>";
		}
		$(".buypicul").append($li);
	}
})
	
//轮播
slide();

//每层tab栏的选项卡
changeTab () ;

//轮播
function slide(){
	//首页大轮播配置
	$(".carousel").slide({
		titCell:".num ul",        //导航元素对象（鼠标的触发元素对象）
		autoPage:true,            //轮播自动分页，需结合titCell使用
		mainCell:".buypicul",     //切换元素的包裹对象
		effect:"fold",            //轮播动画效果
		autoPlay:true,            //自动轮播
		delayTime:500,            //动画效果速度
		interTime:2000            //毫秒：自动运行间隔
	});
	//section里面内容的所有轮播
	$(".flex-viewport").slide({
		titCell:".slides-ol",      //导航元素对象（鼠标的触发元素对象）
		autoPage:"<li></li>",      //轮播自动分页，需结合titCell使用
		mainCell:".slides",        //切换元素的包裹对象
		effect:"fold",             //轮播动画效果
		autoPlay:true,             //自动轮播
		delayTime:500,             //动画效果速度
		interTime:2000             //毫秒：自动运行间隔
	});
}


//选项卡
function changeTab () {

//原生js
	//获取每层的tab栏      ul  所有
	var tab = document.querySelectorAll(".tab-right-common");
	//循环每一个tab栏
	for(var i=0;i<tab.length;i++){
		//获取每一个tab栏ul下的所有li
		var item = tab[i].getElementsByTagName("li");
		//循环每个li
		for(var k=0;k<item.length;k++){
			//实行点击事件
			item[k].onclick = function(){
				//获取当前点击的li
				var li = this.parentNode.children;
				if(!jquery.hasClass(this,"active")){
					jquery.removeClass(li,"active");
					jquery.addClass(this,"active");
				}
			}
		}
	}

//函数自执行    闭包
	//获取每层的tab栏      ul  所有
//	var tab = document.querySelectorAll(".tab-right-common");
//	for(var i=0;i<tab.length;i++){
//		var item = tab[i].getElementsByTagName("li");
//		(function(ulDate){
//			for(var k=0;k<ulDate.length;k++){
//				ulDate[k].onclick = function(){
//					if(!jquery.hasClass(this,"active")){
//						jquery.removeClass(ulDate,"active");
//						jquery.addClass(this,"active");
//					}
//				}
//			}
//		})(item);
//	}


// es6   let  写法	
//	var tab = document.querySelectorAll(".tab-right-common");
//	for(var i=0;i<tab.length;i++){
//		for(let k=0,item = tab[i].getElementsByTagName("li");k<item.length;k++){
//			item[k].onclick = function(){
//				if(!jquery.hasClass(this,"active")){
//					jquery.removeClass(item,"active");
//					jquery.addClass(this,"active");
//				}
//			}
//		}
//	}

}
