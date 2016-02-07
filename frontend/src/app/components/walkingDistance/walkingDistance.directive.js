(function() {
  'use strict';

  angular
    .module('afterHeap')
    .directive('walkingDistance', walkingDistance);

  /** @ngInject */
  function walkingDistance() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/walkingDistance/walkingDistance.html',
      scope: {
        venueLocation: '=venuelocation'
      },
      controller: walkingDistanceController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function walkingDistanceController($geolocation, geo) {
      var vm = this;

      $geolocation.getCurrentPosition({timeout: 200}).then(function() {
        var fromLat = $geolocation.position.coords.latitude;
        var fromLon = $geolocation.position.coords.longitude;

        vm.distanceFromUser = geo.getDistanceBetweenPoints(fromLat, fromLon, vm.venueLocation.lat, vm.venueLocation.lng);
      })

    }
  }

})();
