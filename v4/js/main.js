$(document).ready(function() {
	var scrollingSpeed = 600;
	var revealSpeed = 200;

	// SiteHeaderNav Links
	$(".mainSection a, #siteHeaderNav a").click(function(e) {
        if(!$(this).attr("href").startsWith("#")) {
            return;
        }
        e.preventDefault();
        scrollToId($(this).attr("href"), scrollingSpeed);
	});

	// ToTop Arrow
	if($(document).scrollTop() < $("#siteHeader").height()) {
		$("#toTop").hide();
	}
	$(window).scroll(function(e) {
		if($(document).scrollTop() >= $("#siteHeader").height()) {
			$("#toTop").fadeIn("slow");
		}
		else {
			$("#toTop").fadeOut("slow");
		}
	});
	$("#toTop a").click(function(e) {
		e.preventDefault();
		scrollToNumber(0, scrollingSpeed);
	});
});

function scrollToId(id, speed, callback) {
	scrollToNumber($(id).offset().top, speed, callback);
}

function scrollToNumber(number, speed, callback) {
	$("html, body").animate({
		scrollTop: number
	}, speed, function() {
		if(callback !== undefined) {
			callback();
		}
	});
}
