/**
 * Created by reyra on 8/14/2016.
 */

import {Routes, RouterModule} from '@angular/router'
import {DashboardComponent} from "./dashboard.component";
// import {PageNotFoundComponent} from "../404/page-not-found.compoent";


const dashboardRoutes: Routes = [
	{
		path     : '',
		component: DashboardComponent
	},
	// { path: '**', component: PageNotFoundComponent }

];


export const dashboardRouting = RouterModule.forChild(dashboardRoutes);
