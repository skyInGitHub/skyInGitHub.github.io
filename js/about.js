//makes the picture show above and text behind the picture
$('#thumbs img').click(function() {
	$('#largeImage').attr('src', $(this).attr('src').replace('thumb', 'large'));
	$('#description').html($(this).attr('alt'));
});
//reference:http://api.jquery.com/delegate/
//delegate method is added into jQurey 1.4.2
$('#thumbs').delegate('img','click', function(){
    $('#largeImage').attr('src',$(this).attr('src').replace('thumb','large'));
    $('#description').html($(this).attr('alt'));
});