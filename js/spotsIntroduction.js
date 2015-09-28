// WHEN start the js document, run the code from ready function
$(document).ready(function() {
	// CREATE GLOBAL VARIABLES
	var spotLat;
	var spotlng;
	var spotName;
	var spotIndex;
	var spotIcon;
	var spotPhone;
	var spotAddress;
	var spotWebsite;

	// get all stored information of this place/spot
	// using localStorage to help developers do text.
	if (typeof(Storage) != "undefined") {
		// Check browser support
		spotLat = localStorage.getItem("spotsLat");
		spotlng = localStorage.getItem("spotsLng");
		spotName = localStorage.getItem("spotsName");
		spotIcon = localStorage.getItem("spotsIcon");
		spotPhone = localStorage.getItem("spotsPhone");
		spotAddress = localStorage.getItem("spotsAddress");
		spotWebsite = localStorage.getItem("spotsWebsite");
		var indexTem = localStorage.getItem("spotsIndexInDayOne");

		if (indexTem == null) {
			spotIndex = 0;
		} else {
			spotIndex = indexTem;
		}
		//alert(spotLat);
		//alert(spotName);
		//alert(spotIndex);

		// Retrieve data
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	} // end getting storage

	// Display the elements in this introduction page
	// display name and icon in this page
	$("#icon").attr("src", spotIcon);
	$("#name").append(document.createTextNode("Place Name is: " + spotName));
	// if the spot has website, show in the page. if not show none message.
	if (spotPhone != "undefined") {
		$("#phone").append(document.createTextNode("Phone Number is: " + spotPhone));
	} else {
		$("#phone").append(document.createTextNode("Phone Number is not provided for this place "));
	}
	// if the spot has phone number, show in the page. if not show none message.
	if (spotWebsite != "undefined") {
		$("#website").append("Its Website is: <a id='webA'>" + spotWebsite + "</a>");
		$("#webA").attr("href", spotWebsite);
	} else {
		$("#website").append(document.createTextNode("Website is not provided for this place."));
	}


	// Click DayOne to pass the data: lat, lng, name and indedx to recentPlans and maps using localStorage
	$("#dayOneAdd").click(function() {
		//alert("clicked!");

		// add this spot into day1 in plan
		// store this spot's name, longtitude and latitude as spotName, spotlat, and spotlng.
		// using localStorage to help developers do text.
		if (typeof(Storage) != "undefined") {
			// Check browser support
			localStorage.setItem("spotsLatInDayOne_" + spotIndex, spotLat);
			localStorage.setItem("spotsLngInDayOne_" + spotIndex, spotlng);
			localStorage.setItem("spotsNameInDayOne_" + spotIndex, spotName);
			spotIndex++;
			localStorage.setItem("spotsIndexInDayOne", spotIndex);
			// Store data
		} else {
			alert("Sorry, your browser does not support Web Storage...");
		}

		// Set inital traffic mode
		if (spotIndex == 0) {
			// do not need to consider the inital traffic mode
		} else {
			// need to consider the traffic mode
		}

		/*if (typeof(Storage) != "undefined") {
			// Check browser support
			localStorage.setItem("spotsIndexInDayOne", spotIndex);
			spotIndex++;
			// Store data
		} else {
			alert("Sorry, your browser does not support Web Storage...");
		}*/
	}); // end clicking 'add to day one'
	
}); //END ready function