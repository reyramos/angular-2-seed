import {Component, OnInit} from '@angular/core';

//library
import {Hero} from './class/Hero';
import {HeroDetailComponent} from './heroeDetail/hero-detail.component';
import {HeroService} from './services/hero.service';


@Component({
    selector: 'my-app',
    template: require('./app.component.html'),
    //to import styles convert to raw files after less conversion
    styles: [require('!!raw!less!./app.component.less')],
    directives: [HeroDetailComponent],
    providers: [HeroService]
})


export class AppComponent implements OnInit {
    title = 'Tour of Heroes';
    heroes:Hero[];
    selectedHero:Hero;

    constructor(private heroService:HeroService) {
    }

    getHeroes() {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    ngOnInit() {
        this.getHeroes();
    }


    onSelect(hero:Hero) {
        this.selectedHero = hero;
    }

}

