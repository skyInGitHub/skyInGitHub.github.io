function countDay() {
	// Store for the value of start date
	var start;
	// Store for the value of start date
	var end;
	// Store for the Date object of start date
	var sDate;
	// Store for the Date object of start date
	var eDate;
	
	var tempDate;
	// Store for the days counted from start date and end date
	var daysCount;
	
	start = document.getElementById("startDate").value;
	end = document.getElementById("endDate").value;
	if (start.length != 0 && end.length != 0) {
		tempDate = start.split("-")
		// change into month-day-year format
		sDate = new Date(tempDate[1] + '-' + tempDate[2] + '-' + tempDate[0])    
		tempDate = end.split("-")
		eDate = new Date(tempDate[1] + '-' + tempDate[2] + '-' + tempDate[0])
		
		// convert milliseconds into days
		daysCount = parseInt(Math.abs(eDate - sDate) / 1000 / 60 / 60 / 24)    
		if (eDate - sDate < 0) {
			alert("Start Date is after End Date, please select again!");
		} else {
			var r = confirm(daysCount + 1 + " day(s) will be added to schedule from " + start + " to " + end + "!");
			// store start date, end date, and days of plan as sDate, eDate, and daysOfPlan
			// using localStorage to help developers do the text without database.
			if (typeof(Storage) != "undefined") {
				// Check browser support
				var days = daysCount + 1;
				localStorage.setItem("sDate", sDate);
				localStorage.setItem("eDate", eDate);
				localStorage.setItem("daysOfPlan", days);
			} else {
				alert("Sorry, your browser does not support Web Storage...");
			}//END storage
		}
	} else {
		alert("Please ensure you have chosen Start Date and End Date!");
	}
}