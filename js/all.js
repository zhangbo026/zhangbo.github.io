//封装类似jquery方法 比较偏简单
var jquery = {
	/*
	 *添加class方法  给当前元素添加class
	 * cur   		当前操作dom
	 * className    要检查的class
	*/
	addClass:function(cur,curClassName){
		//判断如果当前元素有要添加的class 则不去执行添加class操作
		if(!this.hasClass(cur,curClassName)){ 
			//添加一个class 
			cur.className += ' ' + curClassName;
		}
	},
	/*
	 *移出class方法  给当前元素移出class
	 * cur   		当前操作dom
	 * className    要检查的class
	*/
	removeClass: function(cur,curClassName){	
		//判断如果是传入一个数组对象  走if 循环拿到每一个对象 然后移出class
		if(cur.length > 0 ){
			for(var i=0;i < cur.length;i++){
				if(this.hasClass(cur[i],curClassName)){
					//删除class
					cur[i].className = cur[i].className.replace(new RegExp("(^| +)"+curClassName+"( +|$)",'g'),'');
				}	
			}
		}else{
			//删除class
			cur.className = cur.className.replace(new RegExp("(^| +)"+curClassName+"( +|$)",'g'),'');
		}
	},
	/*
	 *检查当前元素是否有这个class 拿到true和false 有传入的class则返回true  没有返回false
	 * cur   		当前操作dom
	 * hClass    要检查的class
	*/
	hasClass:function(cur,hClass){
		//第一种方法
//		var arr = cur.className.split(" ");
//		for(var i=0;i<arr.length;i++){
//			if(arr[i] == hClass) {
//				return true;
//			}
//		}
//		return false;
		//第二种方法
		return cur.className.split(" ").indexOf(hClass) >=0 ? true : false;
	},
	/*
	 * 隐藏标签方法
	 * cur  当前操作dom
	*/
	hide:function(cur){
		// console.log(cur);
		//判断如果是传入一个数组对象  走if 循环拿到每一个对象然后操作隐藏
		if(cur.length > 0 ){
			for(var i=0;i < cur.length;i++){
				if(this.css(cur[i],'display')){
					//隐藏当前元素
					cur[i].style.display = "none";
				}
			}
		}else{
			//隐藏当前元素
			cur.style.display = "none";
		}
	},
	/*
	 * 显示标签方法
	 * cur  当前操作dom
	*/
	show:function(cur){
		//显示当前元素
		cur.style.display = "block";
	},
	/*
	 *获取css设置样式
	 *cur  当前操作dom
	 *attribute 要获取的css属性
	 *
	*/
	css : function(cur,attribute){
		//ie8一下版本不能使用getComputedStyle方法，而要用currenrStyle方法，用currentStyle
		return cur.currentStyle?cur.currentStyle[attribute]:document.defaultView.getComputedStyle(cur,false)[attribute]; 
	},
	//动画
	paddingMove : function(cur,moveNum){
		//先清除默认定时器，作用是执行下一个li时的定时器与上一个不发生冲突，每一次都新开一个定时器
		clearInterval(cur.times);
		cur.times = setInterval(function(){
			//获取当前元素paddingLeft
			var pLeft = parseInt(cur.style.paddingLeft) || 0;
			//运动速度
			var speed = 0;
			if(moveNum > 0){
//				每次定时器执行后获得速度
				speed = parseInt(pLeft + 10)/10;
				if(pLeft >= moveNum ){
					clearInterval(cur.times);
					return;
				}
			}else{
				//相反的， 往回走，每次都是负的，最后当前元素paddingLeft加上最终速度等于当前元素paddingLeft减去最终速度，直到停止
				speed = -parseInt(pLeft + 10)/10;
				if(pLeft <= moveNum ){
					clearInterval(cur.times);
					return;
				}
			}
			//每次执行后获得的speed会有小说点，如 3.3，4.5等
			speed = speed > 0 ? Math.floor(speed) : Math.ceil(speed);
			//当定时器最后停止时，距离等于当前元素paddingLeft加上最终速度
			cur.style.paddingLeft  = (pLeft + speed) + 'px';
		},20)
	}

}



//公共底部点击效果
//iconChange();
//function iconChange(){
//	var footerIcon = document.querySelectorAll(".footer-icon");
//	var pFooterIcon = document.querySelectorAll(".icon-text");
//	console.log(pFooterIcon);
//	for(var i=0;i<footerIcon.length;i++){
//		footerIcon[i].index = i;
//		footerIcon[i].onclick = function(){
//			pFooterIcon[i].className = "icon-text" + "icon-active";
//		}	
//	}
//}

	
	