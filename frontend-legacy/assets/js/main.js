
var venueBlacklist = {
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
  /* Hämeenlinna */
  1562999: "Hämeenlinna",
  4258445: "Linna Style Oy",
  4257589: "Mummola",
  4130703: "Paavo Cajanderin katu 7",
  4258044: "Tanian huussi",
  /* Helsinki */
  4215417: "Hernesaarenkatu",
  482487:  "Kotiharjun sauna",
  1989714: "Maneesikatu",
};

var beerBlacklist = {
  39534:  "Karhu A",
  39540:  "Karhu III",
  77068:  "Koff III",
  36800:  "Lapin Kulta Premium III",
  925902: "Long Drink Grapefruit",
  168826: "Stowford Press Low Alcohol",
};

angular.module('afteri', []).controller('afteriCtrl', ['$scope', '$http', function($scope, $http) {

  if (window.location.search.indexOf("Helsinki") >= 0) {
    url = '/data/thepub-helsinki.json';
  }
  else if (window.location.search.indexOf("Hameenlinna") >= 0) {
    url = '/data/thepub-hameenlinna.json';
  }
  else {
    url = '/data/thepub-tampere.json';
  }

  function processResponse(response) {

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

  }

  $http.get(url).then(processResponse);

}]);
