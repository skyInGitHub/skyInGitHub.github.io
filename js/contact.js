//if it is not run in the smartphone, present an alert.
$(document).ready(function() {
	if (!navigator.userAgent.match(/(iPhone|Android)/)) {
		$('a.phonelink').click(function(e) {
			alert("Not a smartphone and no phone call.");
			e.preventDefault();
		});
	}
});