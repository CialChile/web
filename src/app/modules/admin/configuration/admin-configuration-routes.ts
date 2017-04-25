import {Routes} from "@angular/router";
import {AuthGuard} from "../../auth/guards/auth-guard.service";
import {PermissionGuard} from "../../auth/guards/permission.guard";
import {AdminIndexComponent} from "../index/admin-index.component";
import {AdminGuard} from "../../auth/guards/admin.guard";
import {AdminConfigurationIndexComponent} from "./admin-configuration-index.component";
import {IndustriesListComponent} from "./industries/industries-list/industries-list.component";
export const routes: Routes = [
  {
    path: 'console',
    component: AdminIndexComponent,
    canActivate: [AuthGuard, AdminGuard],
    canActivateChild: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'configuration',
        component: AdminConfigurationIndexComponent,
        canActivateChild: [AuthGuard, AdminGuard, PermissionGuard],
        children: [
          {
            path: 'industries',
            component: IndustriesListComponent,
            data: {
              redirectTo: 'admin/dashboard',
              permission: 'admin-configuration-industries.list'
            }
          }
        ]
      },
    ]
  }
];
