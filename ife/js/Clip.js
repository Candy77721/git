var Clip=function(){
	var methods=arguments[0];
	var div=methods[1].parentElement;
	var width=div.offsetWidth;
	var height=div.offsetHeight;
	check_img(methods);
	switch((methods.length-1)/2){
		case 1:one_img(methods,width,height);break;
		case 2:two_img(methods,width,height);break;
		case 3:three_img(methods,width,height);break;
		case 4:four_img(methods,width,height);break;
		case 5:five_img(methods,width,height);break;
		case 6:six_img(methods,width,height);break;
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
function one_img(arguments,width,height){
	console.log("传入一张图片");
	var img=arguments[1];
	img.style.cssText="width:"+width+"px;height:"+height+"px;";
}
//两张图片布局
function two_img(arguments,width,height){
	console.log("传入二张图片");
	var clip1="polygon(0 0,0 "+height+"px,"+width/3+"px "+height+"px, "+width*2/3+"px 0);";
	var clip2="polygon("+width*2/3+"px 0, "+width/3+"px "+height+"px, "+width+"px "+height+"px, "+width+"px 0);margin-top:-"+height+"px;";
	arguments[1].style.cssText="-webkit-clip-path: "+clip1;
	arguments[3].style.cssText="-webkit-clip-path: "+clip2;
	for(var i=1;i<arguments.length;i+=2){
		arguments[i].style.width=width+"px";
		arguments[i].style.height=height+"px";
	}
}
//三张图片布局
function three_img(arguments,width,height){
	console.log("传入三张图片");
	arguments[1].style.width=width-height/2+"px";
	arguments[1].style.height=height+"px";
	for(var i=3;i<arguments.length;i+=2){
		arguments[i].style.width=height/2+"px";
		arguments[i].style.height=height/2+"px";
	}
}
//四张图片布局
function four_img(arguments,width,height){
	console.log("传入四张图片");
	for(var i=1;i<arguments.length;i+=2){
		arguments[i].style.width=width/2+"px";
		arguments[i].style.height=height/2+"px";
	}
}
//五张图片布局
function five_img(arguments,width,height){
	console.log("传入五张图片");
	arguments[1].style.width=width*2/3+"px";
	arguments[1].style.height=height*2/3+"px";
	arguments[3].style.height=width/3+"px";
	arguments[5].style.height=height-width/3+"px";
	arguments[7].style.height=height/3+"px";
	arguments[9].style.height=height/3+"px";
	for(var i=3;i<arguments.length;i+=2){
		arguments[i].style.width=width/3+"px";
		arguments[i].style.float="right";
	}
}
//六张图片布局
function six_img(arguments,width,height){
	console.log("传入六张图片");
	arguments[1].style.width=width*2/3+"px";
	arguments[1].style.height=height*2/3+"px";
	for(var i=3;i<arguments.length;i+=2){
		arguments[i].style.width=width/3+"px";;
		arguments[i].style.height=height/3+"px";
		arguments[i].style.float="right";
	}
}