/* 
 * 接口类构造函数,接受2个以上的参数，其中第一个参数为接口名，后面的参数可以为字符串数组，也可以为字符串 
 * @param {Object} name 
 * 接口名 
 * @param {Object} methods 
 * 接口包含的方法集合,参数可以为数组，也可以传入任意多的字符串形式的方法名 
 */ 
var Interface=function(name,methods){
	if(arguments.length<2){//若参数个数少于2，则抛出异常
		throw new Error("Interface constructor called with"+arguments.length+
			"arguments, but expected at least 2");
	}
	this.name=name;
	this.methods=[];
	for(var i=1;i<arguments.length;i++){
		if(arguments[i] instanceof Array){//若参数为数组，则遍历该参数
			for(var j=0;j<arguments[i].length;j++){
				if(typeof arguments[i][j]!="string"){//若方法名不为字符串，则抛出异常
					throw new Error("Interface constructor expects methods names to be passed in as a string");
				}
				this.methods.push(arguments[i][j]);//保存方法名
			}
		}else if(typeof arguments[i]=="string"){//若参数类型为字符串，则直接保存
			this.methods.push(arguments[i]);
		}else{//否则抛出异常
			throw new Error("Interface constructor expects method names to be passed in as a string");
		}
	}
}
/* 
 * 接口实现检验函数，第一个参数为要检查的对象，后面的任意参数为实现的接口对象,也可以为接口对象数组 
 * @param {Object} object 
 */  
 Interface.ensureImplments=function(object){
 	if(arguments.length<2){//若参数个数少于2，则抛出异常
		throw new Error("Interface constructor called with"+arguments.length+
			"arguments, but expected at least 2");
	}
	var checkMethods=function(interface){
		var methods=interface.methods;
		for(var i=0;i<methods.length;i++){
			var method=methods[i];
			//若对象不存在该属性或该属性不是方法，则抛出异常
			if(typeof object[method]=="undefined"||typeof object[method]!="function"){
				
				throw new Error("Function Interface.ensureImplents: object does not implent the " +   
                    interface.name + "interface. Method " + method + " was not found" ); 
			}
		}
	};
	for(var i=1;i<arguments.length;i++){
		if(arguments[i] instanceof Array){
			for(var j=0;j<arguments[i].length;j++){
				if(!arguments[i][j]instanceof Interface){
					throw new Error('Function Interface.ensureImplents expects arguments two and above to be' +  
                	'instances of Interface');  
				}
				checkMethods(arguments[i][j]);
			}
		}else if(arguments[i] instanceof Interface){
			checkMethods(arguments[i]);
		}else{
			throw new Error('Function Interface.ensureImplents expects arguments two and above to be' +  
            'instances of Interface');  
		}
	};
	
 }
