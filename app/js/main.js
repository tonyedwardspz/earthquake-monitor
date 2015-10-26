
var earthQuakeData;
var map;

$(document).ready(function(){
  $(document).on("click","ul.nav li.parent > a > span.icon", function(){
      $(this).find('em:first').toggleClass("glyphicon-minus");
  });
  $(".sidebar span.icon").find('em:first').addClass("glyphicon-plus");

  // var map = new Datamap({element: document.getElementById('map-container')});
});

$(window).on('resize', function () {
  if ($(window).width() > 768) {
    $('#sidebar-collapse').collapse('show');
  } else {
    if ($(window).width() <= 767) $('#sidebar-collapse').collapse('hide');
  }
});

var buildMap = function(earthQuakes) {
  var quakeMap = new Datamap({
    element: document.getElementById('map-container'),
    scope: 'world',
    geographyConfig: {
        popupOnHover: false,
        highlightOnHover: false
    },
    bubblesConfig: {
      //animate: false,
      borderColor: '#000',
      borderWidth: 1,
      fillOpacity: 1.0,
      filterKey: 'dropShadow',
      popupTemplate: function(geography, data) {
        return '<div class="hoverinfo">Some From New: data about ' + data.centered + '</div>';
      }
    },
    fills: {
      'defaultFill': '#dddddd',
      'good': 'url(#good)',
      'medium': 'url(#medium)',
      'bad': 'url(#bad)',
      'horizontalStripe': 'url(#horizontal-stripe)',
      'diagonalStripe': 'url(#diagonal-stripe)'
    },
    filters: {
      'dropShadow': 'url(#dropShadow)',
      'bigShadow': 'url(#bigShadow)'
    },
    data:{
      'TX': {fillKey: 'diagonalStripe'}
    }
  });

  quakeMap.bubbles(earthQuakes, {
    popupTemplate: function (geo, data) {
            return ['<div class="hoverinfo">' +  data.name,
            '<br/>Payload: ' +  data.place + ' kilotons',
            '</div>'].join('');
    }
  });
  //return quakeMap;
};

var populateUI = function(data) {
  var earthQuakes = [];

  $(jQuery.parseJSON(data)).each(function() {
    earthQuakes.push(new Earthquake(this));
  });
  earthQuakes.pop();
  earthQuakeData = new Earthquakes(earthQuakes);

  displayLargestQuake();
  displayStats();
  buildMap(earthQuakes);
};

var displayLargestQuake = function(){
  let largestIn7 = earthQuakeData.getLargestQuake(7).getDescription();
  $("#largestQuake7").append(largestIn7);

  let largestIn30 = earthQuakeData.getLargestQuake(30).getDescription();
  $("#largestQuake30").append(largestIn30);
};

var displayStats = function() {
  document.getElementById('seven-days').innerHTML = earthQuakeData.getNumberOfQuakes(7);
  document.getElementById('one-day').innerHTML = earthQuakeData.getNumberOfQuakes(1);
  document.getElementById('one-hour').innerHTML = earthQuakeData.getNumberOfQuakes(60);
  document.getElementById('thirty-days').innerHTML = earthQuakeData.getNumberOfQuakes(30);
};
