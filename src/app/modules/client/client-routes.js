"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_guard_service_1 = require("../auth/guards/auth-guard.service");
var index_component_1 = require("./index/index.component");
var client_guard_1 = require("../auth/guards/client.guard");
var dashboard_component_1 = require("./dashboard/global-dashboard/dashboard.component.ts");
exports.routes = [
    {
        path: 'client',
        component: index_component_1.IndexComponent,
        canActivate: [auth_guard_service_1.AuthGuard, client_guard_1.ClientGuard],
        canActivateChild: [auth_guard_service_1.AuthGuard, client_guard_1.ClientGuard],
        children: [
            {
                path: 'dashboard',
                component: dashboard_component_1.DashboardComponent
            }
        ]
    }
];
