import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

//library
import {Hero} from '../class/Hero';
import {HeroService} from '../services/hero.service';


@Component({
	selector: 'my-hero-detail',
	template: require('./hero-detail.component.html'),
	template: require('./hero-detail.component.html'),
	//to import styles convert to raw files after less conversion
	styles  : [require('!!raw!less!./hero-detail.component.less')],
})


export class HeroDetailComponent implements OnInit, OnDestroy {
	hero: Hero;
	sub: any;

	constructor(private heroService: HeroService,
	            private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			let id = +params['id'];
			this.heroService.getHero(id)
				.then(hero => this.hero = hero);
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	goBack() {
		window.history.back();
	}
}
