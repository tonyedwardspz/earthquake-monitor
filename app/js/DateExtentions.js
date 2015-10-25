'use strict';

Date.prototype.subtractHours = function(h) {
   this.setTime(this.getTime() - (h*60*60*1000));
   return this;
};

Date.prototype.subtractDays = function(h) {
   this.setTime(this.getTime() - (h*24*60*60*1000));
   return this;
};
