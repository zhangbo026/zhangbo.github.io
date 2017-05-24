
//放大镜
amplificationMirror();
function amplificationMirror(){
	//获取原图
	var moveZoom = document.getElementById("J_moveZoom");
	//获取遮罩层
	var moveLayer = document.getElementById("J_moveLayer");
	//获取放大图盒子
	var moveBox = document.getElementById('J_moveImg');
	//获取放大图片
	var moveBoxImg = moveBox.children[0];
	//鼠标进入
	moveZoom.onmouseover = function(){
		jquery.show(moveBox);
		jquery.show(moveLayer);
	}
	//鼠标离开
	moveZoom.onmouseout = function(){
		jquery.hide(moveBox);
		jquery.hide(moveLayer);
	}
	//鼠标移动放大
	moveZoom.onmousemove = function(event){
		var e = event || window.event;
		//监听鼠标位置   遮罩层跟随鼠标移动     
		//鼠标到窗口的距离-原图到窗口的距离-遮罩层宽度的一半=鼠标在遮罩层的中心=遮罩层到原图的距离
		var x = e.pageX - moveZoom.parentNode.offsetLeft - moveLayer.offsetWidth / 2;
		var y =  e.pageY - moveZoom.parentNode.offsetTop - moveLayer.offsetHeight / 2;
		//遮罩层距离原图的最大距离
		var maxLeft = moveZoom.offsetWidth - moveLayer.offsetWidth;
		var maxTop = moveZoom.offsetHeight - moveLayer.offsetHeight;
		//监听遮罩层
		if (x < 0) {//鼠标在原图外
			x = 0;//最小值为0，最左侧
		} else if (x > maxLeft) {//鼠标在原图内
			x = maxLeft;//最大值，在最右侧
		}
		if (y < 0) {
			y = 0;
		} else if (y > maxTop) {
			y = maxTop;
		}
		
		//遮罩层的在原图中移动的距离 = 鼠标在遮罩中心的遮罩层出现在原图中的位置
		moveLayer.style.left = x + "px";
		moveLayer.style.top = y  + "px";
		
		//放大的图位置，遮罩层距离原图的距离*放大图片的宽度/大图片盒子的宽度
		moveBoxImg.style.left =  - ((x * moveBoxImg.offsetWidth) / moveBox.offsetWidth) + "px";
		moveBoxImg.style.top = - ((y * moveBoxImg.offsetHeight) / moveBox.offsetHeight) + "px";

//		//大图片跟随显示，对应的大图位置
//		var xx = (moveBoxImg.offsetWidth - moveBox.offsetWidth) / (moveZoom.offsetWidth - moveLayer.offsetWidth);
//		var yy = (moveBoxImg.offsetHeight - moveBox.offsetHeight) / (moveZoom.offsetHeight - moveLayer.offsetHeight);
//		//给大图片做位置确定
//		moveBoxImg.style.marginLeft =  - xx * x + "px";
//		moveBoxImg.style.marginTop = -yy * y + "px";
	}
}


//规格选项卡
tabSize() ;
function tabSize() {
	//事件委托
//	var standards = document.querySelector("#J_standardsList");
//	var jPrices = document.querySelector("#J_prices");
//	var tabSizeList = document.querySelectorAll("#J_standardsList .specs-list");
//	standards.onclick = function(e){
//		var e = event || window.event;
//		if(e.target.nodeName.toLowerCase() == "span"){
//			var price = e.target.getAttribute("data-price");
//			jPrices.innerHTML = price + ".00";
//          //移出当前的class
//			jquery.removeClass(tabSizeList,"seled");
//          //添加当前的class
//			jquery.addClass(e.target,"seled");
//		}
//	}

	//for循环绑定
	var tabSizeList = document.querySelectorAll("#J_standardsList .specs-list");
	var jPrices = document.querySelector("#J_prices");
	for(var p=0;p<tabSizeList.length;p++){
		tabSizeList[p].onclick = function(){
			jPrices.innerHTML = this.getAttribute("data-price") + ".00";
			jquery.removeClass(tabSizeList,"seled");
			jquery.addClass(this,"seled");
		}
	}
	
}

//购物数量的增减
	//获取商品数量
	var nd_number = document.getElementById("J_coomodityNumber");//获取输入框数值的变化
	//获取库存
	var nd_stock = document.getElementById("J_stock");//获取库存数
	//商品加减
	function operateNumber(type){
		var nd_value = parseInt(nd_number.value);
		//获取库存属性值  总库存
		var data_stock = parseInt(nd_stock.getAttribute("data-stock"));
		//状态值
		var state;
		//商品减
		if(type == 1){
			//判断商品当前数量是否小于最小商品数量
			state = nd_value >= 1 ? true : false; 
			if(state) {
				//商品数量减
				nd_value--;
				//商品数量赋值
				nd_number.value = nd_value;
				//库存数量赋值
				nd_stock.innerHTML = data_stock - nd_value;
			} else {
				alert("你够了");
			}
		} else { // 商品加
			state = nd_value < data_stock ? true : false; 
			if(state) {
				nd_value++;
				nd_number.value = nd_value;
				nd_stock.innerHTML = data_stock - nd_value;
			} else {
				alert("没库存");
			}
		}
	}

