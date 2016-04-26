/*
 *冻结表头
 *
 */
function frozen_table(){
	var container=document.getElementById('container');
	var table=document.getElementById('student_score');
	if(container.firstChild.nextSibling.id=="student_score"){
		var div=document.createElement("div");
		var tr=table.firstChild.nextSibling.cloneNode(true);
		div.appendChild(tr);
		div.style.cssText="border: 1px solid #cecece;z-index: 10;position:fixed;";
		container.insertBefore(div,table);
		onbind();
	}else{
		div=container.firstChild.nextSibling;
		if(document.body.scrollTop>=700){
			div.style.display="none";
			console.log(div.style.display);
		}else{
			div.style.display="";
			console.log(div.style.display);
		}
	}
}
//成绩升序排列
function ascending(e,index){
	score_list.sort(function(a,b){
		return a[index]-b[index];
	});
	replace_tr_data();
}
//成绩降序排列
function descending(e,index){
	score_list.sort(function(a,b){
		return b[index]-a[index];
	});
	replace_tr_data();
}
//点击按钮事件
function click_btn(){
	var head=this.parentNode.parentNode.id;
	//遍历curriculum查找所点击按钮在的列数
	for(var i=0;i<curriculum.length;i++){
		if(curriculum[i]==head){
			//判断是否是升序排列
			if(this.className=="top_angle"){
				ascending(this,i+1);
			}else{
				descending(this,i+1);
			}
		}
	}
}
//替换表格中的数据
function replace_tr_data(){
	var rows=document.getElementById('student_score').rows;
	for (var i = 1; i <rows.length; i++) {
		for(var j=0;j<rows[i].cells.length;j++){
			rows[i].cells[j].innerHTML=score_list[i-1][j];
		}
	}
}
//为表格添加一行数据
function add_tr(list){
	var table=document.getElementById('student_score');
	var tr=document.createElement("tr");
	for (var i = 0; i < list.length; i++) {
		var td=document.createElement("td");
		td.innerHTML=list[i];
		tr.appendChild(td);
	}
	table.appendChild(tr);
}
// 生成表格内容
function add_table_content(){
	for (var i = 0; i < score_list.length; i++) {
		add_tr(score_list[i]);
	}
}
/*绑定事件
 *为每个排序按钮绑定事件
 *冻结表头
 */
function onbind(){
	var top_angle_list=document.getElementsByClassName('top_angle');
	var bottom_angle_list=document.getElementsByClassName('bottom_angle');
	for (var i = 0; i < top_angle_list.length; i++) {
		top_angle_list[i].onclick=click_btn;
	}
	for (var i = 0; i < bottom_angle_list.length; i++) {
		bottom_angle_list[i].onclick=click_btn;
	}
}
//初始化数据
function init_data(){
	//全部课程及总分
	curriculum=["chinese","math","english","total_score"];
	//姓名、语文、数学、英语
	score_list=[["小明",80,70,90,240],
				["小红",90,60,90,240],
				["小亮",60,100,70,230],
				["小明",80,70,90,240],
				["小红",90,60,90,240],
				["小亮",60,100,70,230],
				["小明",80,70,90,240],
				["小红",90,60,90,240],
				["小亮",60,100,70,230],
				["小明",80,70,90,240],
				["小红",90,60,90,240],
				["小亮",60,100,70,230]];
}
//初始化
function init(){
	init_data();
	add_table_content();
	onbind();
	onscroll=frozen_table;
}
init();