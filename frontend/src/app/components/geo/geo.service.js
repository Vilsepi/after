(function() {
  'use strict';
  angular
    .module('afterHeap')
    .service('geo', function () {

      function inRads(value) {
        return value * Math.PI / 180;
      }

      function getDistanceBetweenPoints(fromLatitude, fromLongitude, toLatitude, toLongitude){
        var earthRadius = 6371; // kilometers

        var dLat = inRads(toLatitude-fromLatitude);
        var dLon = inRads(toLongitude-fromLongitude);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(inRads(fromLatitude)) * Math.cos(inRads(toLatitude)) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        var distance = earthRadius * c;

        return distance;
      }

      return {
        getDistanceBetweenPoints: getDistanceBetweenPoints
      }

    })

})();



