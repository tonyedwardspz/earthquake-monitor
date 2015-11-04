'use strict';

class Helper {
  constructor(data){

  }

  static comapreDistance(lat1, lng1, lat2, lng2) {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var radlon1 = Math.PI * lng1 / 180;
      var radlon2 = Math.PI * lng2 / 180;
      var theta = lng1 - lng2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;

      //Get in in kilometers
      dist = dist * 1.609344;

      // console.log(dist);
      return dist;
  }

  static CSVToArray(strData, strDelimiter) {
      // Check to see if the delimiter is defined. If not,
      // then default to comma.
      strDelimiter = (strDelimiter || ",");
      // Create a regular expression to parse the CSV values.
      var objPattern = new RegExp((
      // Delimiters.
      "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
      // Standard fields.
      "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
      // Create an array to hold our data. Give the array
      // a default empty first row.
      var arrData = [[]];
      // Create an array to hold our individual pattern
      // matching groups.
      var arrMatches = null;
      // Keep looping over the regular expression matches
      // until we can no longer find a match.
      while (arrMatches = objPattern.exec(strData)) {
          // Get the delimiter that was found.
          var strMatchedDelimiter = arrMatches[1];
          // Check to see if the given delimiter has a length
          // (is not the start of string) and if it matches
          // field delimiter. If id does not, then we know
          // that this delimiter is a row delimiter.
          if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
              // Since we have reached a new row of data,
              // add an empty row to our data array.
              arrData.push([]);
          }
          // Now that we have our delimiter out of the way,
          // let's check to see which kind of value we
          // captured (quoted or unquoted).
          if (arrMatches[2]) {
              // We found a quoted value. When we capture
              // this value, unescape any double quotes.
              var strMatchedValue = arrMatches[2].replace(
              new RegExp("\"\"", "g"), "\"");
          } else {
              // We found a non-quoted value.
              var strMatchedValue = arrMatches[3];
          }
          // Now that we have our value string, let's add
          // it to the data array.
          arrData[arrData.length - 1].push(strMatchedValue);
      }
      return (arrData);
  }

  static CSV2JSON(csv) {
      var array = this.CSVToArray(csv);
      var objArray = [];
      for (var i = 1; i < array.length; i++) {
          objArray[i - 1] = {};
          for (var k = 0; k < array[0].length && k < array[i].length; k++) {
              var key = array[0][k];
              objArray[i - 1][key] = array[i][k];
          }
      }

      var json = JSON.stringify(objArray);
      var str = json.replace(/},/g, "},\r\n");

      return str;
  }


}
