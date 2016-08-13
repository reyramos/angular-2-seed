import {Routes, RouterModule} from '@angular/router';



import {loginRoutes, authProviders}  from './login/login.routing';

import {CanDeactivateGuard} from './services/can-deactivate-guard.service';


import { load } from './utils/async-ng-module-loader';


const crisisCenterRoutes: Routes = [
	{
		path      : '',
		redirectTo: '/heroes',
		pathMatch : 'full'
	},
	{
		path   : 'crisis-center',
		// loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule',
		// loadChildren: require('es6-promise!./crisis-center/crisis-center.module'),
		// component: require('es6-promise!./crisis-center/crisis-center.module')('CrisisCenterModule'),
		// loadChildren: System.import('./crisis-center/crisis-center.module').then((comp: any) => {
		// 	return comp;
		// }),
		loadChildren: load(() => new Promise(resolve => {
			(require as any).ensure([], (require: any) => {
				resolve(require('./crisis-center/crisis-center.module').CrisisCenterModule);
			})
		}))
	}
];



const appRoutes: Routes = [
	...loginRoutes,
	...crisisCenterRoutes
];

export const appRoutingProviders: any[] = [
	authProviders,
	CanDeactivateGuard
];

export const routing = RouterModule.forRoot(appRoutes);
