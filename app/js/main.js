var earthQuakeData;
var map;

$(document).ready(function(){
  $(document).on("click","ul.nav li.parent > a > span.icon", function(){
      $(this).find('em:first').toggleClass("glyphicon-minus");
  });
  $(".sidebar span.icon").find('em:first').addClass("glyphicon-plus");

  // var map = new Datamap({element: document.getElementById('map-container')});

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

var svg = d3.select("#quake-bar-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", type, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); });
  });

  function type(d) {
    d.frequency = +d.frequency;
    return d;
  }
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
