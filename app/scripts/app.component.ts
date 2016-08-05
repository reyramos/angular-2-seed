import {Component} from '@angular/core';

//library
import {Hero} from './class/Hero';
import {HeroDetailComponent} from './heroeDetail/hero-detail.component';


const HEROES:Hero[] = [
    {id: 11, name: 'Mr. Nice'},
    {id: 12, name: 'Narco'},
    {id: 13, name: 'Bombasto'},
    {id: 14, name: 'Celeritas'},
    {id: 15, name: 'Magneta'},
    {id: 16, name: 'RubberMan'},
    {id: 17, name: 'Dynama'},
    {id: 18, name: 'Dr IQ'},
    {id: 19, name: 'Magma'},
    {id: 20, name: 'Tornado'}
];


@Component({
    selector: 'my-app',
    template: require('./app.component.html'),
    //to import styles convert to raw files after less conversion
    styles: [require('!!raw!less!./app.component.less')],
    directives: [HeroDetailComponent]
})


export class AppComponent {
    title = 'Tour of Heroes';
    heroes = HEROES;
    selectedHero:Hero;

    onSelect(hero:Hero) {
        this.selectedHero = hero;
    }

}

