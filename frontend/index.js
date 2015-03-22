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
	req.open("GET", "http://localhost:4567/puns/" + word + "/unsafe", true);
	req.onload = function() {
		var puns = JSON.parse(req.response)["result"];

		// Append puns to results list
		for (var i = 0; i < puns.length; i++) {
			$("#results").append("<p class='pun'>" + puns[i] + "</p>");
		}

		// Construct expandos
		$(".pun").each(function() {
			$(this).append("<div class='pun-expando'></div>");
		});
		$(".pun").on("click", function() {
			$(".pun").removeClass("expanded");
			$(this).toggleClass("expanded");
		});
	};
	req.send(null);
}

var getDomains = function(phrase) {

}

var getAvailable = function(domain) {

}
