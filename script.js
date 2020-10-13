function showTime() {
	var date = new Date();
	var hourNow = date.getHours();
	var minuteNow = date.getMinutes();
	var secondNow = date.getSeconds();
	var session = 'PM';
	var greeting;

	if (hourNow > 18) {
		greeting = 'Good Evening';
	} else if (hourNow > 12) {
		greeting = 'Good afternoon';
	} else if (hourNow > 0) {
		greeting = 'Good morning';
	} else {
		greeting = 'Welcome';
	}

	hourNow = hourNow < 10 ? '0' + hourNow : hourNow;
	minuteNow = minuteNow < 10 ? '0' + minuteNow : minuteNow;
	secondNow = secondNow < 10 ? '0' + secondNow : secondNow;

	var time = hourNow + ':' + minuteNow + ':' + secondNow + ' ' + session;

	document.getElementById('DigitalCLOCK').innerText = time;
	document.getElementById('DigitalCLOCK').textContent = time;
	document.getElementById('DigitalCLOCK').textContent = time;
	document.getElementById('greeting').innerHTML = greeting;

	setTimeout(showTime, 1000);
}

showTime();