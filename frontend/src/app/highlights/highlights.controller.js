(function() {
  'use strict';

  angular
    .module('afterHeap')
    .controller('HighlightsController', HighlightsController);

/** @ngInject */
    function HighlightsController($log, $geolocation, data) {
      var vm = this;
      vm.data = data;

      $geolocation.watchPosition({
        timeout: 60000,
        maximumAge: 250,
        enableHighAccuracy: true
      });

      vm.myCoords = $geolocation.position.coords;
      vm.myError = $geolocation.position.error;
      $log.info(vm.myError, vm.myCoords)
  }

})();
