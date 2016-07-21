import {Component} from '@angular/core';
import {provideRouter, RouterConfig, ROUTER_DIRECTIVES}  from '@angular/router';
import {RecommendedToday} from './recommendedToday/recommendedToday';
import {ActivityFeed} from './activityFeed/activityFeed';
import {RecommendationsService} from './recommendationsService/recommendationsService';
import {ActivityFeedService} from './activityFeedService/activityFeedService';

@Component({
    selector: 'after-app',
    styles: [require('./app.css')],
    template: require('./app.html'),
    directives: [ROUTER_DIRECTIVES],
    providers: [RecommendationsService, ActivityFeedService]
})
export class AfterApp { }

const routes: RouterConfig = [
    {path: '', redirectTo: '/recommendations/tampere', pathMatch: 'full'},
    {path: 'recommendations/:city', component: RecommendedToday},
    {path: 'feed/:city', component: ActivityFeed}
];

export const appRouterProviders = [
  provideRouter(routes)
];
