'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	console.log("load");
	$('#instagramBtn').click(instagramLogin);
	$('#facebookBtn').click(facebookLogin);
	$.get("/instagram_photos",getInstagramPic);
	$.get("/facebook_albums",getFacebookAlbums);
})

var instagram_likes;
var instagram_posts;
var facebook_likes;
var facebook_posts;

function getInstagramPic(result) {
	if (!result) {
		$('#instagramPart').hide();
		$('#instagramLogin').show();
	} else {
		$('#instagramLogin').hide();
		$('#instagramPart').show();
		var photos = result['photos'];
		instagram_likes = 0;
		instagram_posts = 0;
		photos.forEach(function(photo){
			var pic = "<img src='"+photo.url+"' class='post_img'><br><br>";
			$(pic).appendTo('#instagramPart');
			$.post('/instagram_like',{photo:photo.id},getInstagramLike);
		});
	}
}

function getInstagramLike(result) {
	instagram_likes = instagram_likes + result;
	instagram_posts = instagram_posts + 1;
	$("#instagramLike").html(""+instagram_likes);
	$("#instagramPost").html(""+instagram_posts);
}

function getFacebookAlbums(result) {
	if (!result) {
		$('#facebookPart').hide();
		$('#facebookLogin').show();
	} else {
		$('#facebookLogin').hide();
		$('#facebookPart').show();
		facebook_posts = 0;
		facebook_likes = 0;
		for (var i = 0; i < result.length; i++) {
			$.post("/facebook_photo",{album: result[i].id},getFacebookPic);
		}
	}
}

function getFacebookPic(result) {
	for (var i = 0; i < result.length; i++) {
		var photos = result[i];
		var pic = "<img src='"+photos.images[0].source+"' class='post_img'><br><br>";
		$(pic).appendTo('#facebookPart');
		$.post("/facebook_like",{photo: photos.id},getFacebookLike);
	}
}

function getFacebookLike(result) {
	facebook_likes = facebook_likes + result;
	facebook_posts = facebook_posts + 1;
	$("#facebookLike").html(""+facebook_likes);
	$("#facebookPost").html(""+facebook_posts);
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