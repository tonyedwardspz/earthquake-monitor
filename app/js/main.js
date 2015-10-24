var earthQuakes = [];

$(document).ready(function(){

});

var populateUI = function(data) {

  $(jQuery.parseJSON(data)).each(function() {
    earthQuakes.push(new Earthquake(this));
  });
  earthQuakes.pop();

  displayLargestQuake();
  displayData();
};

var displayLargestQuake = function(){
  var largestYet = Earthquake.getLargestQuake(earthQuakes);
  $("#largestQuake").append("BIGGEST RECENT QUAKE: " + largestYet.getDescription());
};

var displayData = function(){
  for(var i = 0; i < earthQuakes.length; i++) {
    $("#output").append(earthQuakes[i].getDescription() + '<br />');
  }
};
