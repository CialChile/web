import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component'
import {AuthGuard} from "../auth/guards/auth-guard.service";
import {ClientGuard} from "../auth/guards/client.guard";

const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard,ClientGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class ClientRoutingModule {
}
