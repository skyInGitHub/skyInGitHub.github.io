// WHEN start the js document, run the code from ready function
$(document).ready(function() {
	// CREATE GLOBAL VARIABLES
	var dayOneSpotsName;
	var dayOneSpotsIndex;
	var dayOneSpotsStartDate;
	var dayOneSpotsEndDate;
	var dayOneSpotsDays;

	// get all stored information of this place/spot
	// using localStorage to help developers do text.
	if (typeof(Storage) != "undefined") {
		// Check browser support
		dayOneSpotsStartDate = localStorage.getItem("sDate");
		dayOneSpotsEndDate = localStorage.getItem("eDate");
		dayOneSpotsDays = localStorage.getItem("daysOfPlan");
		// check if start date or end date is empty or not. 
		// if empty, send alert message
		// if not, fill the start date, end date and days of plan into corresponding tags.
		if (dayOneSpotsStartDate == null || dayOneSpotsEndDate == null || dayOneSpotsDays == null) {
			alert("start date or end date is empty");
		} else {
			$("#startDate").append(document.createTextNode(dayOneSpotsStartDate));
			$("#endDate").append(document.createTextNode(dayOneSpotsEndDate));
			$("#daysPlan").append(document.createTextNode(dayOneSpotsDays));
		}

		// get the index of spots selected in that day.
		dayOneSpotsIndex = localStorage.getItem("spotsIndexInDayOne");
		//alert("dayOne is" + dayOneSpotsIndex);
		
		// loop the selected spots of that day.
		// fill the corresponding name into the name's block.
		for (var i = 0; i < dayOneSpotsIndex; i++) {
			dayOneSpotsName = localStorage.getItem("spotsNameInDayOne_" + i);
			//alert(dayOneSpotsName);
			var num = i + 1;
			/*$("<p>'dayOneSpotsName'</p>").appendTo( "#dayOnePlan" );*/
			$("<p></p>", {
				text: num + "." + dayOneSpotsName,
			}).appendTo("#dayOnePlan");
		}

		// Retrieve data
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	} // end getting information
	
}); //END ready function