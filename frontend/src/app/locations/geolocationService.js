(function() {
  'use strict';

  angular
    .module('afterHeap')
    .service('distanceService', distanceService);

  /** @ngInject */
  function distanceService($http) {

    var DISTANCE_API_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
    var apiKey = 'AIzaSyCPjWmScJTDZMxu9_u49lABIIk52zZLDcQ';

    var fetchDistance = function (startLat, startLng, destLat, destLng) {
      var url = '' + DISTANCE_API_URL + 'origins=' + startLat + ","
        + startLng + "&destinations=" + destLat + "," + destLng + "&key=" + apiKey;
      return $http.get(url)
    };

    return {
      measure: fetchDistance
    }
  }

})();
