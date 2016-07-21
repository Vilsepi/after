import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Recommendations} from '../recommendations/recommendations';

@Injectable()
export class RecommendationsService {
  
    constructor(private http: Http) { }

    private recommendationsUrlPrefix = 'https://s3-eu-west-1.amazonaws.com/after.heap.fi/data/recommender-venues-';

    getRecommendations(id: String): Observable<Recommendations> {
        return this.http.get(this.recommendationsUrlPrefix + id + '.json')
            .map(data => data.json());
    }
}
