# [After.heap.fi](http://after.heap.fi/)

A simple web app that suggests beers and bars for afterwork.

Recommendations are currently provided from the following areas:

- [Tampere](https://www.freemaptools.com/radius-around-point.htm?clat=61.4985&clng=23.7717&r=1.71&fs=true&lc=4444ff&lw=3&fc=ddddff&nomoreradius=true)
- [Hämeenlinna](https://www.freemaptools.com/radius-around-point.htm?clat=60.9963&clng=24.4629&r=1.06&fs=true&lc=4444ff&lw=3&fc=ddddff&nomoreradius=true)
- [Helsinki](https://www.freemaptools.com/radius-around-point.htm?clat=60.1671&clng=24.9409&r=2.39&fs=true&lc=4444ff&lw=3&fc=ddddff&nomoreradius=true)

## Contributing

Contributions are welcome, feel free to create issues and pull requests.

**Please note:** While the `frontend-legacy` is the currently live version, it is actively being replaced by the newer `frontend` directory which has proper tooling and structure. Focus your efforts on the newer version.

## Roadmap

- :heavy_check_mark: Fix Bootstrap-based frontend (migrated from Foundation)
- :heavy_check_mark: Add navbar and scalable view routing
- :heavy_check_mark: Split recommendations and latest checkins ("nearby activity") into separate views
- Show distance to venue from user's current location
- Filter recommended venues by category (only show bars, pubs, restaurants), instead of banning venues one-by-one
- Show a treasure map of the night for brave adventurers
- Show no rating if beer rating is 0
- For recommended beers, show the global rating instead of the rating of a single person in the latest checkin
- Move blacklists and suggestion logic from frontend to backend
- Instead of basing recommendations on randomly picked latest checkins, first pick bars and then fetch top-rated, recently drank beers there
- Remove Bower and use plain NPM instead
- Add tests and Travis CI

## License and attribution

Code is licensed MIT.

Data is provided by [Untappd](https://untappd.com/) API.
