import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import ApplicationComponent from './components/application/app';
import {RecommendedToday} from './components/recommendedToday/recommendedToday';
import {ActivityFeed} from './components/activityFeed/activityFeed';
import {RecommendationsService} from './services/recommendationsService/recommendationsService';
import {ActivityFeedService} from './services/activityFeedService/activityFeedService';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
        {path: '', redirectTo: '/recommendations/tampere', pathMatch: 'full'},
        {path: 'recommendations/:city', component: RecommendedToday},
        {path: 'feed/:city', component: ActivityFeed}
    ])
  ],
  declarations: [
      ApplicationComponent,
      RecommendedToday,
      ActivityFeed
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    RecommendationsService,
    ActivityFeedService
  ],
  bootstrap: [ ApplicationComponent ]
})
export class AppModule {}
