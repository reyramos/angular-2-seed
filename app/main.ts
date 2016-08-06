import { bootstrap }    from '@angular/platform-browser-dynamic';
// import {ROUTER_PROVIDERS}       from '@angular/router';
// // Add these symbols to override the `LocationStrategy`
// import {provide, enableProdMode}                from '@angular/core';
// import {LocationStrategy, HashLocationStrategy} from '@angular/common';

// enableProdMode();

// require('css/styles.css');

import {AppComponent} from './ts/app.component';


bootstrap(AppComponent).catch(err => console.error(err));


// bootstrap(AppComponent, [
// 	ROUTER_PROVIDERS,
// 	provide(LocationStrategy, {useClass: HashLocationStrategy})
// ]);
