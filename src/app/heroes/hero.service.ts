import { Injectable } from '@angular/core';

import {HEROES} from './mock-heroes';


export class Hero {
    constructor(public id: number, public name: string) { }
}


let heroesPromise = Promise.resolve(HEROES);

@Injectable()
export class HeroService {
    getHeroes() { return heroesPromise; }

    getHero(id: number | string) {
        return heroesPromise
            .then(heroes => heroes.find(hero => hero.id === +id));
    }
}
