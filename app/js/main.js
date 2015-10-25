
var earthQuakeData;

$(document).ready(function(){

});

var populateUI = function(data) {
  var earthQuakes = [];

  $(jQuery.parseJSON(data)).each(function() {
    earthQuakes.push(new Earthquake(this));
  });
  earthQuakes.pop();
  earthQuakeData = new Earthquakes(earthQuakes);

  displayLargestQuake();
  displayStats();
};

var displayLargestQuake = function(){
  let description = earthQuakeData.getLargestQuake().getDescription();
  $("#largestQuake").append(`BIGGEST RECENT QUAKE: ${description}`);
};

var displayStats = function() {
  document.getElementById('seven-days').innerHTML = earthQuakeData.getNumberOfQuakes(7);
  document.getElementById('one-day').innerHTML = earthQuakeData.getNumberOfQuakes(1);
  document.getElementById('one-hour').innerHTML = earthQuakeData.getNumberOfQuakes(60);
  document.getElementById('thirty-days').innerHTML = earthQuakeData.getNumberOfQuakes(30);
};
