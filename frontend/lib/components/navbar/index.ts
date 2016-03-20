import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
    selector: "navbar",
    directives: [RouterLink],
    styles: [require('!raw!autoprefixer?browsers=last 2 versions!sass!./index.scss')],
    template: require('./index.html')
})
export class Navbar {
    title: string;

    constructor() {
        this.title = "Navbar title";
    }

    ngOnInit() {
        console.log('[Component] navbar running');
    }
}
