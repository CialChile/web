import {Routes} from "@angular/router";
import {AuthGuard} from "../../auth/guards/auth-guard.service";
import {PermissionGuard} from "../../auth/guards/permission.guard";
import {AdminIndexComponent} from "../index/admin-index.component";
import {AdminGuard} from "../../auth/guards/admin.guard";
import {TemplatesIndexComponent} from "./templates-index.component";
import {TemplatesListComponent} from "./templates-list/templates-list.component";
export const routes: Routes = [
  {
    path: 'admin',
    component: AdminIndexComponent,
    canActivate: [AuthGuard, AdminGuard],
    canActivateChild: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'templates',
        component: TemplatesIndexComponent,
        canActivateChild: [AuthGuard, AdminGuard, PermissionGuard],
        children: [
          {
            path: '',
            component: TemplatesListComponent,
            data: {
              redirectTo: 'admin/dashboard',
              permission: 'admin-templates.list'
            }
          }
        ]
      },
    ]
  }
];
