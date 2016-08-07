import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Hero} from '../class/Hero';
import {HeroService} from '../services/hero.service';

@Component({
	selector   : 'my-dashboard',
	template: require('./dashboard.component.html'),
	styles: [require('!!raw!less!./dashboard.component.less')],
})


export class DashboardComponent implements OnInit {

	heroes: Hero[] = [];

	constructor(private router: Router,
	            private heroService: HeroService) {
	}

	ngOnInit() {
		this.heroService.getHeroes()
			.then(heroes => this.heroes = heroes.slice(1, 5));
	}

	gotoDetail(hero: Hero) {
		let link = ['/detail', hero.id];
		this.router.navigate(link);
	}
}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
