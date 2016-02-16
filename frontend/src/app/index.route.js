(function() {
  'use strict';

  angular
    .module('afterHeap')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('city', {
        abstract: true,
        url: '/:cityId',
        template: '<ui-view/>'
      })
      .state('city.highlights', {
        url: '/',
        templateUrl: 'app/highlights/highlights.html',
        controller: 'HighlightsController',
        controllerAs: 'highlightsController',
        resolve: {
          highlights: function(api, processResponse, $stateParams){
            return api.getCityFeed($stateParams.cityId).then(function(res) {
              return processResponse.createTopSuggestions(res);
            })
          }
        }this_should_break_the_build
      })
      .state('city.feed', {
        url: '/feed',
        templateUrl: 'app/activityfeed/activityfeed.html',
        controller: 'ActivityFeedController',
        controllerAs: 'activityFeed',
        resolve: {
          checkins: function(api, processResponse, $stateParams){
            return api.getCityFeed($stateParams.cityId).then(function(res){
              return processResponse.removeBlackListed(res);
            });
          }
        }
      });

    $urlRouterProvider.otherwise('/Tampere/');
  }

})();
