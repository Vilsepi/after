import {ComponentResolver} from '@angular/core';
import {Location} from '@angular/common';
import {
    DefaultRouterUrlSerializer,
    Router,
    RouterOutletMap,
    RouterUrlSerializer
} from '@angular/router';
import {
    beforeEachProviders,
    describe,
    expect,
    fakeAsync,
    inject,
    it,
    tick
} from '@angular/core/testing';
import {HTTP_PROVIDERS} from '@angular/http';
import {SpyLocation} from '@angular/common/testing';
import {TestComponentBuilder} from '@angular/compiler/testing';
import {AfterApp} from './app';

describe('Router', () => {
    beforeEachProviders(() => [
        HTTP_PROVIDERS,
        RouterOutletMap,
        {provide: Location, useClass: SpyLocation},
        {provide: RouterUrlSerializer, useClass: DefaultRouterUrlSerializer},
        {provide: Router,
            deps: [ComponentResolver, RouterUrlSerializer, RouterOutletMap, Location],
            useFactory: (resolver, urlParser, outletMap, location) =>
            new Router('AfterApp', AfterApp, resolver, urlParser, outletMap, location),
        }
    ]);

    it('should be able to navigate to Home using commands API',
        fakeAsync(inject([Router, Location, TestComponentBuilder],
            (router: Router, location: Location, tcb: TestComponentBuilder) => {
                tcb.createFakeAsync(AfterApp);
                router.navigate(['/']);
                tick();
                expect(location.path()).toBe('');
            })
        ));

    it('should be able to navigate to ActivityFeed using commands API',
        fakeAsync(inject([Router, Location, TestComponentBuilder],
            (router: Router, location: Location, tcb: TestComponentBuilder) => {
                tcb.createFakeAsync(AfterApp);
                router.navigate(['/feed']);
                tick();
                expect(location.path()).toBe('/feed');
            })
        ));

    it('should be able to navigate to ActivityFeed by URL',
        fakeAsync(inject([Router, Location, TestComponentBuilder],
            (router: Router, location: Location, tcb: TestComponentBuilder) => {
                tcb.createFakeAsync(AfterApp);
                router.navigateByUrl('/feed');
                tick();
                expect(location.path()).toEqual('/feed');
            })
        ));
});
