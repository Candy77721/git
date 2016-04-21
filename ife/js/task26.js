/*
	1、为新飞船按钮绑定事件
	2、为开始、停止按钮分别绑定事件
	3、过滤对不存在飞船的命令
	4、通过介质传输命令（过程可能产生丢包）
	5、所有飞船接受处理通过介质传过来的命令
	（每个飞船都接受到数据，判断是否属于自己）
	6、信号接收系统执行属于自己的命令
	7、飞行、停止、自爆命令交给各自系统
	8、当飞船新创建时开启自动充能
*/
//飞船
function Ship(id,element){
	this.id=id;
	this.state="stop";
	this.element=element;
	this.energy=100;
	this.angle=0;
	//获取飞船id
	this.get_id=function(){
		return this.id;
	}
	//获取页面飞船(div)
	this.get_element=function(){
		return this.element;
	}
	//设置当前飞船状态
	this.set_state=function(state){
		this.state=state;
	}
	//获取飞船当前状态
	this.get_state=function(){
		return this.state;
	}
	//设置当前能源百分比
	this.set_energy=function(energy){
		this.energy=energy;
	}
	//获取飞船当前能源百分比
	this.get_energy=function(){
		return this.energy;
	}
	//设置当前能源百分比
	this.set_angle=function(angle){
		this.angle=angle;
	}
	//获取飞船当前能源百分比
	this.get_angle=function(){
		return this.angle;
	}
	//开始飞行方法
	this.start_fly=function(){
		var ship=this;
		var timer1=setInterval(function(){
			if(ship.state=="start"){
				var energy_system=new EnergySystem(ship);
				energy_system.consume();
				// console.log("飞行中：当前能源剩余量:"+ship.get_energy());
				var power_system=new PowerSystem(ship);
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
		div_list.removeChild(this.element);
		ship_list.splice(this.id-1, 1,"");
		console.log("已销毁飞船");
	}
}
//能源系统
function EnergySystem(ship){
	this.energy=ship.get_energy();
	//充电
	this.charge=function(){
		if(this.energy<100){
			this.energy+=2;
			if(this.energy>=100){
				this.energy=100;
				console.log("能源已满");
			}
			ship.set_energy(this.energy);
		}
	}
	//消耗
	this.consume=function(){
		if(this.energy>0){
			this.energy-=5;
			if(this.energy<=0){
				this.energy=0;
				console.log("能源为0");
			}
			ship.set_energy(this.energy);
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
				case "destroy":ship.myself_destroy();break;
				case "stop":{
					ship.stop_fly();
					ship.set_state("stop");
				}break;
				case "start":{
					ship.start_fly();
					ship.set_state("start");
				}break;
			}
		}else{
			return;
		}
	}
}
//动力系统
function PowerSystem(ship){
	//能源
	this.energy=ship.get_energy();
	//飞行
	this.fly=function(){
		if(this.energy!=0){
			//能源显示
			update_energy(ship);
			ship.set_angle(ship.get_angle()+10);
			ship.element.style.cssText="transform: rotate("+ship.get_angle()+"deg);"
		}else{
			ship.set_state("stop");
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
		console.log(track.id);
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
	ship.element.childNodes[1].innerHTML=ship.get_energy();
	ship.element.childNodes[3].style.cssText="width:"+ship.get_energy()+"px";
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
		if(ship_list[i]!=""&&ship_list[i].get_id()==index){
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
	//网页上显示飞船的容器
	// div_list=document.getElementById('list');

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

