/**
 * Created by reyra on 8/14/2016.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {HeroService, Hero} from "../heroes/hero.service";

import {Router} from '@angular/router';

@Component({
	template: require('./dashboard.component.html'),
	styles  : [require('./dashboard.component.less')]
})


export class DashboardComponent implements OnInit {
	heroes: Hero[] = [];

	constructor(private router: Router,
	            private heroService: HeroService) {
	}


	gotoDetail(hero: Hero) {

		let link = ['/hero', hero.id];
		this.router.navigate(link);
	}

	ngOnInit() {
		this.heroService.getHeroes()
			.then(heroes => this.heroes = heroes.slice(1, 5));
	}

}
