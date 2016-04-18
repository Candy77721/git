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
//go事件
function go(){
	var block=document.getElementById("block");
	switch(Math.abs(count)%4){
		case 0:{
			if(o[1]==0){
				alert("已到达最顶点");
			}else{
				o[1]-=45;
				block.style.cssText="transform:translate("+o[0]+"px,"+o[1]+"px)";
			}
		}break;
		case 1:{
			if(o[0]==0){
				alert("已到达最左边");
			}else{
				o[0]-=45;
				block.style.cssText="transform:translate("+o[0]+"px,"+o[1]+"px) rotate(270deg)";
			}
		}break;
		case 2:{
			if(o[1]==405){
				alert("已到达最低点");
			}else{
				o[1]+=45;
				block.style.cssText="transform:translate("+o[0]+"px,"+o[1]+"px) rotate(180deg)";
				
			}
		}break;
		case 3:{
			if(o[0]==405){
				alert("已到达最右边");
			}else{
				o[0]+=45;
				block.style.cssText="transform:translate("+o[0]+"px,"+o[1]+"px) rotate(90deg)";
			}
		}break;
	}
}
//执行动作（平移加转向）
function action(){
	var input=document.getElementById('input');
	var block=document.getElementById("block");
	switch(input.value){
		case "GO":go();break;
		case "TUN LEF":{
			count--;
			block.style.cssText="transform:translate("+o[0]+"px,"+o[1]+"px) rotate("+(90*count)+"deg)";
		}break;
		case "TUN RIG":{
			count++;
			block.style.cssText="transform:translate("+o[0]+"px,"+o[1]+"px) rotate("+(90*count)+"deg)";
		}break;
		case "TUN BAC":{
			count+=2;
			block.style.cssText="transform:translate("+o[0]+"px,"+o[1]+"px) rotate("+(90*count)+"deg)";
		}break;
	}
}
//按钮绑定事件
function onbind(){
	count=0;
	var implement=document.getElementById('implement');
	implement.onclick=action;
}
function init(){
	//记录块的坐标
	o=[0,0];
	fill_num();
	draw_line();
	onbind();
}
init();