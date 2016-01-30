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
        controllerAs: 'suggestions',
        resolve: {
          data: function(api){
            return api;
          }
        }
      })
      .state('activityfeed', {
        url: '/feed',
        templateUrl: 'app/activityfeed/activityfeed.html',
        controller: 'ActivityFeedController',
        controllerAs: 'suggestions',
        resolve: {
          data: function(api){
            return api;
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
