import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import ApplicationComponent from './components/application/app';
import {RecommendedToday} from './components/recommendedToday/recommendedToday';
import {ActivityFeed} from './components/activityFeed/activityFeed';
import {AFTER_SERVICES} from './services/services';

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
    ...AFTER_SERVICES
  ],
  bootstrap: [ ApplicationComponent ]
})
export class AppModule {}
