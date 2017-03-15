"use strict";
var auth_guard_service_1 = require('../auth/guards/auth-guard.service');
var index_component_1 = require("./index/index.component");
var client_guard_1 = require("../auth/guards/client.guard");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var my_profile_component_1 = require("./profile/my-profile/my-profile.component");
var change_password_component_1 = require("./profile/change-password/change-password.component");
var workers_list_component_1 = require("./rrhh/workers-list/workers-list.component");
var security_index_1 = require("./security/security-index");
var roles_list_component_1 = require("./security/roles/roles-list/roles-list.component");
var users_list_component_1 = require("./security/users/users-list/users-list.component");
var manage_role_component_1 = require("./security/roles/manage-role/manage-role.component");
var manage_user_component_1 = require("./security/users/manage-user/manage-user.component");
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
            },
            {
                path: 'my-profile',
                component: my_profile_component_1.MyProfileComponent,
            },
            {
                path: 'my-profile/change-password',
                component: change_password_component_1.ChangePasswordComponent
            },
            {
                path: 'rrhh/workers',
                component: workers_list_component_1.WorkersListComponent,
            },
            {
                path: 'security',
                component: security_index_1.SecurityIndexComponent,
                canActivateChild: [auth_guard_service_1.AuthGuard, client_guard_1.ClientGuard],
                children: [
                    {
                        path: 'roles',
                        component: roles_list_component_1.RolesListComponent
                    },
                    {
                        path: 'roles/create',
                        component: manage_role_component_1.ManageRoleComponent
                    },
                    {
                        path: 'roles/:id',
                        component: manage_role_component_1.ManageRoleComponent
                    },
                    {
                        path: 'users',
                        component: users_list_component_1.UsersListComponent
                    },
                    {
                        path: 'users/create',
                        component: manage_user_component_1.ManageUserComponent
                    }
                ]
            }
        ]
    }
];
