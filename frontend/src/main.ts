import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router';

if (webpack.ENV === 'production') {
    enableProdMode();
}

import {AfterApp} from './app/app';

bootstrap(AfterApp, [
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS
]).catch(console.error.bind(console));
