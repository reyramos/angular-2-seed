/**
 * Created by ramor11 on 8/12/2016.
 */
import { Routes, RouterModule } from '@angular/router';

import { HeroListComponent }    from './hero-list.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { PageNotFoundComponent }  from '../404/page-not-found.compoent';

const heroesRoutes: Routes = [
    { path: 'heroes',  component: HeroListComponent },
    { path: 'hero/:id', component: HeroDetailComponent },
    { path: '**', component: PageNotFoundComponent }

];

export const heroesRouting = RouterModule.forChild(heroesRoutes);
