import {Component} from 'angular2/core';
import {Inject} from 'angular2/core';
import {Http} from 'angular2/http';

@Component({
    selector: "activity",
    styles: [require('!raw!autoprefixer?browsers=last 2 versions!sass!./index.scss')],
    template: require('./index.html')
})
export class Activity {
    checkins: Array<Object>;

    constructor(public http: Http) {
    }

    ngOnInit() {
        this.http.get(`https://s3-eu-west-1.amazonaws.com/after.heap.fi/data/activity-tampere.json`)
        .subscribe((response) => {
            this.checkins = response.json();
        });
    }
}
