'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	$('#instagramBtn').click(instagramLogin);
	$('#facebookBtn').click(facebookLogin);
})

function instagramLogin(e) {
    e.preventDefault();
    window.location = "/auth/instagram";
} 

function facebookLogin(e) {
    e.preventDefault();
    window.location = "/auth/facebook";
} 