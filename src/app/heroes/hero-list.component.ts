import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Hero, HeroService }  from './hero.service';
import { Subscription }       from 'rxjs/Subscription';

@Component({
    template: require('./views/hero-list.component.html')
})


export class HeroListComponent implements OnInit, OnDestroy {
    heroes: Hero[];

    private selectedId: number;
    private sub: Subscription;

    constructor(
        private service: HeroService,
        private route: ActivatedRoute,
        private router: Router) {}

    ngOnInit() {
        this.sub = this.route
            .params
            .subscribe(params => {
                this.selectedId = +params['id'];
                this.service.getHeroes()
                    .then(heroes => this.heroes = heroes);
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    isSelected(hero: Hero) { return hero.id === this.selectedId; }

    onSelect(hero: Hero) {
        this.router.navigate(['/hero', hero.id]);
    }

}
