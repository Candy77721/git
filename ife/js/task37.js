/*
浮出层的中心默认在屏幕正中对
当浮出层显示时，屏幕滚动时，浮出层始终保持位置固定在屏幕正中，不随屏幕滚动而变化位置。或者禁止页面在有浮出层出现时滚动
当浮出层显示时，点击浮出层以外的部分，默认为关闭浮出层。可以实现一个半透明的遮罩来挡住浮出层外的部分
浮出层的样式、内容和逻辑尽量解耦
提供使用JavaScript控制浮出层展现和关闭的接口
浮出层的窗口大小可以是一个默认固定值，也可以是随内容变化而自适应变化，也可以是通过接口参数进行调整，自行根据自己能力进行选择
有能力的同学可以实现浮出层的拖拽移动浮出窗口位置以及拖拽边缘来放大缩小浮出窗口的功能
*/
//浮动框居中
function rose_auto_center(){
	var rose_width=rose.offsetWidth;
	var rose_height=rose.offsetHeight;
	rose.style.left=(screen_width-rose_width)/2+"px";
	rose.style.top=(screen_height-rose_height)/2+"px";	
}
//显示
function show(){
	console.log("点击显示浮动层按钮");
	rose.style.display="";
	cover.style.display="";
}
//隐藏
function hidden(){
	rose.style.display="none";
	cover.style.display="none";
}
//初始化数据
function init_data(){
	//获取屏幕当前宽高
	screen_width=document.documentElement.clientWidth;
	screen_height=document.documentElement.clientHeight;
	rose=document.getElementById("rose");
	cover=document.getElementById('cover');
	dis=document.getElementById('display');
}
//移动事件
function down(){
	console.log(event.clientX );

}
//初始化
function init(){
	init_data();
	rose_auto_center();
	hidden();
	dis.onclick=show;
	cover.onclick=hidden;
	rose.mousedown=down;
}
init();