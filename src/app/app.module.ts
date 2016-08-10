/**
 * Created by ramor11 on 8/10/2016.
 */
import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';

// Imports for loading & configuring the in-memory web api
import {HttpModule, XHRBackend} from '@angular/http';

import {InMemoryBackendService, SEED_DATA} from 'angular2-in-memory-web-api';
import {InMemoryDataService}               from './in-memory-data.service';

//application declarations
import {AppComponent}  from './app.component';
//routing
import {routing}        from './app.routes';


import {DashboardComponent}  from './dashboard/dashboard.component';
import {HeroDetailComponent}  from './heroeDetail/hero-detail.component';
import {HeroesComponent}  from './heroes/heroes.component';
import {HeroSearchComponent}  from './heroesSearch/heroes-search.component';

//services
import {HeroService}  from './services/hero.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule
    ],
    declarations: [
        AppComponent,
        HeroesComponent,
        DashboardComponent,
        HeroDetailComponent,
        HeroSearchComponent
    ],
    providers: [
        HeroService,
        {provide: XHRBackend, useClass: InMemoryBackendService}, // in-mem server
        {provide: SEED_DATA, useClass: InMemoryDataService}     // in-mem server data
    ],
    bootstrap: [AppComponent]
})


export class AppModule {

}
