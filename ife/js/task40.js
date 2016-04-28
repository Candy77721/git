//定义一个日期接口
var interface_calendar=new Interface("interface","get_date","set_date");
//实现接口(设置日期和获取日期)
var implements_calendar={
	date:new Date(2014,8,0),
	get_date:function(){
		return this.date;
	},
	set_date:function(date){
		this.date=date;
	}
}

//切换日期
function switch_date(){
	var dt=implements_calendar.get_date();
	var year=dt.getFullYear();
	var month=dt.getMonth()+1;
	var date=new Date(year,(month+1),0);
	if(this.id=="left"){
		date=new Date(year,month-1,0);
	}
	center.childNodes[0].innerHTML=date.getFullYear();
	center.childNodes[2].innerHTML=date.getMonth()+1;
	implements_calendar.set_date(date);
	clear_table_data();
	show_calendar(get_data());
}
//显示日历
function show_calendar(day_list){
	var rows=document.getElementById('table').rows;
	var index=1;
	for (var i = 0; i < day_list.length; i++) {
		var data=day_list[i];
		rows[index].cells[data.week].innerHTML="<div>"+data.day+"</div>";
		if(data.week==6){
			index++;
		}
	}
}
//清理表格数据
function clear_table_data(){
	var rows=document.getElementById('table').rows;
	for (var i = 1; i < rows.length; i++) {
		for(var j=0;j<rows[i].cells.length;j++){
			rows[i].cells[j].innerHTML="";
		}
	}
}
//获取一个月所有天数及每天对应的星期数据
function get_data(){
	var day_list=[];
	var dt=implements_calendar.get_date();
	var date;
	for(var i=1;i<=dt.getDate();i++){
		date=new Date(dt.getFullYear(),dt.getMonth(),i);
		var week=date.getDay();
		var data={
			day:i,
			week:week
		};
		day_list[i-1]=data;
	}
	return day_list;
}
//生成日历表格
function insert_table(){
	var table=document.getElementById('table');
	for(var i=1;i<7;i++){
		var tr=table.insertRow(i);
		for(var j=0;j<7;j++){
			var td=tr.insertCell(j);
		}
		tr.cells[0].className="sunday";
		tr.cells[6].className="saturday";
	}
}
//绑定事件
function onbind(){
	var left=document.getElementById('left');
	var right=document.getElementById('right');
	left.onclick=switch_date;
	right.onclick=switch_date;
}
//初始化
function init(){
	insert_table();
	onbind();
	show_calendar(get_data());
}
init();