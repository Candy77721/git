var Clip=function(){
	var div=arguments[1];
	console.log(div.id);
	check_img(arguments[0]);
	switch((arguments[0].length-1)/2){
		case 1:one_img(arguments[0],div);break;
		case 2:two_img(arguments[0],div);break;
		case 3:three_img(arguments[0],div);break;
		case 4:four_img(arguments[0],div);break;
		case 5:five_img(arguments[0],div);break;
		case 6:six_img(arguments[0],div);break;
		default:throw new Error("img max seven");		
	}
}
//检查图片
function check_img(arguments){
	for (var i = 1; i < arguments.length; i+=2) {
		if(!(arguments[i] instanceof HTMLImageElement)){
			throw new Error("argument type no HTMLImageElement");
			return;
		}
	}
}
//一张图片布局
function one_img(arguments,div){
	console.log("传入一张图片");
	var img=arguments[1];
	img.style.cssText="width:400px;height:300px;";
}
//两张图片布局
function two_img(arguments,div){
	console.log("传入二张图片");
	arguments[1].style.cssText="-webkit-clip-path: polygon(0 0,0 300px,133px 300px, 266px 0);";
	arguments[3].style.cssText="-webkit-clip-path: polygon(266px 0, 133px 300px, 400px 300px, 400px 0);margin-top:-300px";
	for(var i=1;i<arguments.length;i+=2){
		arguments[i].style.width="400px";
		arguments[i].style.height="300px";
	}
}
//三张图片布局
function three_img(arguments,div){
	console.log("传入三张图片");
	arguments[1].style.width="250px";
	arguments[1].style.height="300px";
	for(var i=3;i<arguments.length;i+=2){
		arguments[i].style.width="150px";
		arguments[i].style.height="150px";
	}
}
//四张图片布局
function four_img(arguments,div){
	console.log("传入四张图片");
	for(var i=1;i<arguments.length;i+=2){
		arguments[i].style.width="200px";
		arguments[i].style.height="150px";
	}
}
//五张图片布局
function five_img(arguments,div){
	console.log("传入五张图片");
	arguments[1].style.width="267px";
	arguments[1].style.height="200px";
	arguments[3].style.height="133px";
	arguments[5].style.height="167px";
	arguments[7].style.height="100px";
	arguments[9].style.height="100px";
	for(var i=3;i<arguments.length;i+=2){
		arguments[i].style.width="133px";
		arguments[i].style.float="right";
	}
}
//六张图片布局
function six_img(arguments,div){
	console.log("传入六张图片");
	arguments[1].style.width="267px";
	arguments[1].style.height="200px";
	for(var i=3;i<arguments.length;i+=2){
		arguments[i].style.width="133px";
		arguments[7].style.height="100px";
		arguments[i].style.float="right";
	}
}