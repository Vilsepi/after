import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ActivityFeedService {

    constructor(private http: Http) { }

    private feedUrlPrefix = 'http://after.heap.fi/data/fetcher-checkins-';

    getLatestCheckins(city: String): Observable<Object[]> {
        return this.http.get(this.feedUrlPrefix + city + '.json')
            .map(data => data.json());
    }
}
