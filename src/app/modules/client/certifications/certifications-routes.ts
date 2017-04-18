import {IndexComponent} from "../index/index.component";
import {AuthGuard} from "../../auth/guards/auth-guard.service";
import {ClientGuard} from "../../auth/guards/client.guard";
import {Routes} from "@angular/router";
import {CertificationsIndexComponent} from "./certifications-index.component";
import {PermissionGuard} from "../../auth/guards/permission.guard";
import {CertificationsListComponent} from "./certifications-list/certifications-list.component";
import {ManageCertificationsComponent} from "./manage-certifications/manage-certifications.component";
import {CertificationsDetailsComponent} from "./certifications-details/certifications-details.component";
import {InstitutesListComponent} from "./config/institutes-list/institutes-list.component";
import {ManageInstitutesComponent} from "./config/manage-institutes/manage-institutes.component";
export const routes: Routes = [
  {
    path: 'client',
    component: IndexComponent,
    canActivate: [AuthGuard, ClientGuard],
    canActivateChild: [AuthGuard, ClientGuard],
    children: [
      {
        path: 'certifications',
        component: CertificationsIndexComponent,
        canActivateChild: [AuthGuard, ClientGuard, PermissionGuard],
        children: [
          {
            path: 'list',
            component: CertificationsListComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-certifications-certifications.list'
            }
          },
          {
            path: 'create',
            component: ManageCertificationsComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-certifications-certifications.store'
            }
          },
          {
            path: ':id',
            component: ManageCertificationsComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-certifications-certifications.update'
            }
          },
          {
            path: ':id/info',
            component: CertificationsDetailsComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-certifications-certifications.show'
            }
          },
          {
            path: 'config',
            canActivateChild: [AuthGuard, ClientGuard, PermissionGuard],
            children: [
              {
                path: 'institutes',
                component: InstitutesListComponent,
                data: {
                  redirectTo: 'client/dashboard',
                  permission: 'client-certifications-institutes.list'
                }
              },
              {
                path: 'institutes/create',
                component: ManageInstitutesComponent,
                data: {
                  redirectTo: 'client/dashboard',
                  permission: 'client-certifications-institutes.store'
                }
              },
              {
                path: 'institutes/:id',
                component: ManageInstitutesComponent,
                data: {
                  redirectTo: 'client/dashboard',
                  permission: 'client-certifications-institutes.update'
                }
              },
            ]
          }
        ]
      },
    ]
  }
];
