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
    this.radius = 10;
    this._distance = 0;
  }

  get distance() {
    return this._distance;
  }

  set distance(dist) {
    this._distance = dist;
  }

  getDescription() {
    return `There was a ${this.magnitude} magnitude earthquake ${this.place}  on the ${this.getDate(this.time)}`;
  }

  getDate(d) {
    let date = new Date(d);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let formatted = this.addOrd(date.getDate()) + ' ' +
                    months[date.getMonth()] + ' ' +
                    date.getFullYear() + ' at ' +
                    date.getHours() + ':' + ('0' +
                    date.getMinutes()).slice(-2);
    return formatted;
  }

  addOrd(n) {
    let ords = [,'st','nd','rd'];
    let m = n%100;
    return n + ((m > 10 && m < 14)? 'th' : ords[m%10] || 'th');
  }
}
