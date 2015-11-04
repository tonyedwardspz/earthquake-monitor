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

  getClosestQuake(userLocation) {
    let quakes = this.earthquakes;
    let closestQuake = [{},];

    console.log(userLocation);

    for(var quake of quakes){

      var distance = Helper.comapreDistance(userLocation[0], userLocation[1],
                                            quake.latitude, quake.longitude);

      if (Object.getOwnPropertyNames(closestQuake[0]).length === 0) {
        // console.log(distance);
        quake.distance = distance;
        closestQuake[0] = quake;
        closestQuake[1] = distance;
      } else if (distance < closestQuake[1]){
        quake.distance = distance;
        closestQuake[0] = quake;
        closestQuake[1] = distance;
      }
    }
    return closestQuake;
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

  getEarthQuakesPerDay() {
    var sortedQuakes = {key: [], value: []};
    var thisKeyCounter = 0;

    // loop over the entire earthquake data array
    this.earthquakes.forEach(function(quake){

      // get the quake time
      let quakeTime = new Date(quake.time).toDateString();

      // get the correct key
      let currentKey;
      if (sortedQuakes.key.length === 0) {
        currentKey = quakeTime;
        sortedQuakes.key.push(quakeTime);
      } else {
        currentKey = sortedQuakes.key[sortedQuakes.key.length-1];
      }

      if (quakeTime == currentKey) {
        thisKeyCounter++;
      } else {
        sortedQuakes.value.push(thisKeyCounter);
        sortedQuakes.key.push(quakeTime);
        thisKeyCounter = 0;
      }
    });

    sortedQuakes.key.pop();

    return sortedQuakes;
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
