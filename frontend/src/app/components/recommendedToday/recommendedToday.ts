import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityFeedService } from '../../services/activityFeedService';
import { RecommendationsService } from '../../services/recommendationsService';
import { Constants } from '../../constants';

@Component({
    selector: 'after-recommended-today',
    styles: [require('./recommendedToday.css')],
    template: require('./recommendedToday.html'),
})
export default class RecommendedTodayComponent implements OnInit, OnDestroy {

    recommendations: Object;
     recommendationsSubscription: any;
     checkins: Object[];
     checkinsSubscription: any;

    constructor(
        private recommendationsService: RecommendationsService,
        private activityFeedService: ActivityFeedService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.recommendationsSubscription = this.route.params.subscribe((params) => {
            this.recommendationsService
                .getRecommendations(params[Constants.CITY])
                .subscribe((data) => this.recommendations = data);
        });

        this.checkinsSubscription = this.route.params.subscribe((params) => {
            this.activityFeedService
                .getLatestCheckins(params[Constants.CITY])
                .subscribe((data) => this.checkins = data);
        });
    }

    ngOnDestroy() {
        this.recommendationsSubscription.unsubscribe();
        this.checkinsSubscription.unsubscribe();
    }
}
