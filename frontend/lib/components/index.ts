import {Component} from 'angular2/core';
import {Navbar} from './navbar/index';
import {RecommendedToday} from './recommendedToday/index';
import {GithubUsers} from './githubUsers/index';
import {ActivityFeed} from './activityFeed/index';
import {RouteConfig, Route, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: "app",
    directives: [Navbar, ROUTER_DIRECTIVES],
    styles: [require('!raw!autoprefixer?browsers=last 2 versions!sass!./index.scss')],
    template: require('./index.html')
})
@RouteConfig([
    new Route({ path: '/today/:city', name: 'RecommendedToday', component: RecommendedToday }),
    new Route({ path: '/feed/:city',  name: 'ActivityFeed',     component: ActivityFeed })
])
export class App {

    constructor(private _router: Router) {
    }

    ngOnInit() {
        console.log('[Component] app running');
        this._router.navigate(['RecommendedToday', { city: 'tampere' }]);
    }
}
