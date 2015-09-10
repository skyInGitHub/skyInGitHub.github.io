function countDay() {
	var start, end, sDate, eDate, tempDate, daysCount;
	start = document.getElementById("startDate").value;
	end = document.getElementById("endDate").value;
	if (start.length != 0 && end.length != 0) {
		tempDate = start.split("-")
		sDate = new Date(tempDate[1] + '-' + tempDate[2] + '-' + tempDate[0]) // change into month-day-year format   
		tempDate = end.split("-")
		eDate = new Date(tempDate[1] + '-' + tempDate[2] + '-' + tempDate[0])

		daysCount = parseInt(Math.abs(eDate - sDate) / 1000 / 60 / 60 / 24) // convert milliseconds into days   
		if (eDate - sDate < 0) {
			alert("Start Date is after End Date, please select again!");
		} else {
			var r = confirm(daysCount + 1 + " days are added to schedule from " + start + " to " + end + "!");
			// store sDate and eDate
			if (typeof(Storage) != "undefined") {
				// Check browser support
				var days = daysCount + 1;
				localStorage.setItem("sDate", sDate);
				localStorage.setItem("eDate", eDate);
				localStorage.setItem("daysOfPlan", days);
			} else {
				alert("Sorry, your browser does not support Web Storage...");
			}
		}
	} else {
		alert("Please ensure you have choosen Start Date and End Date!");
	}
}