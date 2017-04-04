import {Routes} from "@angular/router";
import {IndexComponent} from "../index/index.component";
import {AuthGuard} from "../../auth/guards/auth-guard.service";
import {ClientGuard} from "../../auth/guards/client.guard";
import {SecurityIndexComponent} from "./security-index";
import {PermissionGuard} from "../../auth/guards/permission.guard";
import {RolesListComponent} from "./roles/roles-list/roles-list.component";
import {ManageRoleComponent} from "./roles/manage-role/manage-role.component";
import {UsersListComponent} from "./users/users-list/users-list.component";
import {ManageUserComponent} from "./users/manage-user/manage-user.component";
export const routes: Routes = [
  {
    path: 'client',
    component: IndexComponent,
    canActivate: [AuthGuard, ClientGuard],
    canActivateChild: [AuthGuard, ClientGuard],
    children: [
      {
        path: 'security',
        component: SecurityIndexComponent,
        canActivateChild: [AuthGuard, ClientGuard, PermissionGuard],
        children: [
          {
            path: 'roles',
            component: RolesListComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-security-roles.list'
            }
          },
          {
            path: 'roles/create',
            component: ManageRoleComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-security-roles.store'
            }
          },
          {
            path: 'roles/:id',
            component: ManageRoleComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-security-roles.show'
            }
          },
          {
            path: 'users',
            component: UsersListComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-security-users.list'
            }
          },
          {
            path: 'users/create',
            component: ManageUserComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-security-users.store'
            }
          },
          {
            path: 'users/:id',
            component: ManageUserComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-security-users.update'
            }
          },
        ]
      },

    ]
  }
];
