//飞船
function Ship(id,element){
	this.id=id;
	this.state="stop";
	this.element=element;
	this.energy=100;
	this.angle=0;
	//开始飞行方法
	this.start_fly=function(){
		var ship=this;
		this.state="start";
		var timer1=setInterval(function(){
			if(ship.state=="start"){
				var energy_system=new EnergySystem(ship);
				var power_system=new PowerSystem(ship);
				energy_system.consume();
				power_system.fly();
			}else{
				console.log("能量不足停止飞行，正在自动充能");
				clearInterval(timer1);
			}
		},1000);
	}
	//停止飞行方法
	this.stop_fly=function(){
		var ship=this;
		this.state="stop";
		var timer2=setInterval(function(){
			if(ship.state=="stop"){
				var power_system=new PowerSystem(ship);
				power_system.stop();
				clearInterval(timer2);
			}
		},1000);
	}
	//销毁飞船方法
	this.myself_destroy=function(){
		this.element.parentNode.removeChild(this.element);
		ship_list.splice(this.id-1, 1,"");
		console.log("已销毁飞船");
	}
}
//能源系统
function EnergySystem(ship){
	//充电
	this.charge=function(){
		if(ship.energy<100){
			ship.energy+=2;
			if(ship.energy>=100){
				ship.energy=100;
				console.log("能源已满");
			}
		}
	}
	//消耗
	this.consume=function(){
		if(ship.energy>0){
			ship.energy-=5;
			if(ship.energy<=0){
				ship.energy=0;
				console.log("能源为0");
			}
		}
	}
}
//信号接收系统
function SignalReceiving(data,ship){
	//处理数据
	this.handle=function(){
		if(ship.id==data.id){
			console.log(data.id+"号飞船开始处理数据");
			switch(data.command){
				case "destroy":
					ship.myself_destroy();
				break;
				case "stop":
					if(ship.state!="stop")
						ship.stop_fly();
					break;
				case "start":
					if(ship.state!="start")
						ship.start_fly();
					break;
			}
		}else{
			return;
		}
	}
}
//动力系统
function PowerSystem(ship){
	//飞行
	this.fly=function(){
		if(ship.energy!=0){
			//能源显示
			update_energy(ship);
			ship.angle+=10;
			ship.element.style.cssText="transform: rotate("+ship.angle+"deg);"
		}else{
			ship.state="stop";
		}
	}
	//停止
	this.stop=function(){
		console.log("飞船已停止飞行");
	}
}
//创建飞船并对其初始化
function create_ship(){
	//当前太空为空的轨道
	var count=0;
	for(var i=0;i<ship_list.length;i++){
		if(ship_list[i]==""){
			count=i+1;
			break;
		}
	}
	if(count<=ship_list.length&&count>0){
		//在页面上显示一个飞船
		var element=document.createElement("div");
		element.id="ship"+count;
		element.innerHTML=count+"号-<span>100</span>%<div id='energy'></div>";
		var track=document.getElementById("track"+count);
		track.insertBefore(element,track.firstChild);
		//打印log
		console.log(count+"号飞船起飞");
		//将新创建的飞船添加到集合中
		var ship=new Ship(count,element);
		//开启太空自动充电
		setInterval(function(){
			var energy_system=new EnergySystem(ship);
			energy_system.charge();
			update_energy(ship);
		},1000);
		ship_list.splice(count-1,1,ship);
	}
}
//修改能量条
function update_energy(ship){
	ship.element.childNodes[1].innerHTML=ship.energy;
	ship.element.childNodes[3].style.cssText="width:"+ship.energy+"px";
}
//飞船接受处理数据
function receive(data){
	for(var i=0;i<ship_list.length;i++){
		if(ship_list[i]!=""){
			var signal=new SignalReceiving(data,ship_list[i]);
			signal.handle();
		}
	}
}
//介质
function Mediator(data){
	//传输数据
	this.transmittal=function(){
		console.log("数据传输中");
		var num=Math.random()*10;
		if(num>2){
			setTimeout(function(){
				receive(data);
			},1000);
		}else{
			setTimeout(function(){
				console.log("数据丢失");
			},1000);
		}
	}
}
//命令按钮事件
function btn_ship(list,el,msg){
	//获取销毁飞船的号码
	var index=list.indexOf(el)+1;
	//判断飞船是否存在
	for(var i=0;i<ship_list.length;i++){
		// if(ship_list[i]!=""&&ship_list[i].get_id()==index){
		if(ship_list[i]!=""&&ship_list[i].id==index){
			//将号码传给Mediator介质
				var data={
				id:index,
				command:msg
			};
			console.log("发送消息给"+index+"号飞船");
			new Mediator(data).transmittal();
			return;
		}
	}
	console.log("不存在该飞船");
}
//获取元素在数组中的索引
Array.prototype.indexOf = function(el){
 	for (var i=0,n=this.length; i<n; i++){
  		if (this[i] === el){
  			return i;
  		}
 	}
 	return -1;
}
//初始化
function init(){
	//太空中飞船的集合
	ship_list=["","","",""];
	//创建新飞船按钮
	btn_new_ship=document.getElementById('new');
	btn_new_ship.onclick=create_ship;
	//开始飞行按钮数组
	start_list=new Array();
	//开始飞行按钮集合
	btn_start=document.getElementsByClassName('start');
	//为每个按钮绑定点击事件，并将自爆按钮存放在数组中
	for(var i=0;i<btn_start.length;i++){
		start_list.push(btn_start[i]);
		btn_start[i].onclick=function(){
			return btn_ship(start_list,this,"start");
		};
	}

	stop_list=new Array();
	btn_stop=document.getElementsByClassName('stop');
	for(var i=0;i<btn_stop.length;i++){
		stop_list.push(btn_stop[i]);
		btn_stop[i].onclick=function(){
			return btn_ship(stop_list,this,"stop");
		};
	}

	destroy_list=new Array();
	btn_destroys=document.getElementsByClassName('destroy');
	for(var i=0;i<btn_destroys.length;i++){
		destroy_list.push(btn_destroys[i]);
		btn_destroys[i].onclick=function(){
			return btn_ship(destroy_list,this,"destroy");
		};
	}
}
init();

