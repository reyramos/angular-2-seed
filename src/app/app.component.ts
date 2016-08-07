import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

//library
import {HeroService} from './services/hero.service';


require('../css/styles.css');

@Component({
    selector: 'my-app',
    template: require('./app.component.html'),
    styles: [require('!!raw!less!./app.component.less')],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        HeroService
    ]
})


export class AppComponent {
    title = 'Tour of Heroes';
}

