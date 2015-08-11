// Globals
speed = "slow"

$(document).ready(
	function()
	{
		// Start Screen click
		/*
		$("#startScreen").click(
			function(event)
			{
				scrollToId("#" + $("section:first-of-type").attr("id"));
			}
		);
		*/

		// firstDownArrow click
		$("#firstDownArrow").click(
			function(event)
			{
				event.preventDefault();
				$("#firstDownArrow").addClass("firstDownArrowClick");
				// Allow time for awesome spinniness (rotateY(360deg))
				window.setTimeout(function()
				{
					scrollToId("#" + $("section:first-of-type").attr("id"),
						function()
						{
							// Unspin after the user scrolls down
							$("#firstDownArrow").removeClass("firstDownArrowClick");
						}
					);
				}, 500);
			}
		);
		
		// Main Nav scroll
		$("#mainNav > div > ul > li > a").click(
			function(event)
			{
				event.preventDefault();
				scrollToId($(this).attr("href"));
			}
		);

		// ScrollToFixed for mainNav
		$("#mainNav").scrollToFixed();
		// Only give shadow when hovering
		/*
		$(window).scroll(
			function()
			{
				if($("#mainNav").css("top") === "0px")
					$("#mainNav").css("box-shadow", "0 0 10px 0 #000000");
				else
					$("#mainNav").css("box-shadow", "none");
			}
		);
		*/

		// Highlight correct link in Navigation bar depending on vertical scroll
		$(window).scroll(
			function()
			{
				$("#mainNav > div > ul > li > a").each(
					function()
					{
						if($("#mainNav > div > ul > li > a").index(this) + 1 === Math.floor(window.scrollY / window.innerHeight))
							$(this).css("color", "#FFFFFF");
						else
							$(this).css("color", "");
					}
				);
			}
		);

		// Add boilerplate stuff to screens
		$("body > section").each(
			function()
			{
				// Anchor hashtags for headers (for linking)
				$(this).children("h2").wrapInner("<a href = '#" + $(this).attr("id") + "'></a>");

				// Overflow protection
				$(this).wrapInner("<div class = 'overflowProtector'></div>");

				// Overflowed indicator
				$(this).children(".overflowProtector").after("<div class = 'overflowed'><a href = '#' class = 'overflowed-left'>&#11013;</a><a href = '#' class = 'overflowed-right'>&#11013;</a></div>");
			}
		);

		// Anchor click
		$("body > section h2 a").click(
			function(event)
			{
				event.preventDefault();
				history.pushState(null, null, $(this).attr("href"));
				scrollToId($(this).attr("href"));
			}
		);

		// Check if screen overflowed on screen resize
		screenOverflowed();
		$(window).resize(
			function()
			{
				screenOverflowed();
			}
		);

		// Overflow click
		$("body > section > .overflowed > a").click(
			function(event)
			{
				event.preventDefault();
				var overflowProtector = $(this).parent().siblings(".overflowProtector");
				var clickedArrow = $(this)
				var columnGap = getColumnGap(overflowProtector);

				var modifier = ""
				if(clickedArrow.attr("class") === "overflowed-left")
					modifier = "-=";
				else if(clickedArrow.attr("class") === "overflowed-right")
					modifier = "+=";
				overflowProtector.animate(
					{
						scrollLeft: modifier + (overflowProtector.width() + columnGap)
					}, speed,
					function()
					{
						showCorrectArrows($(this).parent());
					}
				);
			}
		);
		
		// NavTriangle Canvas
		var canvas = document.getElementById("navTriangle");
		var g = canvas.getContext("2d");
		g.fillStyle = "#250000";
		g.moveTo(0,15);
		g.lineTo(50,15);
		g.lineTo(25,40);
		g.lineTo(50,65);
		g.lineTo(0,65);
		g.closePath();
		g.fill();
		g.fillStyle = "#330000";
		g.beginPath();
		g.moveTo(0,65);
		g.lineTo(15,50)
		g.lineTo(0,50);
		g.closePath();
		g.fill();
		g.fillStyle = "#440000";
		g.fillRect(0,0,15,50);
		
		// Up Arrow Nav
		$("#upArrow").click(
			function(event)
			{
				event.preventDefault();
				var screenHeight = window.innerHeight;
				$("html, body").animate(
					{
						scrollTop: "-=" + (window.scrollY % screenHeight + screenHeight)
					}, speed
				);
			}
		);
		
		// Down Arrow Nav
		$("#downArrow").click(
			function(event)
			{
				event.preventDefault();
				var screenHeight = window.innerHeight;
				$("html, body").animate(
					{
						scrollTop: "+=" + (window.scrollY % screenHeight + screenHeight)
					}, speed
				);
			}
		);
	}
);

// Scrolls to an id...
function scrollToId(id, callback)
{
	$("html, body").animate(
		{
			scrollTop: $(id).offset().top
		}, speed,
		function()
		{
			if(typeof callback !== "undefined")
			{
				callback();
			}
		}
	);
}

// Has one of the screens overflowed
function screenOverflowed()
{
	$("body > section").each(
		function()
		{
			if(isTextOverflowX($(this).children(".overflowProtector")))
			{
				$(this).children(".overflowed").css("display", "block");
				showCorrectArrows($(this));
			}
			else
			{
				$(this).children(".overflowed").css("display", "none");
				// Neatly reset
				$(this).children(".overflowed").children(".overflowed-left").css("display", "block");
				$(this).children(".overflowed").children(".overflowed-left").css("display", "block");
			}
		}
	);
}

// Detects if text is overflowing container (horizontal)
function isTextOverflowX(element)
{
	return element[0].scrollWidth > element.width();
}

// Detects if text is overflowing container (vertical)
function isTextOverflowY(element)
{
	return element[0].scrollHeight > element.height();
}

function showCorrectArrows(section)
{
	var overflowProtector = section.children(".overflowProtector");
	var overflowed = section.children(".overflowed");

	if(overflowProtector.scrollLeft() > 0)
		overflowed.children(".overflowed-left").fadeIn();
	else
		overflowed.children(".overflowed-left").fadeOut();
	if(overflowProtector.scrollLeft() == overflowProtector[0].scrollWidth - overflowProtector.outerWidth())
		overflowed.children(".overflowed-right").fadeOut();
	else
		overflowed.children(".overflowed-right").fadeIn();
}

function getColumnGap(element)
{
	var columnGap = "0";
	if(element.css("column-gap") !== null && element.css("column-gap") !== "")
		columnGap = element.css("column-gap");
	else if(element.css("-webkit-column-gap") !== null && element.css("-webkit-column-gap") !== "")
		columnGap = element.css("-webkit-column-gap");
	else if(element.css("-moz-column-gap") !== null && element.css("-moz-column-gap") !== "")
		columnGap = overflowProtector.css("-moz-column-gap");
	columnGap = parseInt(columnGap.replace(/[^-\d\.]/g, ''));
	return columnGap;
}