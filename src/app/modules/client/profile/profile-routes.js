"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_component_1 = require("../index/index.component");
var auth_guard_service_1 = require("../../auth/guards/auth-guard.service");
var client_guard_1 = require("../../auth/guards/client.guard");
var my_profile_component_1 = require("./my-profile/my-profile.component");
var change_password_component_1 = require("./change-password/change-password.component");
exports.routes = [
    {
        path: 'client',
        component: index_component_1.IndexComponent,
        canActivate: [auth_guard_service_1.AuthGuard, client_guard_1.ClientGuard],
        canActivateChild: [auth_guard_service_1.AuthGuard, client_guard_1.ClientGuard],
        children: [
            {
                path: 'my-profile',
                component: my_profile_component_1.MyProfileComponent,
            },
            {
                path: 'my-profile/change-password',
                component: change_password_component_1.ChangePasswordComponent
            },
        ]
    }
];
