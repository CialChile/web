"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var layouts_module_1 = require("../../../components/layouts/layouts.module");
var datatable_1 = require("primeng/components/datatable/datatable");
var shared_1 = require("primeng/components/common/shared");
var button_1 = require("primeng/components/button/button");
var multiselect_1 = require("primeng/components/multiselect/multiselect");
var fileupload_1 = require("primeng/components/fileupload/fileupload");
var datagrid_1 = require("primeng/components/datagrid/datagrid");
var forms_1 = require("@angular/forms");
var forms_helpers_module_1 = require("../../../components/forms/forms-helpers.module");
var roles_list_component_1 = require("./roles/roles-list/roles-list.component");
var manage_role_component_1 = require("./roles/manage-role/manage-role.component");
var users_list_component_1 = require("./users/users-list/users-list.component");
var manage_user_component_1 = require("./users/manage-user/manage-user.component");
var security_index_1 = require("./security-index");
var security_routing_module_1 = require("./security-routing.module");
var SecurityModule = (function () {
    function SecurityModule() {
    }
    return SecurityModule;
}());
SecurityModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            layouts_module_1.LayoutsModule,
            datatable_1.DataTableModule,
            shared_1.SharedModule,
            button_1.ButtonModule,
            multiselect_1.MultiSelectModule,
            fileupload_1.FileUploadModule,
            datagrid_1.DataGridModule,
            forms_1.ReactiveFormsModule,
            forms_helpers_module_1.FormsHelperModule,
            forms_1.FormsModule,
            security_routing_module_1.SecurityRoutingModule
        ],
        declarations: [roles_list_component_1.RolesListComponent,
            manage_role_component_1.ManageRoleComponent, users_list_component_1.UsersListComponent, manage_user_component_1.ManageUserComponent,
            security_index_1.SecurityIndexComponent],
    })
], SecurityModule);
exports.SecurityModule = SecurityModule;
