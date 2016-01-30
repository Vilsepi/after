(function() {
  'use strict';

  angular
    .module('afterHeap')
    .service('geolocationService', geolocationService);

  /** @ngInject */
  function geolocationService($geolocation) {

    this.location = $geolocation.getCurrentPosition().then(function (location) {
      return location;
    });

    this.watchPosition = function(interval){
      return $geolocation.watchPosition({
        timeout: interval || 60000,
        maximumAge: 2,
        enableHighAccuracy: true
      });
    };

    this.coords = $geolocation.position.coords;
    this.error = $geolocation.position.error;
  }

})();
