/**
 * Created by ramor11 on 8/12/2016.
 */
import { Routes, RouterModule }  from '@angular/router';

import { CrisisCenterComponent } from './crisis-center.component';
import { CrisisDetailComponent } from './crisis-detail.component';
import { CrisisListComponent }   from './crisis-list.component';
import { CrisisAdminComponent }  from './crisis-admin.component';

import { CanDeactivateGuard }    from '../services/can-deactivate-guard.service';
import { AuthGuard }             from '../login/auth-guard.service';
import { CrisisDetailResolve }   from './crisis-detail-resolve.service';


const crisisCenterRoutes: Routes = [
    {
        path: '',
        component: CrisisCenterComponent,
        children: [
            {
                path: 'admin',
                component: CrisisAdminComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':id',
                component: CrisisDetailComponent,
                canDeactivate: [CanDeactivateGuard],
                resolve: {
                    crisis: CrisisDetailResolve
                }
            },
            {
                path: '',
                component: CrisisListComponent
            }
        ]
    }
];

export const crisisCenterRouting = RouterModule.forChild(crisisCenterRoutes);
