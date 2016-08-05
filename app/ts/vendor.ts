/**
 * Created by reyra on 5/6/2016.
 */
// Polyfills
import 'es6-shim/es6-shim';
import 'zone.js/dist/zone';
import 'reflect-metadata/Reflect';
//
//
// if (process.env.ENV === 'build') {
//     // Production
//
// } else {
//     // Development
//
//     Error['stackTraceLimit'] = Infinity;
//
//     require('zone.js/dist/long-stack-trace-zone');
// }




// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/router';
import '@angular/http';

// RxJS
import 'rxjs';
