/**
 * Created by reyra on 8/14/2016.
 */
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {dashboardRouting} from "./dashboard.routing";




@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		dashboardRouting
	]
})
export class DashboardModule {
}
