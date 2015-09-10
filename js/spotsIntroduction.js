$(document).ready(function() {
	var spotLat;
	var spotlng;
	var spotName;
	var spotIndex;

	$("#dayOneAdd").click(function() {
//		alert("clicked!");

		if (typeof(Storage) != "undefined") {
			// Check browser support
			spotLat = localStorage.getItem("spotsLat");
			spotlng = localStorage.getItem("spotsLng");
			spotName = localStorage.getItem("spotsName");
			var indexTem = localStorage.getItem("spotsIndexInDayOne");
			
			if (indexTem == null){
				spotIndex = 0;
			}else{
				spotIndex = indexTem;
			}
			
			//alert(spotLat);
			//alert(spotName);
			//alert(spotIndex);
			// Retrieve data
		} else {
			alert("Sorry, your browser does not support Web Storage...");
		}

		// add this spot into day1 in plan
		// store this spot's name, spotlat, and spotlng.
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

		// set inital traffic mode
		if (spotIndex == 0) {
			// do not need to consider the inital traffic mode
		} else {
			// need to consider the traffic mode
		}

//		if (typeof(Storage) != "undefined") {
//			// Check browser support
//			localStorage.setItem("spotsIndexInDayOne", spotIndex);
//			spotIndex++;
//			// Store data
//		} else {
//			alert("Sorry, your browser does not support Web Storage...");
//		}
	});
});