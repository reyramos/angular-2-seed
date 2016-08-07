import {Injectable} from '@angular/core';
import {HEROES} from '../mock-heroes';
import {Hero} from '../class/Hero';


@Injectable()
export class HeroService {
    getHeroes() {
        return Promise.resolve(HEROES);
    }

    // See the "Take it slow" appendix
    getHeroesSlowly() {
        return new Promise<Hero[]>(resolve =>
            setTimeout(() => resolve(HEROES), 2000) // 2 seconds
        );
    }

    getHero(id: number) {
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }
}
