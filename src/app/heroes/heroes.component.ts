import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';


//library
import {Hero} from '../class/Hero';
import {HeroDetailComponent} from '../heroeDetail/hero-detail.component';
import {HeroService} from '../services/hero.service';


@Component({
    selector: 'my-heroes',
    template: require('./heroes.component.html'),
    //to import styles convert to raw files after less conversion
    styles: [require('!!raw!less!./heroes.component.less')],
    directives: [HeroDetailComponent],
    providers: [HeroService]

})


export class HeroesComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;

    constructor(
        private router: Router,
        private heroService: HeroService) { }

    getHeroes() {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    ngOnInit() {
        this.getHeroes();
    }

    onSelect(hero: Hero) { this.selectedHero = hero; }

    gotoDetail() {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
}
