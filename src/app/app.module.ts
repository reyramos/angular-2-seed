// Imports for loading & configuring the in-memory web api
import {HttpModule, XHRBackend} from '@angular/http';

import {InMemoryBackendService, SEED_DATA} from 'angular2-in-memory-web-api';
import {InMemoryDataService}               from './in-memory-data.service';


/**
 * Created by ramor11 on 8/10/2016.
 */
import {NgModule, NgModuleFactoryLoader}  from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';
import {AsyncNgModuleLoader} from './utils/async-ng-module-loader';
// import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';


//application declarations
import {AppComponent}  from './app.component';
//routing
import {routing, appRoutingProviders}        from './app.routing';

import {LoginComponent} from './login/login.component';
//services
import {DialogService}  from './services/dialog.service';

//modules
import {HeroesModule} from './heroes/heroes.module';
import {DashboardModule} from "./dashboard/dashboard.module";

@NgModule({
	imports     : [
		BrowserModule,
		FormsModule,
		routing,
		HttpModule,
		HeroesModule,
		DashboardModule
	],
	declarations: [
		AppComponent,
		LoginComponent
	],
	providers   : [
		appRoutingProviders,
		DialogService,
		// { provide: LocationStrategy, useClass: HashLocationStrategy },
		{provide: NgModuleFactoryLoader, useClass: AsyncNgModuleLoader},
		{provide: XHRBackend, useClass: InMemoryBackendService}, // in-mem server
		{provide: SEED_DATA, useClass: InMemoryDataService}     // in-mem server data
	],
	bootstrap   : [AppComponent]
})


export class AppModule {

}
