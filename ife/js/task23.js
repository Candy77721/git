var ergodic=document.getElementById('before');
var select=document.getElementById('select');
ergodic.onclick=start;
select.onclick=query;
var div_list=new Array();
var timer;
var out_node=null;
function query(){
	var one_node=document.getElementById("one");
	var scan=document.getElementById("scan");
	value=scan.value;
	//先序遍历
	before_ergodic(one_node);
	cur=new Date().getTime();
	timer=window.setInterval("redaction(div_list.pop())",500);
}
function start(){
	var one_node=document.getElementById("one");
	//先序遍历
	before_ergodic(one_node);
	cur=new Date().getTime();
	timer=window.setInterval("redaction(div_list.pop())",500);
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
	// alert(node.id);
	node.style.background="white";
	div_list.unshift(node);
}
//输出子节点
function sub_node(node){
	var childs=node.childNodes;
	if(childs.length>1){
		before_ergodic(node);
	}
	if(childs.length==1){
		node.style.background="white";
		div_list.unshift(node);
	}
}
function redaction(node){
	if(out_node!=null){
		out_node.style.background="white";
	}
	out_node=node;
	node.style.background="blue";
	if(node.id==value){
		window.clearInterval(timer);
		div_list=new Array();
	}
	if(new Date().getTime()-cur>11000){
		window.clearInterval(timer);
		window.setTimeout("out_node.style.background='white'",500);
		alert("没有找到该节点");
		// 
	}
}