init();
//初始化
function init(){
	proving=document.getElementById("proving");
	proving.onclick=checking;
}
//获取字符长度
function getLength(){
	var input=document.getElementById("input");
	var value=input.value;
	var length=input.value.length;
	if(value==""){
		length=0;
	}
	value=value.replace(/[^\x00-\xff]/g,"");
	length=2*length-value.length;
	return length;
}
//验证
function checking(){
	var show=document.getElementById("show");
	var length=getLength();
	if(length==0){
		input.style.cssText="border-color:red;";
		show.style.color="red";
		show.innerHTML="姓名不能为空";
	}else if(length>16||length<4){
		input.style.cssText="border-color:rgb(180,180,180);";
		show.style.color="rgb(180,180,180)";
		show.innerHTML="必填，长度为4~16个字符";
	}else{
		input.style.cssText="border-color:green;";
		show.style.color="green";
		show.innerHTML="名称格式正确";
	}
}