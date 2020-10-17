function init() {
	var $digitalClock = $("#DigitalCLOCK");
	var $greeting = $("#greeting");

	function getGreeting(hourNow, session) {
		if (session === "AM") {
			return "Good morning";
		} else {
			if (hourNow === 12 || hourNow < 7) {
				return "Good afternoon";
			}
			return "Good Evening";
		}
	}

	function updateTime() {
		var currentTime = moment();
		var greeting = getGreeting(
			currentTime.format("hh"),
			currentTime.format("A")
		);

		// update the html view
		$digitalClock.text(currentTime.format("hh:mm:ss A"));
		$greeting.text(greeting);
	}

	function createSchedule() {
		var $scheduleBody = $(".schedulerBody");
		var currentTime = moment();

		var scheduleTime = moment();
		var workingHour = scheduleTime.hour(8).minute(0).hour();
		var schedule = "";
		while (workingHour <= 22) {
			// console.log(scheduleTime.format("hh:mm A"));
			var format = scheduleTime.format("hh:mm A");
			var scheduleHour = scheduleTime.hour();
			var style = "past";
			var scheduleValue = localStorage.getItem(scheduleHour) || "";

			if (currentTime.hour() === scheduleHour) {
				style = "present";
			} else if (currentTime.hour() < scheduleHour) {
				style = "future";
			}

			schedule += `
		<div class="input-group input-group-lg ">
			<div class="input-group-prepend">
				<span class="input-group-text time-block">${format}</span>
			</div>
			<input type="text" class="form-control form ${style}" aria-label="Large" value="${scheduleValue}">
			<button class="btn saveBtn" data-time="${scheduleHour}">
				<i class="far fa-save"></i>
			</button>
	  	</div>
	  	`;

			scheduleTime.add(1, "hour");
			workingHour = scheduleTime.hour();
		}

		$scheduleBody.html(schedule);

		// var currentTime = moment();

		// currentTime = currentTime.startOf("hour");
		// var beforeTime = moment().startOf("day").add(8, "hours");

		// function setTime(hour) {
		// 	var time = beforeTime.add(hour, "h");
		// 	time = time.format("hh:mm A");
		// 	$(".block" + (hour - 1)).text(time);
		// }

		// for (let index = 1; index < 8; index++) {
		// 	setTime(index);
		// }

		// function updateView(hour) {
		// 	time1 = moment().startOf("day").add(hour, "hours");
		// 	currentTime = currentTime.startOf("hour");
		// 	if (currentTime.isAfter(time1)) {
		// 		$(".form" + hour).addClass("past");
		// 	} else if (currentTime.isBefore(time1)) {
		// 		$(".form" + hour).addClass("future");
		// 	} else if (currentTime.isSame(time1)) {
		// 		$(".form" + hour).addClass("present");
		// 	}
		// }

		// for (let index = 8; index < 10; index++) {
		// 	updateView(index);
		// }
	}

	function startTimer() {
		setInterval(updateTime, 1000);
	}

	// start Timer
	startTimer();

	createSchedule();

	// var x = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5];
	// for (var i = 0; i < x.length; i++) {
	// 	var dataHour = localStorage.getItem(x[i]);
	// 	$(".form" + x[i]).val(dataHour);
	// }

	$(".saveBtn").on("click", function (event) {
		// event.preventDefault();
		var saveTime = $(this).attr("data-time");
		var formValue = $(this).siblings(".form-control").val();
		console.log(formValue);
		console.log("This worked");

		localStorage.setItem(saveTime, formValue);
	});
}

// start
$(init);
