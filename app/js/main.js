var earthQuakes = [];

$(document).ready(function(){

});

var populateUI = function(data) {

  $(jQuery.parseJSON(data)).each(function() {
    earthQuakes.push(new Earthquake(this));
  });
  earthQuakes.pop();

  displayLargestQuake();
  // displayData();
  displayStats();
};

var displayLargestQuake = function(){
  let description = Earthquake.getLargestQuake(earthQuakes).getDescription();
  $("#largestQuake").append(`BIGGEST RECENT QUAKE: ${description}`);
};

var displayData = function(){
  for(var i = 0; i < earthQuakes.length; i++) {
    $("#output").append(earthQuakes[i].getDescription() + '<br />');
  }
};

var displayStats = function() {
  var sevenDays = earthQuakes.length;
  document.getElementById('seven-days').innerHTML = sevenDays;

  // get date 24hours ago
  var twentyFourHours = new Date();
  twentyFourHours.setDate(twentyFourHours.getDate()-1);


  var oneHour = new Date();
  oneHour.setDate(oneHour.getDay()-1);

  // loop earthquake
  var dayOfQuakes = [];
  var hourOfQuakes = [];
  earthQuakes.forEach(function(quake) {
    var quakeDate = new Date(quake.time);
    console.log(quakeDate);
    if (quakeDate >= oneHour) {
      hourOfQuakes.push(quake);
    }
    if (quakeDate >= twentyFourHours){
      dayOfQuakes.push(quake);
    }
  });

  document.getElementById('one-day').innerHTML = dayOfQuakes.length;

  document.getElementById('one-hour').innerHTML = hourOfQuakes.length;
};
