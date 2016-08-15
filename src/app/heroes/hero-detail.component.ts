import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router, ActivatedRoute, Params}       from '@angular/router';

import {Hero, HeroService}  from './hero.service';
import {Subscription}       from 'rxjs/Subscription';

@Component({
	template: require('./views/hero-detail.component.html'),

})
export class HeroDetailComponent implements OnInit, OnDestroy {
	@Input() hero: Hero;
	@Output() close = new EventEmitter();
	error: any;
	navigated = false; // true if navigated here

	private sub: Subscription;

	constructor(private route: ActivatedRoute,
	            private router: Router,
	            private service: HeroService) {
	}

	ngOnInit() {
		this.sub = this.route.params.subscribe((params: Params) => {
			let id = +params['id']; // (+) converts string 'id' to a number
			this.service.getHero(id).then(hero => this.hero = hero);
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	gotoHeroes() {
		let heroId = this.hero ? this.hero.id : null;
		// Pass along the hero id if available
		// so that the HeroList component can select that hero.
		this.router.navigate(['/heroes', {id: heroId, foo: 'foo'}]);
	}
}
