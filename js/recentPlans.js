$(document).ready(function() {
	var dayOneSpotsName;
	var dayOneSpotsIndex;
	
	if (typeof(Storage) != "undefined") {
		// Check browser support
		dayOneSpotsIndex = localStorage.getItem("spotsIndexInDayOne");
//		alert("dayOne is" + dayOneSpotsIndex);
		
		for (var i=0; i<dayOneSpotsIndex; i++){
			dayOneSpotsName = localStorage.getItem("spotsNameInDayOne_" + i);
//			alert(dayOneSpotsName);
			var num = i+1;
//			$("<p>'dayOneSpotsName'</p>").appendTo( "#dayOnePlan" );
			$("<p></p>", {
				text: num + "." + dayOneSpotsName,
			}).appendTo("#dayOnePlan");
		}
		
		// Retrieve data
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	}
});
