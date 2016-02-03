(function() {
  'use strict';

  angular
    .module('afterHeap')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('highlights', {
        url: '/',
        templateUrl: 'app/highlights/highlights.html',
        controller: 'HighlightsController',
        controllerAs: 'highlights',
        resolve: {
          highlights: function(api, processResponse, $log){
            return api.then(function(res) {
              return processResponse.createTopSuggestions(res);
            })
          },
          distances: function($geolocation, $q, distanceService, highlights){
            return $geolocation.getCurrentPosition({timeout: 200}).then(function() {

              function distances(destLat, destLng){
                var startLat = $geolocation.position.coords.latitude;
                var startLng = $geolocation.position.coords.longitude;
                return distanceService.measure(startLat, startLng, destLat, destLng);
              }

              return $q.all(_.map(highlights, function(hl){
                return distances(hl.venue.location.lat, hl.venue.location.lng)
              }));
            })
         }
        }
      })
      .state('activityfeed', {
        url: '/feed',
        templateUrl: 'app/activityfeed/activityfeed.html',
        controller: 'ActivityFeedController',
        controllerAs: 'activityFeed',
        resolve: {
          checkins: function(api, processResponse, $log){
            return api.then(function(res){
              return processResponse.removeBlackListed(res);
            });
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
