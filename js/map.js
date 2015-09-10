var map;

// for navigation
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
//Store for spots names
var spots=new Array();	

// initialize
function initialize() {
  var mapOptions = {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  //new direction service
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

  //new transit layer
  var transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);
  
  var dayOneSpotsName;
  var dayOneSpotsIndex;
  var plan = document.getElementById('plan_panel');
  plan.innerHTML = '';
  
  if (typeof(Storage) != "undefined") {
  	// Check browser support
  	dayOneSpotsIndex = localStorage.getItem("spotsIndexInDayOne");
  	for (var i=0; i<dayOneSpotsIndex; i++){
  		dayOneSpotsName = localStorage.getItem("spotsNameInDayOne_" + i);
  		var num = i+1;
  		plan.innerHTML+= num+'. '+String.fromCharCode(65 + (i % 26)) + ')' + dayOneSpotsName+'<br>';
  		spots[i]=dayOneSpotsName;
  	} 
  }
  	else {
  		alert("Sorry, your browser does not support Web Storage...");
  	}
}

// Retrieve the start and end locations and create
  // a DirectionsRequest using DRIVING directions.
function calcRoute() {
	var dayOneSpotsIndex;
	var dayOneSpotsLat;
	var dayOneSpotsLng;
	// store for the number of dayOneSpotsIndex-1
	var temp;
	var start;
	var end;
	var mode;
	// store for temp spot while pushing to waypoints
	var tempSpot;
	// store for waypoints
	var waypts = [];
	// get selected mode
	var selectedMode = document.getElementById('mode').value;
	
	if (typeof(Storage) != "undefined") {
		// Check browser support
		dayOneSpotsIndex = localStorage.getItem("spotsIndexInDayOne");
		
		// if there are less than 2 destinations
		if(dayOneSpotsIndex<2){
			alert("There is no route! Less than 2 destinations!");
		}
		// if there are 2 destinations, set start and end
		else if(dayOneSpotsIndex==2){
			start=new google.maps.LatLng(localStorage.getItem(("spotsLatInDayOne_0")), localStorage.getItem(("spotsLngInDayOne_0")));
			end=new google.maps.LatLng(localStorage.getItem(("spotsLatInDayOne_1")), localStorage.getItem(("spotsLngInDayOne_1")));
		}
		// if there are more than 2 destinations, set start, end and waypoints
		else{
			for (var i=0; i<dayOneSpotsIndex; i++){
				if(i==0){
					start=new google.maps.LatLng(localStorage.getItem(("spotsLatInDayOne_0")), localStorage.getItem(("spotsLngInDayOne_0")));
				}
				else if(i==dayOneSpotsIndex-1){
					temp=dayOneSpotsIndex-1;
					end=new google.maps.LatLng(localStorage.getItem(("spotsLatInDayOne_"+temp)), localStorage.getItem(("spotsLngInDayOne_"+temp)));
				}
				else{
					dayOneSpotsLat=localStorage.getItem("spotsLatInDayOne_" + i);
					dayOneSpotsLng=localStorage.getItem("spotsLngInDayOne_" + i);
					tempSpot=new google.maps.LatLng(dayOneSpotsLat, dayOneSpotsLng);
					waypts.push({
						location:tempSpot,
						stopover:true
					});
				}
				
			}
		}
		
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	}
	
	mode = google.maps.TravelMode[selectedMode];
	
	var request = {
		origin:start,
		destination:end,
		// added for waypoints which are destinations except start and end
		waypoints: waypts,
		// mode for the whole tour
		travelMode: mode
	};
	directionsService.route(request, callBack);
}


function callBack(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);	
	  //added for waypoints
	  var route = response.routes[0];
      var summaryPanel = document.getElementById('directions_panel');
      summaryPanel.innerHTML = '';
		
	  //directionsDisplay.setDirections(response);
	  // For each route, display summary information.
	  for (var i = 0; i < route.legs.length; i++) {
		var routeSegment = i + 1;
		summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
		summaryPanel.innerHTML += 'From: ' + spots[i] + '<br>';
		summaryPanel.innerHTML += 'To: ' + spots[i+1] + '<br>';
		summaryPanel.innerHTML += 'Distance: ' + route.legs[i].distance.text + '<br>';	
		summaryPanel.innerHTML += 'Duration: ' + route.legs[i].duration.text + '<br><br>';					
	  } 
    } 
    else{
		alert(status);
    }
} //end of function

  
google.maps.event.addDomListener(window, 'load', initialize);