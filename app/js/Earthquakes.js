'use strict';

class Earthquakes {
  constructor(earthquakes){
    this.earthquakes = earthquakes;
    this.earthquakes30Days = [];
    this.earthquakes7Days = [];
    this.earthquakes24 = [];
    this.earthquakesHour = [];
    this.largestYet = {};
    this.largestYet30 = {};
  }

  getNumberOfQuakes(num) {
    console.log("get number of quakes");
    var quakes = [];
    switch (num){
      case 1:
        quakes = this.getLastTwentyFourHours();
        break;
      case 7:
        quakes = this.getLastSevenDays();
        break;
      case 30:
        quakes = this.getLastThirtyDays();
        break;
      case 60:
        quakes = this.getLastHour();
        break;
      default:
        quakes = this.earthquakes;
    }
    console.log(quakes.length);
    return quakes.length;
  }

  sortQuakes(length) {
    var quakes = [];
    this.earthquakes.forEach(function(quake) {
      if (new Date(quake.time) >= length){
        quakes.push(quake);
      }
    });
    return quakes;
  }

  getEarthQuakes() {
    return this.earthquakes;
  }

  getLargestQuake(days){
    // Check the cache
    if (days === 7 && this.largestYet.time) {
      return this.largestYet;
    } else if (days == 30 && this.largestYet30.time) {
      return this.largestYet30;
    }

    // Fetch the appropriate data
    var quakePeriod = [];
    if (days === 30) {
      quakePeriod = this.getLastThirtyDays();
    } else {
      quakePeriod = this.getLastSevenDays();
    }

    // find the largest quake
    var largestYet;
    for (var i = 0; i < quakePeriod.length; i++){
      if (largestYet){
        if (largestYet.magnitude < quakePeriod.magnitude) {
          largestYet = quakePeriod[i];
        }
      } else {
        largestYet = quakePeriod[i];
      }
    }

    // Cache the local variable
    if (days === 7) {
      this.largestYet = largestYet;
    } else {
      this.largestYet30 = largestYet;
    }

    return largestYet;
  }

  // get the last hour of action
  getLastHour() {
    // return cache if exist
    if (this.earthquakesHour.length > 0) { return this.earthquakesHour; }

    // set the action timeframe
    var time = new Date().subtractHours(1);

    // fetch the quakes and cache
    this.earthquakesHour = this.sortQuakes(time);
    return this.earthquakesHour;
  }

  // Fetch an array containing 24hrs of action
  getLastTwentyFourHours() {
    // return cache if exist
    if (this.earthquakes24.length > 0) { return this.earthquakes24; }

    // set the action timeframe
    var time = new Date().subtractDays(1);

    // fetch the quakes and cache
    this.earthquakes24 = this.sortQuakes(time);
    return this.earthquakes24;
  }

  // Fetch an array containing 7 days of action
  getLastSevenDays() {
    // return cache if exist
    if (this.earthquakes7Days.length > 0) { return this.earthquakes7Days; }

    // set the action timeframe
    var time = new Date().subtractDays(7);

    // fetch and cache
    this.earthquakes7Days = this.sortQuakes(time);
    return this.earthquakes7Days;
  }

  getLastThirtyDays() {
    // return cache if exist
    if (this.earthquakes30Days.length > 0) { return this.earthquakes30Days; }

    // set the action timeframe
    var time = new Date().subtractDays(30);

    // fetch and cache
    this.earthquakes30Days = this.sortQuakes(time);
    return this.earthquakes30Days;
  }
}
