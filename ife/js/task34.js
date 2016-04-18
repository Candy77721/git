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
function action(){
	var input=document.getElementById('input');
	var block=document.getElementById("block");
	//判断是否是GO指令
	if(input.value=="GO"){
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
		if(input.value==key){
			//判断是否是MOV指令(MOV指令的方向是固定的)
			if(key.substr(0,3)=="MOV"){
				an=imp[key][0];
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
//按钮绑定事件
function onbind(){
	var implement=document.getElementById('implement');
	implement.onclick=action;
}
function init(){
	var block=document.getElementById("block");
	//平移宽高
	o=[0,0];
	//块倾斜角度
	an=0;
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