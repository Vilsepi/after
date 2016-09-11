import {Component, OnInit, OnDestroy} from '@angular/core';
import {Http} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import {ActivityFeedService} from '../../services/activityFeedService';

@Component({
    selector: 'activity-feed',
    styles: [require('./activityFeed.css')],
    template: require('./activityFeed.html'),
})
export default class ActivityFeed implements OnInit, OnDestroy {
    checkins: Array<Object>;
    sub: any;

    constructor(
        private activityFeedService: ActivityFeedService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.activityFeedService
                .getLatestCheckins(params['city'])
                .subscribe(data => this.checkins = data);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
