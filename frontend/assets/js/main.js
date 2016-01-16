
var venueBlacklist = {
  1379610: "Amica-ravintola Valtatie 30",
  1782433: "As Oy Sorsapuisto",
  865959:  "Stefan's Steakhouse",
};

var beerBlacklist = {
  39534: "Karhu A",
  39540: "Karhu III",
  36800: "Lapin Kulta Premium III",
};

angular.module('afteri', []).controller('afteriCtrl', ['$scope', '$http', function($scope, $http) {

  $http.get('data/thepub.json').then(function (response) {
    var checkins = _.reject(response.data.response.checkins.items, function(item) {
      return venueBlacklist[item.venue.venue_id] || beerBlacklist[item.beer.bid];
    });

    var topSuggestions = _(checkins)
      .uniq('venue.venue_id')
      .sortBy('beer.beer_abv')
      .reverse()
      .take(3)
      .value();

    $scope.suggestions = topSuggestions;
    $scope.checkins = checkins;

  });

}]);
