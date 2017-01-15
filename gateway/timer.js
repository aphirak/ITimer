var NanoTimer = require('nanotimer');
var moment = require('moment')

var y = moment.duration(0, 'milliseconds')
 
function main(){
    var timer = new NanoTimer();
    timer.setInterval(countDown, '', '1m');
}
 
function countDown(){
	y = moment.duration(y + 1, 'milliseconds')
	console.log(y.hours() + ":" + y.minutes() + ":" + y.seconds() + ":" + y.milliseconds())
}
 
main();