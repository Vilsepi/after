import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import ApplicationComponent from './components/application/app';
import Footer from './components/footer/footer';
import RecommendedToday from './components/recommendedToday/recommendedToday';
import {AFTER_SERVICES} from './services/services';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
        {path: '', redirectTo: '/cities/tampere', pathMatch: 'full'},
        {path: 'cities/:city', component: RecommendedToday}
    ])
  ],
  declarations: [
      ApplicationComponent,
      Footer,
      RecommendedToday
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ...AFTER_SERVICES
  ],
  bootstrap: [ ApplicationComponent ]
})
export class AppModule {}
