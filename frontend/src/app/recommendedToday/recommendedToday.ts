import {Component} from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'recommended-today',
  styles: [require('./recommendedToday.css')],
  template: require('./recommendedToday.html')
})
export class RecommendedToday {
    recommendations: Object;
    city: String;

    constructor(private _http: Http/*, private _router: Router, private _params: RouteParams, private _data: RouteData*/) {
        //this.city = _params.get('city') ||  'tampere';
        this.city = 'tampere';
    }

    ngOnInit() {
        this.getRecommendations();
    }

    getRecommendations() {
        this.recommendations = { recommendations_updated: "TODO this should be in a service" };
        this._http.get(`https://s3-eu-west-1.amazonaws.com/after.heap.fi/data/recommender-venues-${this.city}.json`)
            .subscribe((response) => {
                this.recommendations = response.json();
            });

    }
}
