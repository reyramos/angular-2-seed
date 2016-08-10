// Imports for loading & configuring the in-memory web api
import {XHRBackend} from '@angular/http';

import {InMemoryBackendService, SEED_DATA} from 'angular2-in-memory-web-api';
import {InMemoryDataService}               from './app/in-memory-data.service';

// The usual bootstrapping imports
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';


import {AppModule} from './app/app.module';


if (process.env.ENV === 'production') {
    enableProdMode();
}


/*
 bootstrap(AppComponent, [
 appRouterProviders,
 HTTP_PROVIDERS
 ]);
 */
platformBrowserDynamic().bootstrapModule(AppModule);
