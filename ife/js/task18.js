var btn_list=document.getElementById('input').getElementsByTagName('button');
var container=document.getElementById("container");

// 绑定点击事件
function onbind_button(){
	for (var i = 0; i < btn_list.length; i++) {
		btn_list[i].onclick=judge;
	}
}
//判断空气质量指数是否为整数
function judge_air(air_value){
	//判断空气质量指数是否为正整数
	var integer=/^[0-9]*[1-9][0-9]*$/;
	if(air_value==""||air_value==null){
		alert("输入框不能为空，请输入！");
		return false;
	}
	if(!integer.test(air_value)){
		alert("数值只能为正整数，请重新输入！");
		return false;
	}
	return true;
}
//删除div
function del_div(){
	container.removeChild(this);
}
// 对div进行操作
function judge(){
	var value=this.value;
	var scan=document.getElementById('scan');
	var div_count=container.getElementsByTagName('div').length;
	switch(value){
		case "left_add": 
			{
				if(judge_air(scan.value)){
					var newdiv=document.createElement("div");
					newdiv.innerHTML=scan.value;
					newdiv.onclick=del_div;
					container.insertBefore(newdiv,container.firstChild);
				}
			}
			break;
		case "right_add": 
			{
				if(judge_air(scan.value)){
					var newdiv=document.createElement("div");
					newdiv.innerHTML=scan.value;
					newdiv.onclick=del_div;
					container.appendChild(newdiv);
				}
			}
			break;
		case "left_del":
		 	{
				if(div_count>0){
					alert(container.firstChild.innerHTML);
					container.removeChild(container.firstChild);
				}
			}
			break;
		case "right_del":
			{ 
				if (div_count>0){
					alert(container.lastChild.innerHTML);
					container.removeChild(container.lastChild);
				}
			}
			break;
	}
}
onbind_button();