'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	console.log("load");
	$('#instagramBtn').click(instagramLogin);
	$('#facebookBtn').click(facebookLogin);
	$.get("/instagram_photos",getInstagramPic);
})

function getInstagramPic(result) {
	if (!result) {
		$('#instagramPart').hide();
		$('#instagramLogin').show();
	} else {
		$('#instagramLogin').hide();
		$('#instagramPart').show();
		var photos = result['photos'];
		photos.forEach(function(photo){
			var pic = "<img src='"+photo.url+"' class='img-responsive' class='img hashtag-img'><br>";
			$(pic).appendTo('#instagramPart');
		});
	}
}

function instagramLogin(e) {
    e.preventDefault();
    console.log('123');
    window.location = "/auth/instagram";
} 

function facebookLogin(e) {
    e.preventDefault();
    window.location = "/auth/facebook";
} 