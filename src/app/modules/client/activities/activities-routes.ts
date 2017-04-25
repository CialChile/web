import {Routes} from "@angular/router";
import {IndexComponent} from "../index/index.component";
import {AuthGuard} from "../../auth/guards/auth-guard.service";
import {ClientGuard} from "../../auth/guards/client.guard";
import {ActivitiesIndexComponent} from "./activities-index.component";
import {PermissionGuard} from "../../auth/guards/permission.guard";
import {ActivitiesListComponent} from "./activities-list/activities-list.component";
import {ManageActivityComponent} from "./manage-activity/manage-activity.component";
import {ActivityDetailsComponent} from "./activity-details/activity-details.component";
import {TemplatesListComponent} from "./templates/templates-list/templates-list.component";
import {ManageTemplateComponent} from "./templates/manage-template/manage-template.component";
export const routes: Routes = [
  {
    path: 'client',
    component: IndexComponent,
    canActivate: [AuthGuard, ClientGuard],
    canActivateChild: [AuthGuard, ClientGuard],
    children: [
      {
        path: 'activities',
        component: ActivitiesIndexComponent,
        canActivateChild: [AuthGuard, ClientGuard, PermissionGuard],
        children: [
          {
            path: '',
            component: ActivitiesListComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-activities-activities.list'
            }
          },
          {
            path: 'create',
            component: ManageActivityComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-activities-activities.store'
            }
          },
          {
            path: 'templates',
            component: TemplatesListComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-activities-templates.list'
            }
          },
          {
            path: ':id',
            component: ManageActivityComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-activities-activities.update'
            }
          },
          {
            path: ':id/info',
            component: ActivityDetailsComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-activities-activities.show'
            }
          },
          {
            path: 'templates/create',
            component: ManageTemplateComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-activities-templates.store'
            }
          },
          {
            path: 'templates/:id',
            component: ManageTemplateComponent,
            data: {
              redirectTo: 'client/dashboard',
              permission: 'client-activities-templates.update'
            }
          },
        ]
      },
    ]
  }
];
