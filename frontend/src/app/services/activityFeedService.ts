import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ActivityFeedService {

    private feedUrlPrefix = 'http://after.heap.fi/data/fetcher-checkins-';

    constructor(private http: Http) { }

    getLatestCheckins(city: String): Observable<Object[]> {
        return this.http.get(this.feedUrlPrefix + city + '.json')
            .map((data) => data.json());
    }
}
