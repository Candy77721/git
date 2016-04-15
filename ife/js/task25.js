//先序遍历
function before_ergodic(node){
	var childs=node.childNodes;
	input_head(node);
	if(childs.length>1){
		if(node.id!="content"){
			childs[1].onclick=click_node;
		}
		for(var i=1;i<childs.length;i+=2){
			sub_node(childs[i]);
		}
	}
}
//输出头结点
function input_head(node){
	node.onclick=node_click;
	div_list.push(node);
	// alert(node.id);
}
//输出子节点(过滤img节点)
function sub_node(node){
	var childs=node.childNodes;
	if(childs.length>1){
		before_ergodic(node);
	}
	if(childs.length==1){
		// alert(node.id);
		node.onclick=node_click;
		div_list.push(node);
	}
}
//点击img节点
function click_node(){
	//取消事件传递
	event.stopPropagation();
	var nodes=this.parentNode.childNodes;
	if(this.id=="bottom"){
		this.id="right";
		this.src="images/violet_right.png";
		for(var i=3;i<nodes.length;i+=2){
			nodes[i].style.display="none";
		}
	}else{
		this.id="bottom";
		this.src="images/violet_bottom.png";
		for(var i=3;i<nodes.length;i+=2){
			nodes[i].style.display="";
		}
	}
}
//获取颜色
function getColor(){
	var length=div_list.length-1;
	for (var i = length; i >0; i--) {
		if(div_list[i].childNodes.length>1){
			div_list[i].style.cssText="color:violet;margin-left:20px;";
		}else{
			div_list[i].style.cssText="color:orange;margin-left:20px;";
		}
	}
}
//节点点击事件
function node_click(){
	//取消事件传递
	event.stopPropagation();
	//如果没有节点被选中
	if(!check){
		//定义一个全局变量用于保存点击前节点的颜色
		old_color=this.style.color;
		this.style.color="red";
		check=true;
		}else{
		if(this.style.color=="red"){
			this.style.color=old_color;
			check=false;
		}
	}
}
//查找节点
function select(){
	var input=document.getElementById('input');
	if(input.value==""){
		alert("请输入查找节点的id");
		return;
	}
	if(check){
		alert("请取消已选中节点");
		return;
	}
	var length=div_list.length;
	for(var i=1;i<length;i++){
		if(div_list[i].id==input.value){
			div_list[i].click();
			dispaly(div_list[i]);
			return;
		}
	}
	alert("未找到该节点");
}
//显示隐藏的父节点
function dispaly(node){
	var flag=true;
	var pnode=node.parentNode;
	while(flag){
		//循环结束的条件
		if(pnode=="content"){
			return;
		}
		var pnodes=pnode.childNodes;
		if(pnodes[1].id=="right"){
			pnodes[1].id="bottom";
			pnodes[1].src="images/violet_bottom.png";
			for(var i=3;i<pnodes.length;i+=2){
				pnodes[i].style.display="";
			}
		}
		pnode=pnode.parentNode;
	}
}
//增加节点
function insert(){
	//判断是否有被选中项
	if(!check){
		alert("请选择节点");
		return;
	}
	var scan=document.getElementById("input");
	value=scan.value;
	if(value==""){
		alert("请输入添加节点的id");
		return;
	}
	//查找被选中的项
	var length=div_list.length;
	for(var i=1;i<length;i++){
		if(div_list[i].id==value){
			alert("该节点存在");
			return;
		}
	}
	for(var i=1;i<length;i++){
		if(div_list[i].style.color=="red"){
			add_new_node(div_list[i]);
			return;
		}
	}
}
// 实现添加新节点并为其设置参数
function add_new_node(node){
	// 如果该节点只有一个元素说明他为根节点
	if(node.childNodes.length==1){
		var img=document.createElement("img");
		img.id="bottom";
		img.src="images/violet_bottom.png";
		img.onclick=click_node;
		var null_node=document.createElement(undefined);
		node.insertBefore(img,node.firstChild);
		node.insertBefore(null_node,node.firstChild);
	}
	// //设置新添加的div属性值
	var new_node=document.createElement("div");
	new_node.style.cssText="color:orange;margin-left:20px;"
	new_node.innerHTML=value;
	new_node.id=value;
	new_node.onclick=node_click;
	node.appendChild(new_node);
	var null_node=document.createElement(undefined);
	node.appendChild(null_node);
	div_list=new Array();
	before_ergodic(content);
}
//删除节点
function remove(){
	// //判断是否有被选中项
	if(!check){
		alert("请选择要删除的节点");
		return;
	}
	var length=div_list.length;
	for (var i =1; i <length ; i++) {
		var node=div_list[i];
		//判断该节点是否被选中
		if(node.style.color=="red"){
			var parentnode=node.parentNode;
			parentnode.removeChild(node.nextSibling);
			parentnode.removeChild(node);
			if(parentnode.childNodes.length==3&&parentnode.id!="content"){
				parentnode.removeChild(parentnode.childNodes[1]);
				parentnode.style.color="orange";
			}
			div_list=new Array();
			before_ergodic(content);
			check=false;
			return;
		}
	}
	alert("没有找到该节点");
}
//初始化
function init(){
	//存放所有的div节点
	div_list=new Array();	
	//当前是否有节点被选中
	check=false;
	//为div_list赋值
	content=document.getElementById("content");
	before_ergodic(content);
	// alert(div_list[1].childNodes[3].id);
	//设置节点的初始颜色
	getColor();
	//分别为查找、添加、删除添加点击事件
	search=document.getElementById("select");
	search.onclick=select;
	add=document.getElementById("add");
	add.onclick=insert;
	del=document.getElementById("delete");
	del.onclick=remove;
}
init();