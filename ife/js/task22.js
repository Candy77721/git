var ergodic=document.getElementById('before');
var div_list=new Array();
var timer;
var out_node=null;
ergodic.onclick=start;
function start(){
	var one_node=document.getElementById("one");
	//先序遍历
	before_ergodic(one_node);
	cur=new Date().getTime();
	timer=window.setInterval("redaction(div_list.pop())",500);
}
//先序遍历
function before_ergodic(node){
	input_head(node);
	input_left_right(node.childNodes[1]);
	input_left_right(node.childNodes[3]);
}
//输出左右结点
function input_left_right(node){
	var childs=node.childNodes;
	if(childs.length==5){
		before_ergodic(node);
	}
	if(childs.length==1){
		node.style.background="white";
		div_list.unshift(node);
	}
}
//输出头结点
function input_head(node){
	node.style.background="white";
	div_list.unshift(node);
}
function redaction(node){
	if(out_node!=null){
		out_node.style.background="white";
	}
	out_node=node;
	node.style.background="blue";
	if(new Date().getTime()-cur>75000){
		window.clearInterval(timer);
		window.setTimeout("out_node.style.background='white'",500);
	}
}