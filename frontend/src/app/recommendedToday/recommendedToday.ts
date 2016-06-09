import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {RecommendationsService} from '../recommendationsService/recommendationsService';
import {Recommendations} from '../recommendations/recommendations';

@Component({
    selector: 'recommended-today',
    styles: [require('./recommendedToday.css')],
    template: require('./recommendedToday.html')
})
export class RecommendedToday implements OnInit {
    recommendations: Recommendations;
    city: String;

    constructor(private recommendationsService: RecommendationsService) { }

    getRecommendations() {
        this.recommendationsService
            .getRecommendations()
            .subscribe(data => this.recommendations = data);
    }

    ngOnInit() {
        this.getRecommendations();
    }
}
