
var venueBlacklist = {
  547302:  "Ale Pupi",
  1379610: "Amica-ravintola Valtatie 30",
  1782433: "As Oy Sorsapuisto",
  951950:  "Keskustori",
  3324214: "Nalkala",
  125270:  "Näsin sauna",
  865959:  "Stefan's Steakhouse",
  1293012: "Tampere",
  574605:  "TKL bussi 1",
  2566357: "TKL bussi 28",
  1502638: "Hatanpää"
};

var beerBlacklist = {
  39534:  "Karhu A",
  39540:  "Karhu III",
  36800:  "Lapin Kulta Premium III",
  925902: "Long Drink Grapefruit",
};

angular.module('afteri', []).controller('afteriCtrl', ['$scope', '$http', function($scope, $http) {

  $http.get('/data/thepub.json').then(function (response) {

    var checkins = response.data.response.checkins.items;
    var filteredCheckins = _.reject(checkins, function(item) {
      return venueBlacklist[item.venue.venue_id] || beerBlacklist[item.beer.bid];
    });

    var topSuggestions = _(filteredCheckins)
      .uniqBy('venue.venue_id')
      .take(3)
      .sortBy('beer.beer_abv')
      .reverse()
      .value();

    $scope.suggestions = topSuggestions;
    $scope.checkins = filteredCheckins;

  });

}]);
