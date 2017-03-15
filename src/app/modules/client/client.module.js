"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var dashboard_component_1 = require('./dashboard/dashboard.component');
var client_routing_module_1 = require("./client-routing.module");
var menu_module_1 = require("../menu/menu.module");
var user_can_module_1 = require("../../directives/user-can/user-can.module");
var index_component_1 = require('./index/index.component');
var forms_helpers_module_1 = require("../../components/forms/forms-helpers.module");
var forms_1 = require("@angular/forms");
var my_profile_component_1 = require("./profile/my-profile/my-profile.component");
var change_password_component_1 = require('./profile/change-password/change-password.component');
var equal_validator_directive_1 = require("../../directives/forms/equal-validator.directive");
var workers_list_component_1 = require('./rrhh/workers-list/workers-list.component');
var angular_datatables_module_1 = require("../../directives/datatable/angular-datatables.module");
var roles_list_component_1 = require('./security/roles/roles-list/roles-list.component');
var users_list_component_1 = require('./security/users/users-list/users-list.component');
var security_index_1 = require("./security/security-index");
var manage_role_component_1 = require("./security/roles/manage-role/manage-role.component");
var manage_user_component_1 = require("./security/users/manage-user/manage-user.component");
var ClientModule = (function () {
    function ClientModule() {
    }
    ClientModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                client_routing_module_1.ClientRoutingModule,
                menu_module_1.MenuModule,
                angular_datatables_module_1.DataTablesModule,
                user_can_module_1.UserCanModule,
                forms_helpers_module_1.FormsHelperModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
            ],
            declarations: [dashboard_component_1.DashboardComponent, my_profile_component_1.MyProfileComponent, index_component_1.IndexComponent,
                change_password_component_1.ChangePasswordComponent, equal_validator_directive_1.EqualValidator, workers_list_component_1.WorkersListComponent, roles_list_component_1.RolesListComponent,
                manage_role_component_1.ManageRoleComponent, users_list_component_1.UsersListComponent, manage_user_component_1.ManageUserComponent, security_index_1.SecurityIndexComponent],
        })
    ], ClientModule);
    return ClientModule;
}());
exports.ClientModule = ClientModule;
