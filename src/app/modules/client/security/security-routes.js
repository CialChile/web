"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_component_1 = require("../index/index.component");
var auth_guard_service_1 = require("../../auth/guards/auth-guard.service");
var client_guard_1 = require("../../auth/guards/client.guard");
var security_index_1 = require("./security-index");
var permission_guard_1 = require("../../auth/guards/permission.guard");
var roles_list_component_1 = require("./roles/roles-list/roles-list.component");
var manage_role_component_1 = require("./roles/manage-role/manage-role.component");
var users_list_component_1 = require("./users/users-list/users-list.component");
var manage_user_component_1 = require("./users/manage-user/manage-user.component");
exports.routes = [
    {
        path: 'client',
        component: index_component_1.IndexComponent,
        canActivate: [auth_guard_service_1.AuthGuard, client_guard_1.ClientGuard],
        canActivateChild: [auth_guard_service_1.AuthGuard, client_guard_1.ClientGuard],
        children: [
            {
                path: 'security',
                component: security_index_1.SecurityIndexComponent,
                canActivateChild: [auth_guard_service_1.AuthGuard, client_guard_1.ClientGuard, permission_guard_1.PermissionGuard],
                children: [
                    {
                        path: 'roles',
                        component: roles_list_component_1.RolesListComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-security-roles.list'
                        }
                    },
                    {
                        path: 'roles/create',
                        component: manage_role_component_1.ManageRoleComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-security-roles.store'
                        }
                    },
                    {
                        path: 'roles/:id',
                        component: manage_role_component_1.ManageRoleComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-security-roles.show'
                        }
                    },
                    {
                        path: 'users',
                        component: users_list_component_1.UsersListComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-security-users.list'
                        }
                    },
                    {
                        path: 'users/create',
                        component: manage_user_component_1.ManageUserComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-security-users.store'
                        }
                    },
                    {
                        path: 'users/:id',
                        component: manage_user_component_1.ManageUserComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-security-users.update'
                        }
                    },
                ]
            },
        ]
    }
];
