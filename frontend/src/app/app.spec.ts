import {ComponentResolver} from '@angular/core';
import {Location} from '@angular/common';
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
