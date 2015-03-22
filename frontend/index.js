$(document).ready(function(){
    $("#toggle").click(function(){
    	$("#toggle").fadeOut("slow", function(){
	        $("#input").fadeIn("slow");
	        $("#search").val("").focus();
	    });
    });
});

// Manual puns
$(document).ready(function(){
	$("#input").on("keyup keypress keydown click", function(){
    	$("#table").show();
    });
});

// Suggested puns
$(document).ready(function(){
	$(".suggestion").click(function(){//click on the suggested search
		
		// UI
		var sText = $(this).text();
		$("#toggle").fadeOut("slow", function(){
	        $("#input").fadeIn("slow");
	        console.log(sText);
	        $("#search").val(sText);
	    });
		$("#table").show().slideDown("slow");

		// Pun queries
		var unsafe = $("#profanity").prop("checked");
		getPuns(sText, unsafe)
	});
});

// Background images
$(document).ready(function(){
	var sw = $(window).innerWidth();
    var sh = $(window).innerHeight();
    var r = function() { return Math.random(); }
	$(".back-img").each(function(){
		var img = $(this);
		/* setInterval(function(){
			var tempSize = r()*2.5;
			var pt = (r()*sh*0.7).toString() + "px";
		    var pr = (r()*sw*0.7).toString() + "px";

			var newBlurStr = "blur(" + (sw/70*tempSize).toString() + "px)";		    
		    var tempStr = (sw/8*tempSize).toString()+"px";

			// Move
		    $(img).css("top", pt);
		    $(img).css("right", pr);
		    $(img).css("width", tempStr);
		    $(img).css("height", tempStr);
		    $(img).css("filter", newBlurStr);
		    $(img).css("-webkit-filter", newBlurStr);

		    // Fade
		}, 1000); */
	});
});

// Pun query
var getPuns = function(word, unsafe) {

	// Hide old puns
	$("#results").empty();

	// Do request
	var req = new XMLHttpRequest();
	req.open("GET", "http://dankna.me/puns/" + word + (unsafe ? "/unsafe" : ""), true);
	req.onload = function() {
		var puns = JSON.parse(req.response)["result"];

		// Append puns to results list
		for (var i = 0; i < puns.length; i++) {
			$("#results").append("<p class='pun'>" + puns[i] + "</p>");
		}

		// Construct expandos
		$(".pun").on("click", function() {

			// UI
			$(".pun").not(this).removeClass("expanded");
			$(".pun-domain").remove();
			$(this).toggleClass("expanded");

			// Domain request
			if ($(this).hasClass("expanded"))
				getDomains($(this).text());
		});
	};
	req.send(null);
}

// Domain query
var getDomains = function(phrase) {

	// Clean up phrase
	phrase = phrase.toLowerCase().replace(/\W+/g, "");

	// Do request
	var req = new XMLHttpRequest();
	req.open("GET", "http://dankna.me/domains/" + phrase, true);
	req.onload = function() {

		// Check for available domains
		var domains = JSON.parse(req.response)["result"];
		var domain;
		$(".pun.expanded").empty();
		for (var i = 0; i < domains.length; i++) {
			ncDomain = domains[i].replace(/\/.+/g, "");
			$(".pun.expanded").append(
				"<p class='pun-domain'>" +
					"<a href='http://namecheap.com/domains/registration/results.aspx?domain=" + 
						ncDomain +
					"'>" + domains[i] + "</a>" +
				"</p>");
		}
		if (domains.length === 0) {
			$(".pun.expanded").append("<p class='pun-error'>No domains available.</p>");
		}
		$(".pun-busy").remove()
	};
	$(".pun.expanded").append("<p class='pun-busy'>Querying...</p>")
	req.send(null);
}

// Typeahead ("manual") queries
var typeaheadTimer;
$(document).ready(function(){
	$("#search").on("keydown", function(){
		clearTimeout(typeaheadTimer);
		typeaheadTimer = setTimeout(function(){
			var unsafe = $("#profanity").prop("checked")
			getPuns($("#search").val(), unsafe);
		}, 400);
	});
});
