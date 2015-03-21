$(document).ready(function(){
    $("#toggle").click(function(){
        $("#hide").slideDown("slow");
        $("#search").val("");
    });
});

$(document).ready(function(){
	$(".clickable").click(function(){//click on the suggested search
		$("#hide").slideDown("slow");//show the search box
		$("#search").val($(this).text());//set the text in the search box
		$("#table").slideDown("slow");
		if( ($("#search").val()).length >= 3 ){
    		$("#table").show();
    		//$("#search").show();
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
    		//$("#search").show();
    	}
    	else{
    		$("#search").show();
    		$("#table").hide();
    	}
    });
});
