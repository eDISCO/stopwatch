/// 
// global vars first:
Timer = 35990;
fast = true;
Stopped = true;
down = true;
Hide = false;

function Draw_low(){
	var hours = Math.floor(Timer / 3600);
	var minutes = Math.floor(Timer / 60) % 60;
	var seconds = Timer - 60*minutes - 3600*hours;
	Update_slides(hours, minutes, seconds);
	// rectify:
	digits = Rectify(hours) +":"+ Rectify(minutes) + ":" + Rectify(seconds);
	$('#time > h1').text(digits);
}
function Draw_high(){
	var hours = Math.floor(Timer / 36000) % 24;
	var minutes = Math.floor(Timer / 600) % 60;
	var seconds = Math.floor(Timer / 10) % 60;
	var tenths = Timer % 10;
	Update_slides(hours, minutes, seconds);
	// rectify:
	digits = Rectify(minutes) + ":" + Rectify(seconds) + ":" + Rectify(tenths*10);
	$('#time > h1').text(digits);
}
function Rectify(i) {
    if (i<10) {i = "0" + i};
    return i;
}
function Stopwatch_low (){
	Draw_low();
	Timer++;
}
function Stopwatch_high (){
	Draw_high();
	Timer++;
}
function Stop(){
	clearInterval(Runner);
	Stopped = true;
}
function Countdown_low(){
	Draw_low();
	Timer--;
	if (Timer<0){
		// function here...
		for (var i = 5; i >= 0; i--) {
			$('.stopwatch').fadeOut(300).fadeIn(300);		
			};
	Stop();	
	}
}
function Countdown_high(){
	Draw_high();
	Timer--;
	if (Timer<0){
		// function here...
		for (var i = 5; i >= 0; i--) {
			$('.stopwatch').fadeOut(300).fadeIn(300);		
			};
	Stop();
	}
}
// here it starts:
function Start(fast, down){
	if ((fast===false) && (down===true))
		Runner = setInterval(Countdown_low, 1000);
	else if ((fast===false) && (down===false))
		Runner = setInterval(Stopwatch_low, 1000);
	else if ((fast===true) && (down===true))
		Runner = setInterval(Countdown_high, 100);
	else if ((fast===true) && (down===false))
		Runner = setInterval(Stopwatch_high, 100);
	Stopped = false;
}
function Update_slides(h, m, s){

		var hours = $("#hours");
		var minutes = $("#minutes");
		var seconds = $("#seconds");
		hours.val(h);
		minutes.val(m);
		seconds.val(s);
}
function Update_Timer(){
	var hours = Math.floor($("#hours").val());
	var minutes =Math.floor( $("#minutes").val());
	var seconds = Math.floor($("#seconds").val());
	var tenths = 0;
	if (fast===true){
		Timer = 36000*hours + 600*minutes + seconds*10;
		digits = Rectify(minutes) + ":" + Rectify(seconds) + ":" + Rectify(tenths*10);
		$('#time > h1').text(digits);
	} else {
		Timer = 3600*hours + 60*minutes + seconds;
		digits = Rectify(hours) +":"+ Rectify(minutes) + ":" + Rectify(seconds);
		$('#time > h1').text(digits);
	}
	
	
}
function Stop_Start(){
	if (Stopped===false){
		Stop();
		$(".top").css('visibility','visible');
		$("#Stop_Start").text("Start");
	} else {
		Start(fast,down);
		$(".top").css('visibility','hidden');
		$("#Stop_Start").text("Stop");
	}

}
function Hide_Show(){
	// obsolete, not used.
	if (Hide===false){
		// TUNA
		$(".top").css('visibility','hidden');
		Hide = true;
		$("#Hide_Show").text("Show");
	} else {
		// TUNA
		Hide = false;
		$(".top").css('visibility','visible')
		$("#Hide_Show").text("Hide");
	}
}
function Reset() {
	// 
	Timer = 0;
	if (fast===true){
		Draw_high();
	} else {
		Draw_low();
	}
	down = false;
	$("#Up_Down").text("Countdown");
}
function Up_Down () {
	if (down===false){
		// TUNA
		down = true;
		if (Stopped===false){
			Stop();
			Start(fast, down);
		}
		$("#Up_Down").text("Stopwatch");
	} else {
		// TUNA
		down = false;
		if (Stopped===false){
			Stop();
			Start(fast, down);
		}
		$("#Up_Down").text("Countdown");
	}
}
// Switching between fast and slow clock speeds... 
function Fast_Slow() {
	if (fast===false){
		// TUNA
		fast = true
		Timer = Timer * 10;
		if (Stopped===false){
			Stop();
			Start(fast, down);
		} else {
			Draw_high();
		}
		$("#Fast_Slow").text("Low Precision");
	} else {
		// TUNA
		fast = false
		Timer = Math.floor(Timer/10);
		if (Stopped===false){
			Stop();
			Start(fast, down);
		} else {
			Draw_low();
		}
		$("#Fast_Slow").text("High Precision");
	}
}
function onSlide() {
	if (Stopped===true){
		Update_Timer();
	}
}
$('.sliders').on('slide', onSlide);
$(document).ready(function(){
//

Start(fast, down);
// //
$('.sliders').noUiSlider({
	start: 30,
	step: 1,
	range: {
		'min': 0,
		'max': 60
	}
});

});
