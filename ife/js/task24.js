var btns=document.getElementsByTagName('button');
var one_node=document.getElementById("one");
btns[0].onclick=start;
btns[1].onclick=query;
btns[2].onclick=insert;
btns[3].onclick=remove;
//存放所有树节点的栈
var div_list=new Array();
//定时器
var timer;
//输入的内容
var value=null;
//上一个节点
var out_node=null;
//节点是否被选中
var check=false;
var second=11000;
//查找
function query(){
	var scan=document.getElementById("scan");
	value=scan.value;
	ornull();
	cur=new Date().getTime();
	timer=window.setInterval("redaction(div_list.pop())",500);
}
//先序
function start(){
	ornull();
	cur=new Date().getTime();
	timer=window.setInterval("redaction(div_list.pop())",500);
}
//添加
function insert(){
	//判断是否有被选中项
	if(!check){
		return;
	}
	var scan=document.getElementById("scan");
	value=scan.value;
	while(div_list.length!=0){
		var node=div_list.pop();
		if(node.style.background=="yellow"){
			alert(node.id);
			var new_node=document.createElement("div");
			new_node.style.background="white";
			new_node.innerHTML=value;
			node.appendChild(new_node);
		}
	}
}
//删除
function remove(){
	//判断是否有被选中项
	if(!check){
		return;
	}
	ornull();
	var length=div_list.length;
	for (var i = 0; i < length; i++) {
		var node=div_list.pop();
		//判断该节点是否被选中
		if(node.style.background=="yellow"){
			if(node.id!="one"){
				node.parentNode.removeChild(node);
			}else{
				body.removeChild(node);
			}
			check=false;
			div_list=new Array();
			return;
		}
	}
}
//节点点击事件
var clickHandler=function node_click(event){
	event.stopPropagation();
	if(!check){
		this.style.background="yellow";
		check=true;
	}else{
		if(this.style.background=="yellow"){
			this.style.background="white";
			check=false;
		}
	}
}
//先序遍历
function before_ergodic(node){
	var childs=node.childNodes;
	input_head(node);
	if(childs.length>1){
		for(var i=1;i<childs.length;i+=2){
			sub_node(childs[i]);
		}
	}
}
//输出头结点
function input_head(node){
	if(node.style.background!="yellow")
		node.style.background="white";
	node.onclick=clickHandler;
	div_list.unshift(node);
}
//输出子节点
function sub_node(node){
	var childs=node.childNodes;
	if(childs.length>1){
		before_ergodic(node);
	}
	if(childs.length==1){
		if(node.style.background!="yellow")
			node.style.background="white";
		node.onclick=clickHandler;
		div_list.unshift(node);
	}
}
//修改背景色、以及关闭定时器
function redaction(node){
	if(out_node!=null){
		out_node.style.background="white";
	}
	out_node=node;
	node.style.background="blue";
	if(node.id==value){
		window.clearInterval(timer);
	}
	if(new Date().getTime()-cur>second){
		window.clearInterval(timer);
		window.setTimeout("out_node.style.background='white'",500);
		if(value!=null){
			alert("没有找到该节点");
			// 清除上次查找的值
			value=null;
		}
	}
}
//判断栈中是否有节点
function ornull(){
	if(div_list.length==0){
		before_ergodic(one_node);
		second=div_list.length*500;
	}
}
//初始化
function init(){
	before_ergodic(one_node);
}
init();