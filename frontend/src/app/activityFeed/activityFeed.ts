import {Component} from '@angular/core';
import {Http} from '@angular/http';

//import {Router, RouteParams, RouteData, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  selector: 'activity-feed',
  styles: [require('./activityFeed.css')],
  template: require('./activityFeed.html'),
})
export class ActivityFeed {
    checkins: Array<Object>;
    city: String;

    constructor(private _http: Http/*, private _router: Router, private _params: RouteParams, private _data: RouteData*/) {
        //this.city = _params.get('city') ||  'tampere';
        this.city = 'tampere';
    }

    ngOnInit() {
        this.getActivity();
    }

    getActivity() {
        this._http.get(`https://s3-eu-west-1.amazonaws.com/after.heap.fi/data/activity-${this.city}.json`)
            .subscribe((response) => {
                this.checkins = response.json();
            });
    }
}
