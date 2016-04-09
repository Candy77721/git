var btn_list=document.getElementById('input').getElementsByTagName('button');
var container=document.getElementById("container");

// 绑定点击事件
function onbind_button(){
	for (var i = 0; i < btn_list.length; i++) {
		btn_list[i].onclick=judge;
	}
}
//删除div
function del_div(){
	container.removeChild(this);
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
		alert("数字只能为正整数，请重新输入！");
		return false;
	}
	if(air_value<10||air_value>100){
		alert("输入的数字在10-100，请重新输入！");	
		return false;
	}
	return true;
}
function sort_div(){
	var div_list=container.getElementsByTagName("div");
	for (var i = 0; i < div_list.length-1; i++) {
		for (var j = i+1; j < div_list.length; j++) {
			if(div_list[i].innerHTML<div_list[j].innerHTML)
			{
				var divi=div_list[i].cloneNode(true);
				var divj=div_list[j].cloneNode(true);
				divi.onclick=del_div;
				divj.onclick=del_div;
				container.replaceChild(divj,div_list[i]);
				container.replaceChild(divi,div_list[j]);
			}
		}
	}
}
// 对div进行操作
function judge(){
	var value=this.value;
	var newdiv=document.createElement("div");
	var scan=document.getElementById('scan');
	var height=scan.value;
	var div_count=container.getElementsByTagName('div').length;
	if(!judge_air(height)){
		return;
	}
	newdiv.innerHTML=height;
	newdiv.style.cssText="height:"+(height*4)+"px;margin-top:"+(520-height*4)+"px";
	newdiv.onclick=del_div;
	switch(value){
		case "left_add": 
			{
				if(div_count==60){
					alert("最多只能添加60个元素");
					return;
				}
				container.insertBefore(newdiv,container.firstChild);
			}
			break;
		case "right_add": 
			{
				if(div_count==60){
					alert("最多只能添加60个元素");
					return;
				}
				container.appendChild(newdiv);
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
		case "sort":sort_div();
			break;
	}
}
onbind_button();