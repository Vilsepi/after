(function() {
  'use strict';

  /** @ngInject */
  function RatingController($scope) {
    var vm = this;
    function update() {
      var floored = Math.floor(vm.rating);
      var remainder = String(vm.rating - floored).substring(2);
      vm.stars = [];
      for (var i = 0; i < 5; ++i) {
        var klass = '';
        if (i < floored) {
          klass = ['frac', 'frac100'];
        } else if (i === floored && remainder) {
          klass = ['frac', 'frac' + remainder];
        }
        vm.stars.push(klass);
      }
    }
    $scope.$watch('rating', update);
  }

  function ratingDirective() {
    return {
      restrict: 'A',
      scope: {},
      template: '<div class="stars-wrapper" ng-attr-title="{{vm.rating}}/5">' +
        '<div class="star" ng-class="item" ng-repeat="item in vm.stars track by $index"></div>' +
        '</div>',
      controller: RatingController,
      controllerAs: 'vm',
      bindToController: {
        rating: '=starRating'
      }
    };
  }

  angular
    .module('afterHeap')
    .directive('starRating', ratingDirective);

})();
