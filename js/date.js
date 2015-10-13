function countDay() {
	// Clear data that stored before
	if (typeof(Storage) != "undefined") {
		// Check browser support
		localStorage.removeItem("spotsLat");
		localStorage.removeItem("spotsLng");
		/*localStorage.removeItem("destinationLat");
		localStorage.removeItem("destinationLng");*/
		localStorage.removeItem("destinationName");
		localStorage.removeItem("spotsName");
		localStorage.removeItem("spotsIcon");
		localStorage.removeItem("spotsPhone");
		localStorage.removeItem("spotsAddress");
		localStorage.removeItem("spotsWebsite");
		var max = localStorage.getItem("spotsIndexInDayOne");
		for (var i = 0; i <= max; i++) {
			localStorage.removeItem("spotsLatInDayOne_" + i);
			localStorage.removeItem("spotsLngInDayOne_" + i);
			localStorage.removeItem("spotsNameInDayOne_" + i);
		}
		localStorage.removeItem("spotsIndexInDayOne");
		localStorage.removeItem("sDate");
		localStorage.removeItem("eDate");
		localStorage.removeItem("daysOfPlan");
		// Store data
	} else {
		alert("Storage is undefined");
	}
	
	// Store for the value of start date
	var start;
	// Store for the Date object of start date
	var sDate;
	
	var tempDate;
	// Get the value of the chosen date
	start = document.getElementById("startDate").value;

	if (start.length != 0) {
		tempDate = start.split("-")
		// change into month-day-year format
		sDate = new Date(tempDate[1] + '-' + tempDate[2] + '-' + tempDate[0])    
		
		var r = confirm("You have chose " + start + "!");
		// store start date
		// using localStorage to help developers do the text without database.
		if (typeof(Storage) != "undefined") {
			// Check browser support
			localStorage.setItem("sDate", sDate);
		} else {
			alert("Sorry, your browser does not support Web Storage...");
		}//END storage
		
	} else {
		alert("Please ensure you have chosen a date!");
	}
}