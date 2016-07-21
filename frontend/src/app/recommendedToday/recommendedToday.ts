import {Component, OnInit, OnDestroy} from '@angular/core';
import {Http} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import {RecommendationsService} from '../recommendationsService/recommendationsService';
import {Recommendations} from '../recommendations/recommendations';

@Component({
    selector: 'recommended-today',
    styles: [require('./recommendedToday.css')],
    template: require('./recommendedToday.html')
})
export class RecommendedToday implements OnInit, OnDestroy {
    recommendations: Recommendations;
    sub: any;

    constructor(
        private recommendationsService: RecommendationsService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.recommendationsService
                .getRecommendations(params['city'])
                .subscribe(data => this.recommendations = data);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
