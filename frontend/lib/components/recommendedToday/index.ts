import {Component} from 'angular2/core';
import {Http} from 'angular2/http';
import {Router, RouteParams, RouteData, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    styles: [require('!raw!autoprefixer?browsers=last 2 versions!sass!./index.scss')],
    template: require('./index.html'),
    directives: [ROUTER_DIRECTIVES]
})
export class RecommendedToday {
    checkins: Array<Object>;
    city: String;

    constructor(private _http: Http, private _router: Router, private _params: RouteParams, private _data: RouteData) {
        this.city = _params.get('city') || 'tampere';
    }

    ngOnInit() {
        this._http.get(`https://s3-eu-west-1.amazonaws.com/after.heap.fi/data/activity-${this.city}.json`)
            .subscribe((response) => {
                this.checkins = response.json();
            });
    }
}
