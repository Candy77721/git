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
//查找操作
function select_div(){
	var sel_value=document.getElementById('select_text').value;
	var divs=container.getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) {
		divs[i].style.color="white";
		if(divs[i].innerHTML.indexOf(sel_value)!=-1){
			divs[i].style.color="black";
		}
	}
}
//增加操作
function insert_div(type){
	var values=document.getElementById('scan').value;
	if(values==""){
		return;
	}
	values=values.replace(/(^\s*)|(\s*$)/g,"");
	var value_list=new Array();
	value_list=values.split(/[,，;；、\s\n]+/);
	for(var i=0;i<value_list.length;i++){
		var newdiv=document.createElement("div");
		newdiv.innerHTML=value_list[i];
		newdiv.onclick=del_div;
		if(type=="left_add"){
			container.insertBefore(newdiv,container.firstChild);
		}else{
			container.appendChild(newdiv);
		}
	}
}
// 对div进行操作
function judge(){
	var value=this.value;
	var content=container.getElementsByTagName('div');
	var div_count=content.length;
	switch(value){
		case "left_add": insert_div(value);
			break;
		case "right_add": insert_div(value);
			break;
		case "left_del":
		 	{
				if(div_count>0){
					alert(content[0].innerHTML);
					container.removeChild(content[0]);
				}
			}
			break;
		case "right_del":
			{ 
				if (div_count>0){
					alert(content[div_count-1].innerHTML);
					container.removeChild(content[div_count-1]);
				}
			}
			break;
		case "select":select_div();
			break;
		}
	}

onbind_button();