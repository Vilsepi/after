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
            });
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
