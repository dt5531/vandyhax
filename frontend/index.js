$(document).ready(function(){
    $("#toggle").click(function(){
    	$("#search").val("");
    	$("#toggle").hide();
    	$("#table").hide();
        $("#hide").slideDown("slow");
        $("#search").focus();
    });
});

$(document).ready(function(){
	$(".suggestion").click(function(){//click on the suggested search
		$("#hide").slideDown("slow");//show the search box
		$("#toggle").slideUp("slow");
		$("#search").val($(this).text());//set the text in the search box
		$("#table").slideDown("slow");
		if( ($("#search").val()).length >= 3 ){
    		$("#table").show();
    	}
    	else{
    		$("#search").show();
    		$("#table").hide();
    	}
	});
});
$(document).ready(function(){
	$("#hide").on("keyup keypress keydown click", function(){
    	if( ($("#search").val()).length >= 3 ){
    		$("#table").show();
    	}
    	else{
    		$("#search").show();
    		$("#table").hide();
    	}
    });
});

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
	    	"-webkit-filter": newBlurStr,
	    });
	});
});
