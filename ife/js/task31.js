//单选按钮改变事件
function radio_change(){
	if(this.id=="yes"){
		company.style.display="none";
		school.style.display="";
	}else{
		company.style.display="";
		school.style.display="none";
	}
}
//城市改变事件
function city_change(){
	var city=this.options[this.selectedIndex].text;
	var sch=city_school[city];
	var text="";
	var schools=document.getElementById("schools");
	for(var i=0;i<sch.length;i++){
		text+="<option>"+sch[i]+"</option>";
	}
	schools.innerHTML=text;
}
function init(){
	var radios=document.getElementById("radios");
	citys=document.getElementById('citys');
	school=document.getElementById("school");
	company=document.getElementById("company");
	company.style.display="none";
	city_school={
	"北京":["北京大学","清华大学"],
	"合肥":["中国科技大学"]
	};
	//为单选按钮绑定事件
	for (var i = 1; i < radios.childNodes.length; i+=2) {
		radios.childNodes[i].onchange=radio_change;
	}
	citys.onchange=city_change;	
}
init();