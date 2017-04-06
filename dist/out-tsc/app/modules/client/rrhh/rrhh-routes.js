import { IndexComponent } from "../index/index.component";
import { AuthGuard } from "../../auth/guards/auth-guard.service";
import { ClientGuard } from "../../auth/guards/client.guard";
import { PermissionGuard } from "../../auth/guards/permission.guard";
import { RrhhIndexComponent } from "./rrhh-index";
import { ManageWorkerComponent } from "./workers/manage-worker/manage-worker.component";
import { WorkersListComponent } from "./workers/workers-list/workers-list.component";
import { WorkerDetailsComponent } from "./workers/worker-details/worker-details.component";
export var routes = [
    {
        path: 'client',
        component: IndexComponent,
        canActivate: [AuthGuard, ClientGuard],
        canActivateChild: [AuthGuard, ClientGuard],
        children: [
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
        ]
    }
];
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/rrhh/rrhh-routes.js.map