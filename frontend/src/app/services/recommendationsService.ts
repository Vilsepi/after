import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RecommendationsService {
    private recommendationsUrlPrefix = 'http://after.heap.fi/data/recommender-venues-';

    constructor(private http: Http) { }

    getRecommendations(id: String): Observable<Object> {
        return this.http.get(this.recommendationsUrlPrefix + id + '.json')
            .map((data) => data.json());
    }
}
