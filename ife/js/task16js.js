var delete_tr=document.getElementsByTagName("button");
init();
//初始化
function init(){
	var add_city=document.getElementById("add_btn");
	add_city.onclick=btn_click;
	for (var i = 1; i < delete_tr.length; i++) {
		delete_tr[i].onclick=delete_table;
	}
}
//添加城市事件
function btn_click(){
	//获取城市名
	var city_name=document.getElementById("aqi-city-input").value;
	//获取空气质量指数
	var air_value=document.getElementById("aqi-value-input").value;
	//去空格
	city_name=city_name.trim();
	air_value=air_value.trim();

	//判断城市名和空气质量指数是否符合标准
	if(judge_city(city_name)&&judge_air(air_value)){
		var array=[city_name,air_value];
		add_table(array);
	}
}
//去空格
function trim(){
	var reSpace=/^\s*(.*?)\s*$/;
	return this.replace(reSpace,"$1");
}
//判断城市名是否为中文或英文
function judge_city(city_name){
	//判断中文正则表达式
	var china= /^[0-9\u4e00-\u9faf]+$/;
	//判断英文正则表达式
	var english= /^[A-Za-z]+$/;
	if(city_name==""||city_name==null){
		alert("城市名不能为空，请输入！");
		return false;
	}
	if(!china.test(city_name)&&!english.test(city_name))
	{
		alert("城市名只能为中文或英文，请重新输入！");
		return false;
	}
	return true;
}
//判断空气质量指数是否为整数
function judge_air(air_value){
	//判断空气质量指数是否为正整数
	var integer=/^[0-9]*[1-9][0-9]*$/;
	if(air_value==""||air_value==null){
		alert("空气质量指数不能为空，请输入！");
		return false;
	}
	if(!integer.test(air_value)){
		alert("空气质量指数只能为正整数，请重新输入！");
		return false;
	}
	return true;
}
//为表格添加新的元素
function add_table(array){
	var table=document.getElementById("aqi-table");
	var tlength=table.getElementsByTagName("tr").length;
	var tr=table.insertRow(tlength);
	for (var i = 0; i < 2; i++) {
		var td=tr.insertCell(i);
		td.innerHTML=array[i];
	}
	var td=tr.insertCell(2);
	td.innerHTML="<button>删除</button>";
	td.getElementsByTagName('button')[0].onclick=delete_table;
}
function delete_table(){
	var tab=document.getElementById("aqi-table");
	tab.deleteRow(this.parentNode.parentNode.rowIndex);
}