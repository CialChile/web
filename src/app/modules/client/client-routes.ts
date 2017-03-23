import {AuthGuard} from '../auth/guards/auth-guard.service';
import {Routes} from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {ClientGuard} from "../auth/guards/client.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MyProfileComponent} from "./profile/my-profile/my-profile.component";
import {ChangePasswordComponent} from "./profile/change-password/change-password.component";
import {WorkersListComponent} from "./rrhh/workers/workers-list/workers-list.component";
import {SecurityIndexComponent} from "./security/security-index";
import {RolesListComponent} from "./security/roles/roles-list/roles-list.component";
import {UsersListComponent} from "./security/users/users-list/users-list.component";
import {ManageRoleComponent} from "./security/roles/manage-role/manage-role.component";
import {ManageUserComponent} from "./security/users/manage-user/manage-user.component";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RrhhIndexComponent} from "./rrhh/rrhh-index";
import {ManageWorkerComponent} from "./rrhh/workers/manage-worker/manage-worker.component";
import {WorkerDetailsComponent} from "./rrhh/workers/worker-details/worker-details.component";
import {AssetsIndexComponent} from "./assets/assets-index.component";
import {AssetsListComponent} from "./assets/assets-list/assets-list.component";
import {ManageAssetsComponent} from "./assets/manage-assets/manage-assets.component";

export const routes: Routes = [
  {
    path: 'client',
    component: IndexComponent,
    canActivate: [AuthGuard, ClientGuard],
    canActivateChild: [AuthGuard, ClientGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'my-profile',
        component: MyProfileComponent,
      },
      {
        path: 'my-profile/change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'rrhh',
        component: RrhhIndexComponent,
        canActivateChild: [AuthGuard, ClientGuard, PermissionGuard],
        children: [
          {
            path: 'workers',
            component: WorkersListComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-rrhh-workers.list'
            }
          },
          {
            path: 'workers/create',
            component: ManageWorkerComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-rrhh-workers.store'
            }
          },
          {
            path: 'workers/:id',
            component: ManageWorkerComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-rrhh-workers.show'
            }
          },
          {
            path: 'workers/:id/info',
            component: WorkerDetailsComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-security-users.show'
            }
          }
        ]
      },
      {
        path: 'assets',
        component: AssetsIndexComponent,
        canActivateChild: [AuthGuard, ClientGuard, PermissionGuard],
        children: [
          {
            path: '',
            component: AssetsListComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-assets.list'
            }
          },
          {
            path: 'create',
            component: ManageAssetsComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-assets.store'
            }
          },
        ]
      },
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
      }

    ]
  }
];
