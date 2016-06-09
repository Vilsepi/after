import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ActivityFeedService {

    constructor(private http: Http) { }

    private feedUrl = 'https://s3-eu-west-1.amazonaws.com/after.heap.fi/data/fetcher-checkins-tampere.json';

    getLatestCheckins(): Observable<Object[]> {
        return this.http.get(this.feedUrl)
            .map(data => data.json());
    }
}
