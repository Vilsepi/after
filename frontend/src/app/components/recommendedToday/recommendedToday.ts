import {Component, OnInit, OnDestroy} from '@angular/core';
import {Http} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import {RecommendationsService} from '../../services/recommendationsService';
import {ActivityFeedService} from '../../services/activityFeedService';

@Component({
    selector: 'recommended-today',
    styles: [require('./recommendedToday.css')],
    template: require('./recommendedToday.html')
})
export default class RecommendedToday implements OnInit, OnDestroy {
    recommendations: Object;
    recommendationsSubscription: any;
    checkins: Array<Object>;
    checkinsSubscription: any;

    constructor(
        private recommendationsService: RecommendationsService,
        private activityFeedService: ActivityFeedService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.recommendationsSubscription = this.route.params.subscribe(params => {
            this.recommendationsService
                .getRecommendations(params['city'])
                .subscribe(data => this.recommendations = data);
        });

        this.checkinsSubscription = this.route.params.subscribe(params => {
            this.activityFeedService
                .getLatestCheckins(params['city'])
                .subscribe(data => this.checkins = data);
        });
    }

    ngOnDestroy() {
        this.recommendationsSubscription.unsubscribe();
        this.checkinsSubscription.unsubscribe();
    }
}
