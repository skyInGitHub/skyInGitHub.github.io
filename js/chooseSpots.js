var map;
var infowindow;
var categoryType;
var resultString = "";
//var categoryName;
var categoryId;
var pyrmont = {
	lat: -37.817454,
	lng: 144.967168
};

function click_show(id) {
	categoryId = id;

//	categoryName = document.getElementById(categoryId).innerHTML;

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

	//	initMap();	
//	findMap(pyrmont);

	// click one shown, click again none
	var ulelement = document.getElementById(categoryId);
	if (ulelement.style.display == 'block') {
		var list = document.getElementById(id);
		//categoryName = list.innerHTML;
		while (list.hasChildNodes()) {
			list.removeChild(list.childNodes[0]);
		}
		ulelement.style.display = 'none';
	} else {
		findMap(pyrmont);
		ulelement.style.display = 'block';
	}
}


function findMap(pyrmont) {
	// initial is Melbourne(226 Flinders St;Melbourne VIC 3000;-37.817454, 144.967168)
	// destinationLatLng
	//	var pyrmont = {
	//		lat: -37.817454,
	//		lng: 144.967168
	//	};

	map = new google.maps.Map(document.getElementById('map'), {
		center: pyrmont,
		zoom: 16
	});

	infowindow = new google.maps.InfoWindow();

	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: pyrmont,
		radius: 500,
		// change type of arrounding.
		types: [categoryType]
	}, callback);
}

function callback(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		var ul = document.getElementById(categoryId);
		// add title to block
		var ulTitle = categoryId;
		var liTitle = document.createElement("label");
		liTitle.innerHTML = ulTitle;
		ul.appendChild(liTitle);

		for (var i = 0; i < results.length; i++) {
			createMarker(results[i]);

			var li = document.createElement("li");
			li.name = results[i].name;
//			li.id = "myList";

			//			var a = document.createElement("a");
			//			a.setAttribute('href', "spotsIntroduction.html");
			//			a.innerHTML = results[i].name;
			li.innerHTML = results[i].name.link("spotsIntroduction.html");
			ul.appendChild(li);

			li.addEventListener("click", function() {
				var name = this.name;
				var lanI = results[0].geometry.location.lat();
				var lngI = results[0].geometry.location.lng();
				//				alert("Latitude: "+results[0].geometry.location.lat());
				//    			alert("Longitude: "+results[0].geometry.location.lng());
				if (typeof(Storage) != "undefined") {
					// Check browser support
					localStorage.setItem("spotsLat", lanI);
					//alert(lanI);
					localStorage.setItem("spotsLng", lngI);
					//alert(lngI);
					localStorage.setItem("spotsName", name);
					//alert(name);
					// Store data
				} else {
					alert("undefined!!");
				}
			});
			//			resultString = results[i].name + "<br/>" + resultString;
		}
		//		document.getElementById(categoryId).innerHTML = resultString;
	}
}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
}