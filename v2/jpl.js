var home;
var latest;
var about;

function hash()
{
	if(location.hash === "#home" || location.hash == "")
	{
		if (latest.style.display != "none")
			$(latest).fadeOut("fast", function() { $(home).fadeIn("fast"); } );
		else if (about.style.display != "none")
			$(about).fadeOut("fast", function() { $(home).fadeIn("fast"); } );
		else
			$(home).fadeIn("fast");
	}
	else if(location.hash === "#latest")
	{
		if (home.style.display != "none")
			$(home).fadeOut("fast", function() { $(latest).fadeIn("fast"); } );
		else if (about.style.display != "none")
			$(about).fadeOut("fast", function() { $(latest).fadeIn("fast"); } );
		else
			$(latest).fadeIn("fast");
	}
	else if(location.hash === "#about")
	{
		if (home.style.display != "none")
			$(home).fadeOut("fast", function() { $(about).fadeIn("fast"); } );
		else if (latest.style.display != "none")
			$(latest).fadeOut("fast", function() { $(about).fadeIn("fast"); } );
		else
			$(about).fadeIn("fast");
	}
}

function doFirst()
{	
	$("#slideshow").cycle("fade");
	home = document.getElementById("homeSection");
	latest = document.getElementById("latestSection");
	about = document.getElementById("aboutSection");
	
	home.style.display = "none";
	latest.style.display = "none";
	about.style.display = "none";
	
	hash();
}

window.addEventListener("hashchange", hash, false);
$(document).ready(doFirst);