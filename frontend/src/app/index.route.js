(function() {
  'use strict';

  angular
    .module('afterHeap')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('root', {
        url: '/',
        template: '<h1>Root state</h1>'
      })
      .state('highlights', {
        url: '/highlights',
        templateUrl: 'app/highlights/highlights.html',
        controller: 'HighlightsController',
        controllerAs: 'highlightsController',
        resolve: {
          highlights: function(api, processResponse){
            return api.then(function(res) {
              return processResponse.createTopSuggestions(res);
            })
          }
        }
      })
      .state('feed', {
        url: '/feed',
        templateUrl: 'app/activityfeed/activityfeed.html',
        controller: 'ActivityFeedController',
        controllerAs: 'activityFeed',
        resolve: {
          checkins: function(api, processResponse){
            return api.then(function(res){
              return processResponse.removeBlackListed(res);
            });
          }
        }
      });

    $urlRouterProvider.otherwise('/highlights');
  }

})();
