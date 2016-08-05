import {Component} from '@angular/core';

//library
import {HeroesComponent} from './heroes/heroes.component';
import {HeroService} from './services/hero.service';


@Component({
    selector: 'my-app',
    template: require('./app.component.html'),
    directives: [HeroesComponent],
    providers: [HeroService]
})


export class AppComponent {
    title = 'Tour of Heroes';
}

