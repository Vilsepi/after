# [After.heap.fi](http://after.heap.fi/)

[![Build Status](https://travis-ci.org/Vilsepi/after.svg?branch=master)](https://travis-ci.org/Vilsepi/after)

A simple web app that recommends beers and bars for afterwork.

Recommendations are currently provided from the following areas:

- [Tampere](https://www.freemaptools.com/radius-around-point.htm?clat=61.495007&clng=23.773459&r=1.71&fs=true&lc=4444ff&lw=3&fc=ddddff&nomoreradius=true)
- [Helsinki](https://www.freemaptools.com/radius-around-point.htm?clat=60.1671&clng=24.9409&r=2.39&fs=true&lc=4444ff&lw=3&fc=ddddff&nomoreradius=true)

## Contributing

Code contributions and issue reports are welcome. For code contributions: fork, clone, commit, push, send pull request.

## Roadmap

- [ ] Do not recommend a venue that has no beers to recommend (Or at least pad the recommended beers from the checkins of the venue)
- [ ] Add a radar which shows where afterwork is active (if several people have checked in lately in the same venue)
- [ ] Show no rating if beer rating is 0
- [ ] Show distance to venue from user's current location
- [ ] Show a treasure map of the night for brave adventurers
- [x] Switch to whitelisting categories. Currently there's way too many cafes and restaurants which are not suitable for afterwork.
- [x] For recommended beers, show the global rating instead of the rating of a single person in the latest checkin
- [x] Filter recommended venues by category (only show bars, pubs, restaurants) in the backend, instead of banning venues one-by-one in the frontend
- [x] Instead of basing recommendations on randomly picked latest checkins, first pick bars and then fetch top-rated beers there

## License and attribution

Code is licensed MIT.

Data is provided by [Untappd](https://untappd.com/) API.

Inspired by [wherethefuckshouldigofordrinks.com](http://wtfsigfd.com/).
