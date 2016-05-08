import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router-deprecated';

import {Hero} from '../class/Hero';
import {HeroService} from '../services/hero.service';


@Component({
	selector: 'my-dashboard',
	template: require('html!./views/dashboard.component.html'),
	styles: [function () {
		return require('raw!./less/dashboard.component')
	}()],
})

export class DashboardComponent implements OnInit {
	heroes:Hero[] = [];

	constructor(
		private router: Router,
		private heroService:HeroService) {
	}

	ngOnInit() {
		this.heroService.getHeroes()
			.then(heroes => this.heroes = heroes.slice(1, 5));
	}

	gotoDetail() { /* not implemented yet */
	}
}
