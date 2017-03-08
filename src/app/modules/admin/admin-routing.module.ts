import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../auth/guards/auth-guard.service';
import {AdminDashboardComponent} from "./dashboard/admin-dashboard.component";
import {AdminGuard} from "../auth/guards/admin.guard";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {AdminIndexComponent} from "./index/admin-index.component";
import {AdminCompaniesComponent} from "./companies/admin-companies.component";

const routes: Routes = [
  {
    path: 'admin',
    component: AdminIndexComponent,
    canActivate: [AuthGuard, AdminGuard],
   // canActivateChild: [AuthGuard, AdminGuard, PermissionGuard],
    children: [
      {
        path: '',
        component: AdminDashboardComponent,
      },
      {
        path: 'companies',
        component: AdminCompaniesComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRoutingModule {
}
