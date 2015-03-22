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
		getPuns(sText, true)
	});
});

// Background images
$(document).ready(function(){
	var sw = $(window).innerWidth();
    var sh = $(window).innerHeight();
    var r = function() { return Math.random(); }
	$(".background").each(function(){
		var tempSize = r()*2.5;
		var pt = (r()*h*0.7).toString() + "px";
	    var pr = (r()*w*0.7).toString() + "px";

	    console.log(pt + " / " + pr)

	    var newBlurStr = "blur(" + (sw/50*tempSize).toString() + "px)";
	    var tempStr = (sw/8*tempSize).toString()+"px";

		$(this).rotate(r()*360);
	    $(this).css({
	    	"top": pt,
	    	"right": pr,
	    	"width": tempStr,
	    	"height": tempStr,
	    	"filter": newBlurStr,
	    	"-webkit-filter": newBlurStr
	    });
	});
});

// AJAX queries
var getPuns = function(word, unsafe) {

	// Hide old puns
	$("#results").empty();

	// Do request
	var req = new XMLHttpRequest();
	req.open("GET", "http://localhost:4567/puns/" + word + (unsafe ? "/unsafe" : ""), true);
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

var getDomains = function(phrase) {

	// Clean up phrase
	phrase = phrase.toLowerCase().replace(/\W+/g, "");

	// Do request
	var req = new XMLHttpRequest();
	req.open("GET", "http://localhost:4567/domains/" + phrase, true);
	req.onload = function() {

		// Check for available domains
		var domains = JSON.parse(req.response)["result"];
		console.log(domains)
		for (var i = 0; i < domains.length; i++) {
			getAvailable(domains[i], $(".pun.expanded"));
		}
	};
	req.send(null);
}

// Check whether a domain is available
var getAvailable = function(domain, root) {

	// Do request
	var req = new XMLHttpRequest();
	req.open("GET", "http://localhost:4567/whois/" + domain, true);
	req.onload = function() {

		// Check for available domains
		var res = req.response;
		console.log(res)
	};
	req.send(null);

	//root.append("<p class='pun-domain'>" + domains[i] + "</p>");
}
