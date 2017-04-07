"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_guard_service_1 = require("../auth/guards/auth-guard.service");
var admin_dashboard_component_1 = require("./dashboard/admin-dashboard.component");
var admin_guard_1 = require("../auth/guards/admin.guard");
var admin_index_component_1 = require("./index/admin-index.component");
var admin_companies_component_1 = require("./companies/admin-companies.component");
var admin_create_companies_component_1 = require("./companies/admin-create-companies/admin-create-companies.component");
var admin_list_companies_component_1 = require("./companies/admin-list-companies/admin-list-companies.component");
var admin_edit_companies_component_1 = require("./companies/admin-edit-companies/admin-edit-companies.component");
var admin_profile_component_1 = require("./profile/my-profile/admin-profile.component");
var admin_change_password_component_1 = require("./profile/change-password/admin-change-password.component");
var admin_security_index_1 = require("./security/admin-security-index");
var admin_users_list_component_1 = require("./security/users/users-list/admin-users-list.component");
var admin_manage_user_component_1 = require("./security/users/manage-user/admin-manage-user.component");
exports.routes = [
    {
        path: 'admin',
        component: admin_index_component_1.AdminIndexComponent,
        canActivate: [auth_guard_service_1.AuthGuard, admin_guard_1.AdminGuard],
        canActivateChild: [auth_guard_service_1.AuthGuard, admin_guard_1.AdminGuard],
        children: [
            {
                path: 'dashboard',
                component: admin_dashboard_component_1.AdminDashboardComponent,
            },
            {
                path: 'my-profile',
                component: admin_profile_component_1.AdminProfileComponent,
            },
            {
                path: 'my-profile/change-password',
                component: admin_change_password_component_1.AdminChangePasswordComponent
            },
            {
                path: 'companies',
                component: admin_companies_component_1.AdminCompaniesComponent,
                children: [
                    {
                        path: '',
                        component: admin_list_companies_component_1.AdminListCompaniesComponent,
                    },
                    {
                        path: 'create',
                        component: admin_create_companies_component_1.AdminCreateCompaniesComponent,
                    },
                    {
                        path: ':id',
                        component: admin_edit_companies_component_1.AdminEditCompaniesComponent,
                    }
                ]
            },
            {
                path: 'security',
                component: admin_security_index_1.AdminSecurityIndexComponent,
                canActivateChild: [auth_guard_service_1.AuthGuard, admin_guard_1.AdminGuard],
                children: [
                    {
                        path: 'users',
                        component: admin_users_list_component_1.AdminUsersListComponent,
                    },
                    {
                        path: 'users/create',
                        component: admin_manage_user_component_1.AdminManageUserComponent,
                    },
                    {
                        path: 'users/:id',
                        component: admin_manage_user_component_1.AdminManageUserComponent,
                    },
                ]
            },
            {
                path: '**',
                component: admin_dashboard_component_1.AdminDashboardComponent
            }
        ]
    },
];
