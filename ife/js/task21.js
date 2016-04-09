var container1=document.getElementById('container1');
var container2=document.getElementById('container2');
var ok=document.getElementById('ok');
var value1=document.getElementById('value1');
ok.onclick=add_love;
value1.onfocus=add_tag;
//container2增加爱好操作
function add_love(){
	var values=document.getElementById('scan').value;
	var divs=container2.getElementsByTagName("div");
	if(values==""){
		return;
	}
	values=values.replace(/(^\s*)|(\s*$)/g,"");
	var value_list2=new Array();
	value_list2=values.split(/[,，;；、\s\n]+/);
	for(var i=0;i<value_list2.length;i++){
		var flag=false;
		for(var j=0;j<divs.length;j++){
			if(value_list2[i]==divs[j].innerHTML){
				flag=true;
				break;
			}
		}
		if(!flag){
			var newdiv=document.createElement("div");
			newdiv.innerHTML=value_list2[i];
			container2.appendChild(newdiv);
		}
		if(divs.length>10){
			container2.removeChild(divs[0]);
		}
	}
}
//container1增加tag操作
function add_tag(){
	document.onkeydown=function(e){
		e=e||event;
		if(e.keyCode==32||e.keyCode==13||e.keyCode==188){
			var divs=container1.getElementsByTagName("div");
			value1t=value1.value;
			value1t=value1t.replace(/\s+/g,"");
			if(value1t=="")
				return;
			var flag=false;
			for(var i=0;i<divs.length;i++){
				if(value1t==divs[i].innerHTML){
					flag=true;
					break;
				}
			}
			if(!flag){
				var newdiv=document.createElement("div");
				newdiv.innerHTML=value1t;
				newdiv.onmouseover=judge_over;
				newdiv.onmouseout=judge_out;
				container1.appendChild(newdiv);
			}
			if(divs.length>10){
				container1.removeChild(divs[0]);
			}
			value1.value="";
		}
	}
}
//鼠标停留在tag元素上的操作
function judge_over(){
	this.innerHTML="点击删除"+this.innerHTML;
	this.style.background="red";
	this.onclick=del_div;
}
//鼠标离开tag元素上的操作
function judge_out(){
	this.innerHTML=this.innerHTML.replace("点击删除","")
	this.style.background="#88ccff";
}
//删除该div
function del_div(){
	container1.removeChild(this);
}
