// WHEN start the js document, run the code from ready function
$(document).ready(function() {
	// CREATE GLOBAL VARIABLES
	var destinationlanI;
	var destinationlngI;
	//var destinationNameI;

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

	// Click whatever id belongs to melbourne, store melbourne's location
	// Call melbourneFunction() to store the data
	$("#melbourne1").on("click", melbourneFunction('melbourne'));
	$("#melbourne2").on("click", melbourneFunction('melbourne'));
	$("#melbourne3").on("click", melbourneFunction('melbourne'));

	// Click down arrow. If no destination is chosen, alert message is displayed.

}); //END ready function

//STORE melbourne's location, called by ready function
function melbourneFunction(i) {
		// CREATE GLOBAL VARIABLES
		var destinationNameI;
		return function() {
			//alert("Clicked with " + i);
			// set location of the selected destination
			/*destinationlanI = '-37.817454';
			destinationlngI = '144.967168';*/
			destinationNameI = i;
			//alert("Click: " + destinationNameI);

			// store those information of selected place
			// using localStorage to help developers do text.
			if (typeof(Storage) != "undefined") {
				// Check browser support
				/*localStorage.setItem("destinationLat", destinationlanI);
				//alert(destinationlanI);
				localStorage.setItem("destinationLng", destinationlngI);*/
				//alert(destinationlanI);
				// Store data
				localStorage.setItem("destinationName", destinationNameI);
				//alert(destinationNameI);
			} else {
				alert("undefined!!");
			}
		}

	} //END melbourneFunction function