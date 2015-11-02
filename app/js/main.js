var earthQuakeData;
var map;
var user;

$(document).ready(function(){
  $(document).on("click","ul.nav li.parent > a > span.icon", function(){
      $(this).find('em:first').toggleClass("glyphicon-minus");
  });
  $(".sidebar span.icon").find('em:first').addClass("glyphicon-plus");

  // user = new User();

  getLocation().then(function(location) {
    console.log("Success!", location);
  }, function(error) {
    console.error("Failed!", error);
  });

});

var getLocation = function(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(geo){
        resolve([geo.coords.latitude, geo.coords.longitude]);
      });
    } else {
      reject(Error("Get Location: No geo available"));
    }
  });
};

var createBarChart = function() {
  var data = earthQuakeData.getEarthQuakesPerDay(),
      darData = data.value;

  var tempColor,
      margin = { top: 30, right: 30, bottom: 30, left: 30 },
      oWidth = $('#bar-chart-container').width(),
      oHeight = 400,
      width = oWidth - margin.top - margin.bottom,
      height = oHeight - margin.left - margin.right;

  var yScale = d3.scale.linear()
    .domain([0, d3.max(darData)])
    .range([0, height]);

  var xScale = d3.scale.ordinal()
    .domain(d3.range(0, darData.length))
    .rangeBands([0, width], 0.2);

  var tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip');

  // Create the bar chart
  var chart = d3.select('#quake-bar-chart')
    .append('svg')
    .attr('width', oWidth)
    .attr('height', oHeight)

    // Add the bars
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
    .selectAll('rect')
    .data(darData)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('width', xScale.rangeBand())
    .attr('height', 0)
    .attr('x', function(d, i) { return xScale(i); })
    .attr('y', height)

    // Show tooltip
    .on('mouseover', function(d) {
      tooltip.transition()
        .style('opacity', 0.9);
      tooltip.html(d)
        .style('left', (d3.event.pageX - 35) + 'px')
        .style('top', (d3.event.pageY) + 'px');
    })

    // Hide tooltip
    .on('mouseout', function(d) {
      tooltip.style('opacity', 0);
    });

    // Add fancy fade in effects
    chart.transition()
         .attr('height', function(d) { return yScale(d); })
         .attr('y', function(d) { return (height - yScale(d)); })
         .delay(function(d, i) { return i * 20; })
         .duration(1000)
         .ease('elastic');

  var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom');

  chart.append('g')
    .attr('class', 'xaxis')
    .call(xAxis);
};

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
      filterKey: 'dropShadow'
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
            return `<div class="hoverinfo">${data.magnitude} magnitude
                   <br/>Payload: ${data.place} kilotons </div>`;
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
  createBarChart();
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
