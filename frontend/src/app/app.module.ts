import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import ApplicationComponent from './components/application/app';
import Footer from './components/footer/footer';
import RecommendedToday from './components/recommendedToday/recommendedToday';
import { AFTER_SERVICES } from './services/services';

@NgModule({
    bootstrap: [ ApplicationComponent ],
    declarations: [
        ApplicationComponent,
        Footer,
        RecommendedToday,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot([
            {path: '', redirectTo: '/cities/tampere', pathMatch: 'full'},
            {path: 'cities/:city', component: RecommendedToday},
        ]),
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        ...AFTER_SERVICES,
    ],

})
export class AppModule {}
