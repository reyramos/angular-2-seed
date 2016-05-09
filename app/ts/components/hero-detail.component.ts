import {Component, OnInit} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';

import {Hero} from '../class/Hero';
import {HeroService} from '../services/hero.service';


@Component({
	selector: 'my-hero-detail',
	template: require('./views/hero-detail.component.html'),

})


export class HeroDetailComponent implements OnInit {
	hero:Hero;

	constructor(private heroService:HeroService,
	            private routeParams:RouteParams) {
	}

	goBack() {
		window.history.back();
	}

	ngOnInit() {
		let id = +this.routeParams.get('id');
		this.heroService.getHero(id)
			.then(hero => this.hero = hero);
	}
}