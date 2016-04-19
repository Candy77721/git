//填充数字
function fill_num(){
	var horizontal=document.getElementById("horizontal");
	var vertical=document.getElementById("vertical");
	for (var i = 1; i <= 10; i++) {
		var divi=document.createElement("div");
		var divj=document.createElement("div");
		divi.innerHTML=i;
		divj.innerHTML=i;
		horizontal.appendChild(divi);
		vertical.appendChild(divj);
	}
}
//画行
function draw_line(){
	var layout=document.getElementById("layout");
	//画横行
	for(var i=0;i<5;i++){
		var div=document.createElement("div");
		div.id="ho";
		layout.appendChild(div);
	}
	//画纵行
	for(var i=0;i<5;i++){
		var div=document.createElement("div");
		div.id="ver";
		layout.appendChild(div);
		div.style.cssText="margin-left: "+(90*i)+"px;";
		layout.appendChild(div);
	}
}
//判断边界
function frontier(value){
	switch(value){
		case "TOP":if(o[1]==0){
			alert("已到达上边界");
			return false;
		}break;
		case "RIG":if(o[0]==405){
			alert("已到达右边界");
			return false;
		}break;
		case "BOT":if(o[1]==405){
			alert("已到达下边界");
			return false;
		}break;
		case "LEF":if(o[0]==0){
			alert("已到达左边界");
			return false;
		}break;
	}
	return true;
}
//执行动作
function action(value){
	var block=document.getElementById("block");
	//判断是否是GO指令
	if(value=="GO"){
		var i=(Math.abs(an)/90)%4;
		if(!frontier(pos[i])){
			return;
		}
		o[0]+=go[i][0];
		o[1]+=go[i][1];
		block.style.cssText="transform:translate("+o[0]+"px,"+o[1]+"px) rotate("+an+"deg)";
		return;
	}
	//判断是否是其他指令
	for(var key in imp){
		//判断指令是否正确
		if(value==key){
			//判断是否是MOV指令(MOV指令的方向是固定的)
			if(key.substr(0,3)=="MOV"){
				an=an+(imp[key][0]-an%360);
			}else{
				an+=imp[key][0];
			}
			//判断是否是TUN指令（TUN指令不移动）
			if(key.substr(0,3)!="TUN"){
				//边界判断
				if(!frontier(key.substr(4,4))){
					return;
				}
				o[0]+=imp[key][1];
				o[1]+=imp[key][2];
			}
			block.style.cssText="transform:translate("+o[0]+"px,"+o[1]+"px) rotate("+an+"deg)";
		}
	}
}
//多行文本框行数改变事件
function rowChange(){
	rows=input.value.split('\n').length;
	if(input.value==0){
		rows=0;
	}
	var inner="";
	for(var i=1;i<=rows;i++){
		inner+="<div>"+i+"</div>";
	}
	column.innerHTML=inner;
	column.scrollTop=input.scrollTop;
	checkOrder();
}
//判断是否是GO指令(将多个GO指令添加到集合中)
function isGo(value){
	//判断是否是单一GO指令
	if(value=="GO"){
		return true;
	}else if(value.length>=4){//判断是否符合多指令的最低条件
		var num=value.substr(3,value.length);
		//判断最后几位数是否是整数且是否是GO指令
		if(!isNaN(num)&&value.substr(0,2)=="GO"){
			//获取该指令在指令集合中的位置
			var index=orders.indexOf(value);
			//将该指令替换成多个GO指令
			orders.splice(index,1,"GO")
			for(var i=1;i<num;i++){
				orders.splice(index+i,0,"GO")
			}
			return true;
		}
	}
	return false;
}
//判断是否是其他指令(将多个其他指令添加到集合中)
function isOther(value){
	for(var key in imp){
		//判断指令是否正确
		if(value==key){
			return true;
		}else if(value.length>=9){
			var num=value.substr(8,value.length);
			if(!isNaN(num)&&value.substr(0,7)==key){
				//获取该指令在指令集合中的位置
				var index=orders.indexOf(value);
				//将该指令替换成多个GO指令
				orders.splice(index,1,key)
				for(var i=1;i<num;i++){
					orders.splice(index+i,0,key)
				}
				return true;
			}
		}
	}
	return false;
}
//检查命令
function checkOrder(){
	if(rows!=0){
		orders=input.value.split('\n');
		var orderlist=orders;
		//读取order中所有的命令
		for (var i = 0; i <orderlist.length; i++) {
			//判断是否是GO命令或者其他命令
			if(!isGo(orderlist[i])&&(!isOther(orderlist[i]))){
				column.childNodes[i].style.background="red";
			}
		}
	}
}
//执行命令
function implementOrder(){
	var i=0;
	var timer=setInterval(function(){
		if(i<orders.length){
			action(orders[i]);
			i++;
		}else{
			clearInterval(timer);
		}
	},500);
}
//绑定事件
function onbind(){
	//行数改变事件
	input.addEventListener('keyup', rowChange,false);
	//多行文本滚动带动clumn中滚动条滚动
	input.onscroll=function(){
		column.scrollTop = input.scrollTop;
	}
	// 为执行按钮绑定点击事件
	var implement=document.getElementById('implement');
	implement.onclick=implementOrder;
	//为Refresh按钮帮绑定点击事件
	var refresh=document.getElementById("refresh");
	refresh.onclick=function(){
		input.value="";
		column.innerHTML="";
	}
}
function init(){
	var block=document.getElementById("block");
	input=document.getElementById("input");
	column=document.getElementById("column");
	//平移坐标
	o=[0,0];
	//块倾斜角度
	an=0;
	//显示命令行数
	rows=0;
	//命令集合
	orders=[];
	//指令：[倾斜角，左移宽度，上移高度]
	imp={
		"TUN LEF":[-90,0,0],
		"TUN RIG":[90,0,0],"TUN BAC":[180,0,0],
		"TRA LEF":[0,-45,0],"TRA TOP":[0,0,-45],
		"TRA RIG":[0,45,0],"TRA BOT":[0,0,45],
		"MOV LEF":[270,-45,0],"MOV TOP":[0,0,-45],
		"MOV RIG":[90,45,0],"MOV BOT":[180,0,45]};
	/*
	因为GO指令与其他指令有所不同，所以分开处理
	指令：[上移，右移，下移，左移]平移长度
	*/
	go=[[0,-45],[45,0],[0,45],[-45,0]];
	pos=["TOP","RIG","BOT","LEF"];
	fill_num();
	draw_line();
	onbind();
}
init();