var format = '12';

chrome.storage.local.get('clock_format', function(f){
    		if(!f) format = '12';
    	})

chrome.storage.local.set({clock_format: format}, function(){
    		console.log('Value set');
    	})

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  h = checkTime(h);
  document.getElementById('clock-time').innerHTML =
  h + ":" + m;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

//Main
var clock = document.createElement('div');
clock.id = "clock-time";
clock.setAttribute("style", "font-size:2em; height:min-content; width:max-content; position:fixed; right:2%; top:90%; cursor:default; opacity:1");

clock.onmouseover = function() {
	this.setAttribute("style", "font-size:2em; height:min-content; width:max-content; position:fixed; right:2%; top:90%; cursor:default; color:#FFFFFF; opacity:0.5;");
}
clock.onmouseout = function() {
	this.setAttribute("style", "font-size:2em; height:min-content; width:max-content; position:fixed; right:2%; top:90%; cursor:default; color:#000000; opcaity:1");
}
document.body.appendChild(clock);
startTime();