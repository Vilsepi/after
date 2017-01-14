import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'after-app',
  styles: [require('./app.css')],
  template: require('./app.html'),
})
export default class ApplicationComponent {}
