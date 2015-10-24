'use strict';

class Earthquake {
  constructor(data){
    this.id = data.id;
    this.time = data.time;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.depth = data.depth;
    this.magnitude = data.mag;
    this.place = data.place;
    this.type = data.type;
  }

  getDescription(){
    return `There was a ${this.magnitude} magnitude earthquake ${this.place}  on the ${this.getDate(this.time)}`;
  }

  getDate(d){
    var date = new Date(d);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var formatted = this.addOrd(date.getDate()) + ' ' +
                    months[date.getMonth()] + ' ' +
                    date.getFullYear() + ' at ' +
                    date.getHours() + ':' + ('0' +
                    date.getMinutes()).slice(-2);
    return formatted;
  }

  addOrd(n) {
    var ords = [,'st','nd','rd'];
    var m = n%100;
    return n + ((m > 10 && m < 14)? 'th' : ords[m%10] || 'th');
  }

  static getLargestQuake(earthQuakes){
    if (this.largestYet) {
      return this.largestYet;
    }

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
    this.largestYet = largestYet;
    return largestYet;
  }
}
