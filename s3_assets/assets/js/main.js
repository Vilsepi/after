var venueBlacklist = [
  1782433, // As Oy Sorsapuisto
  865959 // Stefan's Steakhouse
];

var beerBlacklist = [
  36800, // Lapin Kulta Premium III
  39534 // Karhu A
];

angular.module('afteri', []).controller('afteriCtrl', ['$scope', '$http', function($scope, $http) {

  $http.get('data/thepub.json').then(function (response) {
    var checkins = response.data.response.checkins.items;
    console.log(checkins);
    
    /* Filter blacklisted venues and beers */
    checkins = $.grep(checkins, function(item) {
      return jQuery.inArray(item.venue.venue_id, venueBlacklist) == -1 && jQuery.inArray(item.beer.bid, beerBlacklist) == -1;
    });

    var uniqueVenues = {};
    $.each(checkins, function(index, checkin){
      uniqueVenues[checkin.venue.venue_id.toString()] = checkin;
    });

    var topSuggestions = $.map(uniqueVenues, function(venue) {return venue;}).slice(0, 3);
    $scope.suggestions = topSuggestions;
    $scope.checkins = checkins;

  });

}]);
