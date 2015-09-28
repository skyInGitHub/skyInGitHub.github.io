// CREATE GLOBALE VARIABLES
// type of places
// the id of type
// the inital map's location (melbourne)
var map, service;
var infowindow;
var categoryType; 
//var resultString = "";
var categoryId; 
var pyrmont = {
	lat: -37.817454,
	lng: 144.967168
};

// ONCE one of four buttons is clicked, call click_show function with corresponding type id.
// Click, if there is no corresponding list of places' names, show.
// Click, if there is corresponding list of places' names, hide.
function click_show(id) {
	// get the id from the button clicked by the user.
	categoryId = id;

	// define the type of place by developers regarding the id.
	switch (categoryId) {
		case "History":
			categoryType = "museum";
			break;
		case 'Shopping':
			categoryType = "jewelry_store";
			break;
		case "Entertainment":
			categoryType = "cafe";
			break;
		case 'Nature':
			categoryType = "park";
			break;
		default:
			break;
	}

	// click one shown, click again none
	// when click to show, call the function findMap() with initail location.
	// when click to hide, clear the list of corresponding list to avoid the repitition from the next click and show.
	var ulelement = document.getElementById(categoryId);
	if (ulelement.style.display == 'block') {
		var list = document.getElementById(id);
		while (list.hasChildNodes()) {
			list.removeChild(list.childNodes[0]);
		}
		ulelement.style.display = 'none';
	} else {
		findMap(pyrmont);
		ulelement.style.display = 'block';
	}
} //END click_show(id) function

//CALL findMap function by click_show(id) function
function findMap(pyrmont) {
	/*initial is Melbourne(226 Flinders St;Melbourne VIC 3000;-37.817454, 144.967168)
	// destinationLatLng
	var pyrmont = {
		lat: -37.817454,
		lng: 144.967168
	};*/

	// store the map information with center location and zoom size to the global variable 'map'.
	map = new google.maps.Map(document.getElementById('map'), {
		center: pyrmont,
		zoom: 16
	});

	// store the window's information from google map api.
	infowindow = new google.maps.InfoWindow();

	// get the service from google place api.
	// call the nearbySearch with initial location and range with radius and selected places' type.
	service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: pyrmont,
		radius: 500,
		// change type of arrounding.
		types: [categoryType]
	}, callback); // callback information is called
} //END findMap(pyrmont) function

//CALL the callback function with selected
function callback(results, status) {
	// if the place service is allowed to use for us.
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		// get the corresponding ul list tag
		var ul = document.getElementById(categoryId);
		// add title to block
		var ulTitle = categoryId;
		var liTitle = document.createElement("label");
		liTitle.innerHTML = ulTitle;
		ul.appendChild(liTitle);
		
		// create arrays to store those places' information that might be used in other page.
		var icons = [];
		var phones = [];
		var addresses = [];
		var websites = [];

		// loop all the places belonged to this type
		for (var i = 0; i < results.length; i++) {
			// create the marker for this place in the map, call createMarker() function
			createMarker(results[i]);

			// request the get places' details.
			// store them into the arrays create before
			var place = results[i];
			service.getDetails({
					placeId: place.place_id
				},
				function(place) {
//					if (statu !== google.maps.places.PlacesServiceStatus.OK) {
//						return;
//					}
					//var phs = place.photos[0];
					//var src = phs.getUrl({'maxWidth': 10, 'maxHeight': 10});
					icons.push(place.icon);
					phones.push(place.formatted_phone_number);
					addresses.push(place.formatted_address);
					websites.push(place.website);
				});

			// create the li element and then append to the ul element got above as one of its childnote.
			// name attribute of this li element has the value of this place's name
			// value attribute of this li element has the value of this place's index of all places in this type
			var li = document.createElement("li");
			li.name = results[i].name;
			li.value = i;

			// set the introduction link for each places in this li element.
			// instead of following code, the commended code is not working.
			/*var a = document.createElement("a");
			a.setAttribute('href', "spotsIntroduction.html");
			a.innerHTML = results[i].name;*/
			li.innerHTML = results[i].name.link("spotsIntroduction.html");
			
			// add click listener for each places.
			// if this element is clicked. Not only is the introduction page linked, but also some information is stored
			li.addEventListener("click", function() {
				//alert("clicked!");
				// get the index of this place according to all this type of places
				var i = this.value;
				var name = this.name;
				//alert("index is " + i);
				//alert("name is " + name);
				
				// get the longtitude of clicked place
				// get the latitude of clicked place
				// get the icon, phone number, the string of address and the website of clicked place.
				var lanI = results[i].geometry.location.lat();
				var lngI = results[i].geometry.location.lng();
				var iconI = icons[i];
				var phoneI = phones[i];
				var addressI = addresses[i];
				var websiteI = websites[i];
				//alert("Latitude: "+results[i].geometry.location.lat());
				//alert("Longitude: "+results[i].geometry.location.lng());

				// store those information of selected place
				// using localStorage to help developers do text.
				if (typeof(Storage) != "undefined") {
					// Check browser support
					localStorage.setItem("spotsLat", lanI);
					//alert(lanI);
					localStorage.setItem("spotsLng", lngI);
					//alert(lngI);
					localStorage.setItem("spotsName", name);
					//alert(name);
					localStorage.setItem("spotsIcon", iconI);
					//alert(iconI);
					localStorage.setItem("spotsPhone", phoneI);
					//alert(phoneI);
					localStorage.setItem("spotsAddress", addressI);
					//alert(addressI);
					localStorage.setItem("spotsWebsite", websiteI);
					//alert(websiteI);
					// Store data
				} else {
					alert("undefined!!");
				}
			}); // end click listener function
			// append this li element to the corresponding ul element.
			ul.appendChild(li);
		}// end loop
	}
} //END callback(result, status) function

//CALL createMarker(place) to create markers by callback function
function createMarker(place) {
	// get the location of the place
	var placeLoc = place.geometry.location;
	// create the structure of marker
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

	// add marker click listener: click marker, show the its name of place.
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
}