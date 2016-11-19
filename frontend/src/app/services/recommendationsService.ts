import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RecommendationsService {
  
    constructor(private http: Http) { }

    private recommendationsUrlPrefix = 'http://after.heap.fi/data/recommender-venues-';

    getRecommendations(id: String): Observable<Object> {
        return this.http.get(this.recommendationsUrlPrefix + id + '.json')
            .map(data => data.json());
    }
}
