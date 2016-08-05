import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router-deprecated';


import {Hero} from '../class/Hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from '../services/hero.service';


@Component({
	selector  : 'my-heroes',
	template  : require('./views/heroes.component.html'),
	styles    : [require('!!raw!less!./less/heroes.component.less')],
	directives: [HeroDetailComponent]
})

export class HeroesComponent implements OnInit {
	heroes:Hero[];
	selectedHero:Hero;

	constructor(private router:Router,
	            private heroService:HeroService) {
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

	gotoDetail() {
		this.router.navigate(['HeroDetail', {id: this.selectedHero.id}]);
	}
}



