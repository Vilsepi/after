# [After.heap.fi](http://after.heap.fi/)

[![Build Status](https://travis-ci.org/Vilsepi/after.svg?branch=master)](https://travis-ci.org/Vilsepi/after)

A simple web app that recommends beers and bars for afterwork.

Recommendations are currently provided from the following areas:

- [Tampere](https://www.freemaptools.com/radius-around-point.htm?clat=61.495007&clng=23.773459&r=1.71&fs=true&lc=4444ff&lw=3&fc=ddddff&nomoreradius=true)
- [Helsinki](https://www.freemaptools.com/radius-around-point.htm?clat=60.1671&clng=24.9409&r=2.39&fs=true&lc=4444ff&lw=3&fc=ddddff&nomoreradius=true)

## Contributing

Code contributions and issue reports are welcome. For code contributions: fork, clone, commit, push, send pull request.

## Roadmap

- :heavy_check_mark: Fix Bootstrap-based frontend (migrated from Foundation)
- :heavy_check_mark: Add navbar and scalable view routing
- :heavy_check_mark: Split recommendations and latest checkins ("nearby activity") into separate views
- :heavy_check_mark: Add Travis CI
- :heavy_check_mark: Remove Bower and use plain NPM instead
- :heavy_check_mark: For recommended beers, show the global rating instead of the rating of a single person in the latest checkin
- :heavy_check_mark: Filter recommended venues by category (only show bars, pubs, restaurants) in the backend, instead of banning venues one-by-one in the frontend
- :heavy_check_mark: Instead of basing recommendations on randomly picked latest checkins, first pick bars and then fetch top-rated beers there
- Show distance to venue from user's current location
- Show a treasure map of the night for brave adventurers
- Show no rating if beer rating is 0
- Add tests

## License and attribution

Code is licensed MIT.

Data is provided by [Untappd](https://untappd.com/) API.

Inspired by [wherethefuckshouldigofordrinks.com](http://wtfsigfd.com/).
