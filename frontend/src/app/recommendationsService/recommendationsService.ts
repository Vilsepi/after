import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Recommendations} from '../recommendations/recommendations';

@Injectable()
export class RecommendationsService {
  
    constructor(private http: Http) { }

    private recommendationsUrl = 'https://s3-eu-west-1.amazonaws.com/after.heap.fi/data/recommender-venues-tampere.json';

    getRecommendations(): Observable<Recommendations> {
        return this.http.get(this.recommendationsUrl)
        .map(data => data.json());
    }
}
