import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ActivityFeedService {

    constructor(private http: Http) { }

    private feedUrlPrefix = 'https://s3-eu-west-1.amazonaws.com/after.heap.fi/data/fetcher-checkins-';

    getLatestCheckins(city: String): Observable<Object[]> {
        return this.http.get(this.feedUrlPrefix + city + '.json')
            .map(data => data.json());
    }
}
