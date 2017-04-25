import {AuthGuard} from '../auth/guards/auth-guard.service';
import {AdminDashboardComponent} from "./dashboard/admin-dashboard.component";
import {AdminGuard} from "../auth/guards/admin.guard";
import {AdminIndexComponent} from "./index/admin-index.component";
import {AdminCompaniesComponent} from "./companies/admin-companies.component";
import {AdminCreateCompaniesComponent} from "./companies/admin-create-companies/admin-create-companies.component";
import {AdminListCompaniesComponent} from "./companies/admin-list-companies/admin-list-companies.component";
import {Routes} from '@angular/router';
import {AdminEditCompaniesComponent} from "./companies/admin-edit-companies/admin-edit-companies.component";
import {AdminProfileComponent} from "./profile/my-profile/admin-profile.component";
import {AdminChangePasswordComponent} from "./profile/change-password/admin-change-password.component";
import {AdminSecurityIndexComponent} from "./security/admin-security-index";
import {ClientGuard} from "../auth/guards/client.guard";
import {AdminUsersListComponent} from "./security/users/users-list/admin-users-list.component";
import {AdminManageUserComponent} from "./security/users/manage-user/admin-manage-user.component";
import {AdminRolesListComponent} from "./security/roles/roles-list/admin-roles-list.component";
import {AdminManageRoleComponent} from "./security/roles/manage-role/admin-manage-role.component";

export const routes: Routes = [
  {
    path: 'console',
    component: AdminIndexComponent,
    canActivate: [AuthGuard, AdminGuard],
    canActivateChild: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
      },
      {
        path: 'my-profile',
        component: AdminProfileComponent,
      },
      {
        path: 'my-profile/change-password',
        component: AdminChangePasswordComponent
      },
      {
        path: 'companies',
        component: AdminCompaniesComponent,
        children: [
          {
            path: '',
            component: AdminListCompaniesComponent,
          },
          {
            path: 'create',
            component: AdminCreateCompaniesComponent,
          },
          {
            path: ':id',
            component: AdminEditCompaniesComponent,
          }
        ]
      },
      {
        path: 'security',
        component: AdminSecurityIndexComponent,
        canActivateChild: [AuthGuard, AdminGuard],
        children: [
          {
            path: 'users',
            component: AdminUsersListComponent,
          },
          {
            path: 'users/create',
            component: AdminManageUserComponent,
          },
          {
            path: 'users/:id',
            component: AdminManageUserComponent,
          },
          {
            path: 'roles',
            component: AdminRolesListComponent,
          },
          {
            path: 'roles/create',
            component: AdminManageRoleComponent,
          },
          {
            path: 'roles/:id',
            component: AdminManageRoleComponent,
          },
        ]
      },
      {
        path: '**',
        component: AdminDashboardComponent
      }
    ]
  },
];
