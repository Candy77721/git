// 用于渲染图表的数据
var chartData = {};
// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}
var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
// 以下两个函数用于随机模拟生成测试数据
/**
 *生成日期
 */
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
/**
  *生成空气质量指数(2016年：1月1日到3月31日)
  */
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var city_select=document.getElementById('city-select');
  for(var key in aqiSourceData){
    var opcity=document.createElement("option");
    opcity.innerHTML=key;
    city_select.add(opcity);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  city_select.onchange=citySelectChange;
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var index=document.getElementById('city-select').selectedIndex;
  if(pageState.nowSelectCity!=index){
    // 设置对应数据
    pageState.nowSelectCity=index;
    chartData=aqiSourceData[this.value];
    // 调用图表渲染函数
    renderChart();
  }
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  if(this.value!=pageState.nowGraTime){
     // 设置对应数据
    pageState.nowGraTime=this.value;
    // 调用图表渲染函数
    renderChart();
  }
}
/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var radio=document.getElementById('form-gra-time').getElementsByTagName("input");
  for (var i = 0; i < radio.length; i++) {
    radio[i].onclick=graTimeChange;
  }
}
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  var city=document.getElementById("city-select").options;
  // 处理好的数据存到 chartData 中
  chartData=aqiSourceData[city[pageState.nowSelectCity].value];
  renderChart();
}
/**
 *设置css样式
 */
function setcss(charti,height,width){
  charti.style.cssText="width:"+width+"px;height:"+height+"px;float:left; margin-top:"+(550-height)+"px;";
  if(height>400){
    charti.style.background="black";
    }else if(height>300){
      charti.style.background="#7e017e";
    }else if(height>200){
      charti.style.background="red";
    }else if(height>100){
      charti.style.background="blue";
    }else if(height>0){
      charti.style.background="green";
  }
}
/**
  *将日数据转变成周数据
  */
function getWeekData(){
  var weekData={};
  var i=1;
  var date;
  var value=0;
  for(var key in chartData){
    value+=chartData[key];
    if(i==1){
      date=key;
    }
    if(i==7){
      date+="  "+key;
      weekData[date]=Math.ceil(value/7);
      date="";
      value=0;
      i=0;
    }
    i++;
  }
  return weekData;
}
/**
  *将日数据转变成月数据
  */
function getMonthData(){
  var monthData={};
  var monthLength=0;
  var value=0;
  var month=0;
  for(var key in chartData){
    value+=chartData[key];
    if(monthLength>new Date(key).getDate()||monthLength==30){
      month++;
      if(monthLength==30){
        monthLength=31;
      }
      monthData[month+"月"]=Math.ceil(value/monthLength);
      monthLength=0;
      value=0;
    }
    monthLength++;
  }
  return monthData;
}
/**
 * 渲染图表
 */
function renderChart() {
  var chart=document.getElementsByClassName('aqi-chart-wrap')[0];
  var body=document.getElementsByTagName("body")[0];
  var chart1=document.createElement("div");
  var data=chartData;
  var width=10;
  chart1.className="aqi-chart-wrap";
  body.replaceChild(chart1,chart);
  if(pageState.nowGraTime=="week"){
    data=getWeekData();
    width=20;
  }
  if(pageState.nowGraTime=="month"){
    data=getMonthData();
    width=30;
  }
  for(var key in data){
    var charti=document.createElement("div");
    var height=data[key];
    setcss(charti,height,width);
    charti.setAttribute('title',key+"[AQI]"+height); 
    chart1.appendChild(charti);
    charti.onmousemove="this.title";
  }
}
/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}
init();