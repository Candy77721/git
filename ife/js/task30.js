//失去焦点检查
function checking(){
	//文本框和它的值
	show=this.nextSibling.nextSibling;
	value=this.value;
	switch(this.parentNode.id){
		case "name":check_name(this);break;
		case "password":check_pw(this);break;
		case "passwordOK":check_pwOK(this);break;
		case "email":check_email(this);break;
		case "phone":check_phone(this);break;
	}
}
//变红
function change_red(node){
	node.style.cssText="border-color:rgb(224,0,13);";
	show.style.color="rgb(224,0,13)";
}
//变绿
function change_green(node){
	node.style.cssText="border-color:green;";
	show.style.color="green";
}
//检查名称
function check_name(node){
	var length=value.length;
	value=value.replace(/[^\x00-\xff]/g,"");
	length=2*length-value.length;
	if(length<=16&&length>=4){
		show.innerHTML="名称格式正确";
		change_green(node);
	}else{
		if(length==0){
			show.innerHTML="名称不能为空";
		}else{
			show.innerHTML="必填，长度为4~16个字符";
		}
		change_red(node)
	}
}
//检查密码
function check_pw(node){
	if(value.length==0){
		show.innerHTML="密码不能为空";
		change_red(node);
	}else{
		show.innerHTML="密码可用";
		change_green(node);
	}
}
//检查检查确认密码
function check_pwOK(node){
	if(node.value==""){
		show.innerHTML="密码不能为空";
		change_red(node);
	}else if(value==inputs[1].value){
		show.innerHTML="密码输入一致";
		change_green(node);
	}else{
		show.innerHTML="两次输入密码不一致";
		change_red(node);
	}
}
//检查邮箱
function check_email(node){
	if(node.value==""){
		show.innerHTML="邮箱不能为空";
		change_red(node);
	}else if(node.checkValidity()){
		show.innerHTML="邮箱格式正确";
		change_green(node);
	}else{
		show.innerHTML="邮箱格式不正确";
		change_red(node);
	}
}
//检查手机
function check_phone(node){
	if(node.value==""){
		show.innerHTML="手机不能为空";
		change_red(node);
	}else if(/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(node.value)){
		show.innerHTML="手机格式正确";
		change_green(node);
	}else{
		show.innerHTML="手机格式不正确";
		change_red(node);
	}
}
//得到焦点提示
function hint(){
	this.style.cssText="border:2px solid rgb(98,174,236);";
	this.nextSibling.nextSibling.style.cssText="dispaly:'';color: rgb(180,180,180);";
}
//提交
function submit(){
	for (var i = 0; i < shows.length; i++) {
		if(shows[i].style.color!="green"){
			confirm("提交失败");
			return;
		}	
	}
	confirm("提交成功");
}
//初始化
function init(){
	//隐藏提示信息
	shows=document.getElementsByClassName('show');
	for (var i = 0; i < shows.length; i++) {
		shows[i].style.display="none";
	}
	//为文本框绑定焦点事件
	inputs=document.getElementsByClassName('input');
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].onfocus=hint;
		inputs[i].onblur=checking;
	}
	proving=document.getElementById('proving');
	proving.onclick=submit;
}
init();
