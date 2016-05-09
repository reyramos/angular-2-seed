import {Component, OnInit} from '@angular/core';
import {Hero} from '../class/Hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from '../services/hero.service';


@Component({
	selector  : 'my-heroes',
	template  : require('./views/heroes.component.html'),
	styles    : [require('./less/heroes.component.less')],
	directives: [HeroDetailComponent]
})


export class HeroesComponent implements OnInit {
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


