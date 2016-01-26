(function() {
  'use strict';

  angular
    .module('afterHeap')
    .directive('afterSuggestions', afterSuggestions);

  /** @ngInject */
  function afterSuggestions() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/suggestions/suggestions.html',
      controller: SuggestionsController,
      controllerAs: 'suggestions',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function SuggestionsController($timeout, $http) {
      var vm = this;


      /*var venueBlacklist = {
        547302:  "Ale Pupi",
        1379610: "Amica-ravintola Valtatie 30",
        1782433: "As Oy Sorsapuisto",
        1502638: "Hatanpää",
        951950:  "Keskustori",
        3324214: "Nalkala",
        125270:  "Näsin sauna",
        865959:  "Stefan's Steakhouse",
        1293012: "Tampere",
        574605:  "TKL bussi 1",
        2566357: "TKL bussi 28",
        /* Helsinki */
        /*4215417: "Hernesaarenkatu",
        482487:  "Kotiharjun sauna",
        1989714: "Maneesikatu"
      };

      var beerBlacklist = {
        39534:  "Karhu A",
        39540:  "Karhu III",
        77068:  "Koff III",
        36800:  "Lapin Kulta Premium III",
        925902: "Long Drink Grapefruit"
      };*/

      var url = '/data/thepub-tampere.json';
      /*
      if (window.location.search.indexOf("Helsinki") >= 0) {
        var url = '/data/thepub-helsinki.json';
      }
      else {
        var url = '/data/thepub-tampere.json';
      }*/

      $http.get(url).then(function (response) {

        var checkins = response.data.response.checkins.items;
        var filteredCheckins = checkins;
        /*var filteredCheckins = _.reject(checkins, function(item) {
          return venueBlacklist[item.venue.venue_id] || beerBlacklist[item.beer.bid];
        });*/

        /* Y u no work with webpack?! */
        /*var topSuggestions = _(filteredCheckins)
          .uniqBy('venue.venue_id')
          .take(3)
          .sortBy('beer.beer_abv')
          .reverse()
          .value();*/
        var topSuggestions = filteredCheckins;

        vm.suggestions = topSuggestions;
        vm.checkins = filteredCheckins;

      });


    }
  }

})();
