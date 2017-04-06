"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_component_1 = require("../index/index.component");
var auth_guard_service_1 = require("../../auth/guards/auth-guard.service");
var client_guard_1 = require("../../auth/guards/client.guard");
var activities_index_component_1 = require("./activities-index.component");
var permission_guard_1 = require("../../auth/guards/permission.guard");
var activities_list_component_1 = require("./activities-list/activities-list.component");
var manage_activity_component_1 = require("./manage-activity/manage-activity.component");
var activity_details_component_1 = require("./activity-details/activity-details.component");
exports.routes = [
    {
        path: 'client',
        component: index_component_1.IndexComponent,
        canActivate: [auth_guard_service_1.AuthGuard, client_guard_1.ClientGuard],
        canActivateChild: [auth_guard_service_1.AuthGuard, client_guard_1.ClientGuard],
        children: [
            {
                path: 'activities',
                component: activities_index_component_1.ActivitiesIndexComponent,
                canActivateChild: [auth_guard_service_1.AuthGuard, client_guard_1.ClientGuard, permission_guard_1.PermissionGuard],
                children: [
                    {
                        path: '',
                        component: activities_list_component_1.ActivitiesListComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-activities.list'
                        }
                    },
                    {
                        path: 'create',
                        component: manage_activity_component_1.ManageActivityComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-activities.store'
                        }
                    },
                    {
                        path: ':id',
                        component: manage_activity_component_1.ManageActivityComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-activities.update'
                        }
                    },
                    {
                        path: ':id/info',
                        component: activity_details_component_1.ActivityDetailsComponent,
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
