import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';


import 'rxjs/add/operator/toPromise';

import {Hero} from '../class/Hero';


@Injectable()
export class HeroService {
	private heroesUrl = 'app/heroes';  // URL to web api

	constructor(private http: Http) {
	}


	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	// Add new Hero
	private post(hero: Hero): Promise<Hero> {
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http
			.post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
			.toPromise()
			.then(res => res.json().data)
			.catch(this.handleError);
	}

	// Update existing Hero
	private put(hero: Hero) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let url = `${this.heroesUrl}/${hero.id}`;

		return this.http
			.put(url, JSON.stringify(hero), {headers: headers})
			.toPromise()
			.then(() => hero)
			.catch(this.handleError);
	}

	save(hero: Hero): Promise<Hero>  {
		if (hero.id) {
			return this.put(hero);
		}
		return this.post(hero);
	}


	delete(hero: Hero) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let url = `${this.heroesUrl}/${hero.id}`;

		return this.http
			.delete(url, {headers: headers})
			.toPromise()
			.catch(this.handleError);
	}

	getHeroes() {
		return this.http.get(this.heroesUrl)
			.toPromise()
			.then(response => response.json().data as Hero[])
			.catch(this.handleError);
	}


	// // See the "Take it slow" appendix
	// getHeroesSlowly() {
	//     return new Promise<Hero[]>(resolve =>
	//         setTimeout(() => resolve(HEROES), 2000) // 2 seconds
	//     );
	// }

	getHero(id: number) {
		return this.getHeroes()
			.then(heroes => heroes.find(hero => hero.id === id));
	}
}
