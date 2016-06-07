import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';

import {RecommendedToday} from './recommendedToday/recommendedToday';
import {ActivityFeed} from './activityFeed/activityFeed';
import {RecommendationsService} from './recommendationsService/recommendationsService';

@Component({
  selector: 'after-app',
  styles: [require('./app.css')],
  template: require('./app.html'),
  directives: [ROUTER_DIRECTIVES],
  providers: [RecommendationsService]
})
@Routes([
  { path: '/',      component: RecommendedToday},
  { path: '/feed', component: ActivityFeed}
])
export class AfterApp {}
