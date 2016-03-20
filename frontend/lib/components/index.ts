import {Component}          from 'angular2/core';
import {Navbar}             from './navbar/index';
import {Home}               from './home/index';
import {GithubUsers}        from './githubUsers/index';
import {Activity}           from './activity/index';
import {RouteConfig, Route, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: "app",
    directives: [Navbar, ROUTER_DIRECTIVES],
    styles: [require('!raw!autoprefixer?browsers=last 2 versions!sass!./index.scss')],
    template: require('./index.html')
})
@RouteConfig([
    new Route({ path: '/', component: Home, name: 'Home' }),
    new Route({ path: '/activity', component: Activity, name: 'Activity' }),
    new Route({ path: '/github-users/...', component: GithubUsers, name: 'GithubUsers'})
])
export class App {

    constructor() {
    }

    ngOnInit() {
        console.log('[Component] app running');
    }
}