//购物数量的增减
//coomodityNumberChange();
//function coomodityNumberChange() {	
//	 //获取输入框数值的变化
//	 var coomodityNumber = document.getElementById("J_coomodityNumber");
//	 //获取库存数
//	 var stock = document.getElementById("J_stock");
//	 document.querySelector(".btn-left").onclick = function(){
//		if(coomodityNumber.value > 1){
//			coomodityNumber.value--;
//			var num = stock.innerText;
//			num++;
//			stock.innerText = num;
//		} else {
//			alert("你够了")
//		}
//	 }
//	 document.querySelector(".btn-right").onclick = function(){
//		if(coomodityNumber.value < 10){
//			coomodityNumber.value++;
//			var num = stock.innerText;
//			num--;
//			stock.innerText = num;
//			if(num <= 0){
//				alert("没有库存")
//			}
//		}
//	 }
//}



//商品详情tab栏吸顶
//commodityTab();
//function commodityTab(){
//	//获取J_tabList商品详情高度    放在滚动事件外面，原因是获取固定高度
//	var tabList = document.getElementById("J_tabList");
//	var tabListHeight = tabList.offsetTop;
//	//获取滚动条事件
//	window.onscroll = function(){
//		//获取滚动条事件
//		var scrollHeight = scroll().top;
//		//判断 滚动高度大于J_tabList商品详情高度就添加resp-tabs-list-fixed
//		if (scrollHeight >= tabListHeight){
//			jquery.addClass(document.querySelector(".resp-tabs-list"),"resp-tabs-list-fixed");
//		}else {
//			jquery.removeClass(document.querySelector(".resp-tabs-list"),"resp-tabs-list-fixed");
//		}
//	}
//	//封装  获取滚动高度
//	function scroll() {  // 开始封装自己的scrollTop
//	    if(window.pageYOffset != null) {  // ie9+ 高版本浏览器
//	        // 因为 window.pageYOffset 默认的是  0  所以这里需要判断
//	        return {
//	            left: window.pageXOffset,
//	            top: window.pageYOffset
//	        }
//	    } else if(document.compatMode === "CSS1Compat") {    // 标准浏览器   来判断有没有声明DTD
//	        return {
//	            left: document.documentElement.scrollLeft,
//	            top: document.documentElement.scrollTop
//	        }
//	    }
//	    return {   // 未声明 DTD
//	        left: document.body.scrollLeft,
//	        top: document.body.scrollTop
//	    }
//	}
//}
//滚动固定商品详情 商品评论选项卡
srcollFiexd();
function srcollFiexd(){
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
		,resp = document.getElementById('J_tabList')
		,respTop = resp.offsetTop;

		//由于window.onload加载原因会导致刷新页面后不会固定头部  所以做一个判断 可以不需要去理解 
		// if(scrollTop > respTop){
		//  	jquery.addClass(resp,'resp-tabs-list-fixed')
		// }
	window.onscroll = function () {
		//获取滚动条高度
		 scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		 //判断当前滚动高度大于商品列表选项卡的时候执行添加resp-tabs-list-fixed
		 if (scrollTop >= respTop) { 
		 	//防止重复执行里面方法
		 	if(!jquery.hasClass(resp,'resp-tabs-list-fixed')){
		 		jquery.addClass(resp,'resp-tabs-list-fixed')
		 	}
		 } else {
		 	//防止重复执行里面方法
		 	if(jquery.hasClass(resp,'resp-tabs-list-fixed')){
		 		jquery.removeClass(resp,'resp-tabs-list-fixed')
		 	}
		 } 
	}
}
//切换商品详情选项卡
commodityTab();
function commodityTab(){
	var respLi = document.querySelectorAll('.resp-tabs-list li')
		,respTabDeatil = document.querySelectorAll('.resp-tabs-container .goods-contab')
		,respTop = document.getElementById('J_tabList').offsetTop;
	for(var i=0,len = respLi.length;i < len;i++){
		respLi[i].index = i;
		respLi[i].onclick = function(){
			//判断当前点击元素是否已点击
			if(!jquery.hasClass(this,'on')){
				//移出所有选中状态
				jquery.removeClass(respLi,'on');
				//隐藏所有列表
				jquery.hide(respTabDeatil);
				//当前元素添加选中class
				jquery.addClass(this,'on');
				//滚动条位置滚动到点击元素的位置
				document.body.scrollTop = respTop-80;
				//判断当前是否有对应导航内容
				if(respTabDeatil[this.index]){
					//显示当前
					jquery.show(respTabDeatil[this.index]);
				}
			}
		}
	}
}
