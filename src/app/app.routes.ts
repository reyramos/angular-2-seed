import {provideRouter, RouterConfig}  from '@angular/router';

import {HeroesComponent} from './heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './heroeDetail/hero-detail.component';

const routes: RouterConfig = [
	{
		path      : '',
		redirectTo: '/dashboard',
		pathMatch : 'full'
	},
	{
		path     : 'dashboard',
		component: DashboardComponent
	},
	{
		path     : 'detail/:id',
		component: HeroDetailComponent
	},
	{
		path     : 'heroes',
		component: HeroesComponent
	}
];

export const appRouterProviders = [
	provideRouter(routes)
];
