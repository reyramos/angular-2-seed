// Imports for loading & configuring the in-memory web api
import { XHRBackend } from '@angular/http';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { InMemoryDataService }               from './app/in-memory-data.service';

// The usual bootstrapping imports
import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';


import {AppComponent} from './app/app.component';
import {appRouterProviders} from './app/app.routes';


if (process.env.ENV === 'production') {
	enableProdMode();
}


bootstrap(AppComponent, [
	appRouterProviders,
	HTTP_PROVIDERS
]);
