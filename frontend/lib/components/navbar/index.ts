import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
//import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: "navbar",
    directives: [RouterLink/*, ROUTER_DIRECTIVES*/],
    styles: [require('!raw!autoprefixer?browsers=last 2 versions!sass!./index.scss')],
    template: require('./index.html')
})
export class Navbar {
    city: String;

    constructor(/*private _params: RouteParams*/) {
        //this.city = _params.get('city') || 'tampere';
        this.city = 'tampere';
    }

    ngOnInit() {
        console.log('[Component] navbar running');
    }
}
