'use strict';

class Earthquakes {
  constructor(earthquakes){
    this.earthquakes = earthquakes;
    this.earthquakes7Days = earthquakes;
    this.earthquakes24 = [];
    this.earthquakesHour = [];
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
      case 60:
        quakes = this.getLastSevenDays();
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

  // get the last hour of action
  getLastHour() {
    // return cache if exist
    if (this.earthquakesHour.length > 0) {
        return this.earthquakesHour;
    }

    // set the action timeframe
    var time = new Date();
    time.setHours(time.getHours()-1);

    // fetch the quakes and cache
    this.earthquakesHour = this.sortQuakes(time);
    console.log(this.earthquakesHour);
    return this.earthquakesHour;
  }

  // Fetch an array containing 24hrs of action
  getLastTwentyFourHours() {
    // return cache if exist
    if (this.earthquakes24.length > 0) { return this.earthquakes24; }

    // set the action timeframe
    var time = new Date();
    time.setDate(time.getDate()-1);

    // fetch the quakes and cache
    this.earthquakes24 = this.sortQuakes(time);
    return this.earthquakes24;
  }

  // Fetch an array containing 7 days of action
  getLastSevenDays() {
    // return cache if exist
    if (this.earthquakes7Days.length > 0) { return this.earthquakes7Days; }

    // set the action timeframe
    var time = new Date();
    time.setDate(time.getDate()-7);

    // fetch and cache
    this.earthquakes7Days = this.sortQuakes(time);
    return this.earthquakes7Days;
  }
}
