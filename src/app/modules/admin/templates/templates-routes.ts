import {Routes} from "@angular/router";
import {AuthGuard} from "../../auth/guards/auth-guard.service";
import {PermissionGuard} from "../../auth/guards/permission.guard";
import {AdminIndexComponent} from "../index/admin-index.component";
import {AdminGuard} from "../../auth/guards/admin.guard";
import {TemplatesIndexComponent} from "./templates-index.component";
import {TemplatesListComponent} from "./templates-list/templates-list.component";
import {ProgramTypesListComponent} from "./program-types-list/program-types-list.component";
import {ManageProgramTypeComponent} from "./manage-program-type/manage-program-type.component";
import {ManageTemplateComponent} from "./manage-template/manage-template.component";
export const routes: Routes = [
  {
    path: 'console/activities',
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
          },
          {
            path: 'create',
            component: ManageTemplateComponent,
            data: {
              redirectTo: 'admin/dashboard',
              permission: 'admin-templates.store'
            }
          },
          {
            path: ':id',
            component: ManageTemplateComponent,
            data: {
              redirectTo: 'admin/dashboard',
              permission: 'admin-templates.update'
            }
          }
        ]
      },
      {
        path: 'program-types',
        component: TemplatesIndexComponent,
        canActivateChild: [AuthGuard, AdminGuard, PermissionGuard],
        children: [
          {
            path: '',
            component: ProgramTypesListComponent,
            data: {
              redirectTo: 'admin/dashboard',
              permission: 'admin-program-types.list'
            }
          },
          {
            path: 'create',
            component: ManageProgramTypeComponent,
            data: {
              redirectTo: 'admin/dashboard',
              permission: 'admin-program-types.store'
            }
          },
          {
            path: ':id',
            component: ManageProgramTypeComponent,
            data: {
              redirectTo: 'admin/dashboard',
              permission: 'admin-program-types.update'
            }
          }
        ]
      },
    ]
  }
];
