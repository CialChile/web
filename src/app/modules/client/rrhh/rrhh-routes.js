"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_component_1 = require("../index/index.component");
var auth_guard_service_1 = require("../../auth/guards/auth-guard.service");
var client_guard_1 = require("../../auth/guards/client.guard");
var permission_guard_1 = require("../../auth/guards/permission.guard");
var rrhh_index_1 = require("./rrhh-index");
var manage_worker_component_1 = require("./workers/manage-worker/manage-worker.component");
var workers_list_component_1 = require("./workers/workers-list/workers-list.component");
var worker_details_component_1 = require("./workers/worker-details/worker-details.component");
exports.routes = [
    {
        path: 'client',
        component: index_component_1.IndexComponent,
        canActivate: [auth_guard_service_1.AuthGuard, client_guard_1.ClientGuard],
        canActivateChild: [auth_guard_service_1.AuthGuard, client_guard_1.ClientGuard],
        children: [
            {
                path: 'rrhh',
                component: rrhh_index_1.RrhhIndexComponent,
                canActivateChild: [auth_guard_service_1.AuthGuard, client_guard_1.ClientGuard, permission_guard_1.PermissionGuard],
                children: [
                    {
                        path: 'workers',
                        component: workers_list_component_1.WorkersListComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-rrhh-workers.list'
                        }
                    },
                    {
                        path: 'workers/create',
                        component: manage_worker_component_1.ManageWorkerComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-rrhh-workers.store'
                        }
                    },
                    {
                        path: 'workers/:id',
                        component: manage_worker_component_1.ManageWorkerComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-rrhh-workers.show'
                        }
                    },
                    {
                        path: 'workers/:id/info',
                        component: worker_details_component_1.WorkerDetailsComponent,
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
