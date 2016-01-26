angular.module('afteri').directive('rating', function() {
  return {
    scope: {
      rating: '='
    },
    template: '<div class="stars-wrapper" ng-attr-title="{{rating}}/5">' +
      '<div class="star" ng-class="item" ng-repeat="item in stars track by $index"></div>' +
      '</div>',
    controller: function ($scope) {
      function update() {
        var floored = Math.floor($scope.rating);
        var remainder = String($scope.rating - floored).substring(2);
        $scope.stars = [];
        for (var i = 0; i < 5; ++i) {
          var klass = '';
          if (i < floored) {
            klass = ['frac', 'frac100'];
          } else if (i === floored && remainder) {
            klass = ['frac', 'frac' + remainder];
          }
          $scope.stars.push(klass);
        }
        console.log($scope.stars);
      }
      $scope.$watch('rating', update);
    }
  };
});
