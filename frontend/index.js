(function() {

  var base_url = "http://dankna.me";

  var safe_pun_url = base_url + "/puns/{1}";
  var unsafe_pun_url = base_url + "/puns/{1}/unsafe";
  var pun_url = safe_pun_url;

  var domain_url = base_url + "/domains/{1}";

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
    $(".clickable").click(function(){//click on the suggested search
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
      $search = $("#search");
      if( ($search.val()).length >= 3 ){
        var search_text = $search.val();
        var query_url = pun_url.replace("{1}", search_text);

        // query data
        $.get(query_url, function(data) {
          var puns = data['result'];
          console.log(puns);
        }, "json");

        $("#table").show();
      }
      else{
        $("#search").show();
        $("#table").hide();
      }
    });
  });

  $(document).ready(function(){
    var w = $(window).innerWidth();
    var h = $(window).innerHeight();
    $(".background").each(function(){
      var tempSize = Math.random()*2.5;
      var t = Math.random() * h*0.70;
      var r = Math.random() * w*0.70;
      var newBlur = w/50*tempSize;
      var newBlurStr = newBlur.toString() + "px";
      $(this).rotate(Math.random()*360);
      $(this).css({
        "top": t.toString()+"px",
        "right": r.toString()+"px",
        "position": "fixed",
        "width": (w/8*tempSize).toString()+"px",
        "height": (w/8*tempSize).toString()+"px",
        "background-size": "100%, 100%",
        "filter": "blur(" + newBlurStr + ")",
        "-webkit-filter": "blur(" + newBlurStr + ")",
      });
    });
  });

})();
