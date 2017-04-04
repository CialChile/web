import {IndexComponent} from "../index/index.component";
import {AuthGuard} from "../../auth/guards/auth-guard.service";
import {ClientGuard} from "../../auth/guards/client.guard";
import {AssetsIndexComponent} from "./assets-index.component";
import {PermissionGuard} from "../../auth/guards/permission.guard";
import {AssetsListComponent} from "./assets-list/assets-list.component";
import {ManageAssetsComponent} from "./manage-assets/manage-assets.component";
import {AssetDetailsComponent} from "./asset-details/asset-details.component";
import {Routes} from "@angular/router";
export const routes: Routes = [
  {
    path: 'client',
    component: IndexComponent,
    canActivate: [AuthGuard, ClientGuard],
    canActivateChild: [AuthGuard, ClientGuard],
    children: [
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
          {
            path: ':id',
            component: ManageAssetsComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-assets.update'
            }
          },
          {
            path: ':id/info',
            component: AssetDetailsComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-assets.show'
            }
          },
        ]
      },
    ]
  }
];
