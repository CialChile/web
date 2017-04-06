import { IndexComponent } from "../index/index.component";
import { AuthGuard } from "../../auth/guards/auth-guard.service";
import { ClientGuard } from "../../auth/guards/client.guard";
import { ActivitiesIndexComponent } from "./activities-index.component";
import { PermissionGuard } from "../../auth/guards/permission.guard";
import { ActivitiesListComponent } from "./activities-list/activities-list.component";
import { ManageActivityComponent } from "./manage-activity/manage-activity.component";
import { ActivityDetailsComponent } from "./activity-details/activity-details.component";
export var routes = [
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
                            permission: 'client-activities.list'
                        }
                    },
                    {
                        path: 'create',
                        component: ManageActivityComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-activities.store'
                        }
                    },
                    {
                        path: ':id',
                        component: ManageActivityComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-activities.update'
                        }
                    },
                    {
                        path: ':id/info',
                        component: ActivityDetailsComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-activities.show'
                        }
                    },
                ]
            },
        ]
    }
];
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/activities/activities-routes.js.map