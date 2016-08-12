import {Routes, RouterModule} from '@angular/router';

import { loginRoutes, authProviders }  from './login/login.routing';

import { CanDeactivateGuard } from './services/can-deactivate-guard.service';

const crisisCenterRoutes: Routes = [
    {
        path: '',
        redirectTo: '/heroes',
        pathMatch: 'full'
    },
    {
        path: 'crisis-center',
        loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule'
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
