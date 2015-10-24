var earthQuakes = [];

$(document).ready(function(){
  // getEarthQuakes();
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
  var largestYet;
  for (var i = 0; i < earthQuakes.length; i++){
    if (largestYet){
      if (largestYet.magnitude < earthQuakes[i].magnitude) {
        largestYet = earthQuakes[i];
      }
    } else {
      largestYet = earthQuakes[i];
    }
  }
  $("#largestQuake").append("BIGGEST RECENT QUAKE: " + getDescription(largestYet));
};

var getDescription = function(item) {
  return 'There was a ' + item.magnitude + ' magnitude earthquake ' + item.place + ' on the ' + item.getDate(item.time);
};

var displayData = function(){
  for(var i = 0; i < earthQuakes.length; i++) {
    $("#output").append(getDescription(earthQuakes[i]) + '<br />');
  }
};
