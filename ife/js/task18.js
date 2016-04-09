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
// 对div进行操作
function judge(){
	var value=this.value;
	var newdiv=document.createElement("div");
	var scan=document.getElementById('scan');
	if(scan.value==""){
		return;
	}
	newdiv.innerHTML=scan.value;
	newdiv.onclick=del_div;
	switch(value){
		case "left_add": container.insertBefore(newdiv,container.firstChild);
			break;
		case "right_add": container.appendChild(newdiv);
			break;
		case "left_del": container.removeChild(container.firstChild);
			break;
		case "right_del": container.removeChild(container.lastChild);
			break;
	}
}
onbind_button();