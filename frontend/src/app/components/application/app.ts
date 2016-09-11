import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'after-app',
  template: require('./app.html'),
  styles: [require('./app.css')],
  encapsulation:ViewEncapsulation.None
})
export default class ApplicationComponent {}
