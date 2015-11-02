'use strict';

class User {
  constructor() {
    this.handlers = [];
    this.setLocation();
  }

  setLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(geo){
        console.log(geo);
        this.latitude = geo.coords.latitude;
        this.longitude = geo.coords.longitude;
        console.log(this.latitude);
      });
    } else {
      console.log("Set Location: No geo available");
    }
  }

  getLocation() {
    if (typeof this.latitude != 'undefined') {
      // fallback
      return [this.latitude, this.longitude];

    } else {
      console.log("There is no location");
    }
  }
}
