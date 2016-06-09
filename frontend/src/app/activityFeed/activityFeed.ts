import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {ActivityFeedService} from '../activityFeedService/activityFeedService';

//import {Router, RouteParams, RouteData, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'activity-feed',
    styles: [require('./activityFeed.css')],
    template: require('./activityFeed.html'),
})
export class ActivityFeed implements OnInit {
    checkins: Array<Object>;

    constructor(private activityFeedService: ActivityFeedService) { }

    ngOnInit() {
        this.getActivity();
    }

    getActivity() {
        this.activityFeedService
            .getLatestCheckins()
            .subscribe(data => this.checkins = data);
    }

}
