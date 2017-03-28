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
import {ConfigurationIndexComponent} from "./configuration/configuration-index.component";
import {ManageBrandsComponent} from "./configuration/brands/manage-brands/manage-brands.component";
import {BrandsListComponent} from "./configuration/brands/brands-list/brands-list.component";
import {BrandModelsListComponent} from "./configuration/brands/brand-models-list/brand-models-list.component";
import {ManageBrandModelsComponent} from "./configuration/brands/manage-brand-models/manage-brand-models.component";
import {CategoriesListComponent} from "./configuration/categories/categories-list/categories-list.component";
import {ManageCategoriesComponent} from "./configuration/categories/manage-categories/manage-categories.component";
import {SubcategoriesListComponent} from "./configuration/categories/subcategories-list/subcategories-list.component";
import {ManageSubcategoriesComponent} from "./configuration/categories/manage-subcategories/manage-subcategories.component";
import {WorkplacesListComponent} from "./configuration/workplaces/workplaces-list/workplaces-list.component";
import {ManageWorkplacesComponent} from "./configuration/workplaces/manage-workplaces/manage-workplaces.component";
import {AssetConfigComponent} from "./configuration/assets/asset-config/asset-config.component";
import {StatusListComponent} from "./configuration/status/status-list/status-list.component";
import {ManageStatusComponent} from "./configuration/status/manage-status/manage-status.component";

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
      },
      {
        path: 'configuration',
        component: ConfigurationIndexComponent,
        canActivateChild: [AuthGuard, ClientGuard, PermissionGuard],
        children: [
          {
            path: 'brands',
            component: BrandsListComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-config-assets-brands.list'
            },
          },
          {
            path: 'brands/create',
            component: ManageBrandsComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-config-assets-brands.store'
            }
          },
          {
            path: 'brands/brand-models',
            component: BrandModelsListComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-config-assets-brand-models.list'
            }
          },
          {
            path: 'brands/brand-models/create',
            component: ManageBrandModelsComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-config-assets-brand-models.store'
            }
          },
          {
            path: 'brands/:id/brand-models/:brandModelId',
            component: ManageBrandModelsComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-config-assets-brand-models.store'
            }
          },
          {
            path: 'brands/:id',
            component: ManageBrandsComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-config-assets-brands.show'
            }
          },
          {
            path: 'categories',
            component: CategoriesListComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-config-assets-categories.list'
            },
          },
          {
            path: 'categories/create',
            component: ManageCategoriesComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-config-assets-categories.store'
            }
          },
          {
            path: 'categories/subcategories',
            component: SubcategoriesListComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-config-assets-subcategories.list'
            }
          },
          {
            path: 'categories/subcategories/create',
            component: ManageSubcategoriesComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-config-assets-subcategories.store'
            }
          },
          {
            path: 'categories/:id/subcategories/:subcategoryId',
            component: ManageSubcategoriesComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-config-assets-subcategories.show'
            }
          },
          {
            path: 'categories/:id',
            component: ManageCategoriesComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-config-assets-categories.show'
            }
          },
          {
            path: 'workplaces',
            component: WorkplacesListComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-config-assets-workplaces.list'
            },
          },
          {
            path: 'workplaces/create',
            component: ManageWorkplacesComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-config-assets-workplaces.store'
            }
          },
          {
            path: 'workplaces/:id',
            component: ManageWorkplacesComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-config-assets-workplaces.show'
            }
          },
          {
            path: 'assets',
            component: AssetConfigComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-assets.show'
            },
          },
          {
            path: 'status',
            component: StatusListComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-config-status.list'
            },
          },
          {
            path: 'status/create',
            component: ManageStatusComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-config-status.store'
            }
          },
          {
            path: 'status/:id',
            component: ManageStatusComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-config-status.show'
            }
          },
        ]
      }
    ]
  }
];
