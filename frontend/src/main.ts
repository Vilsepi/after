import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';

if (webpack.ENV === 'production') {
    enableProdMode();
}

import {AfterApp} from './app/app';
import {appRouterProviders} from './app/app';

bootstrap(AfterApp, [
    ...HTTP_PROVIDERS,
    appRouterProviders
]).catch(console.error.bind(console));
