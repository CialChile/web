var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from "../../../components/layouts/layouts.module";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { SharedModule } from "primeng/components/common/shared";
import { ButtonModule } from "primeng/components/button/button";
import { MultiSelectModule } from "primeng/components/multiselect/multiselect";
import { FileUploadModule } from "primeng/components/fileupload/fileupload";
import { DataGridModule } from "primeng/components/datagrid/datagrid";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FormsHelperModule } from "../../../components/forms/forms-helpers.module";
import { RouterModule } from "@angular/router";
import { AdminManageUserComponent } from "./users/manage-user/admin-manage-user.component";
import { AdminUsersListComponent } from "./users/users-list/admin-users-list.component";
import { AdminSecurityIndexComponent } from "./admin-security-index";
import { AdminRolesListComponent } from "./roles/roles-list/admin-roles-list.component";
import { AdminManageRoleComponent } from "./roles/manage-role/admin-manage-role.component";
var AdminSecurityModule = (function () {
    function AdminSecurityModule() {
    }
    return AdminSecurityModule;
}());
AdminSecurityModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            LayoutsModule,
            DataTableModule,
            SharedModule,
            ButtonModule,
            MultiSelectModule,
            FileUploadModule,
            DataGridModule,
            ReactiveFormsModule,
            FormsHelperModule,
            FormsModule,
            RouterModule
        ],
        declarations: [
            AdminManageUserComponent, AdminUsersListComponent, AdminSecurityIndexComponent, AdminRolesListComponent, AdminManageRoleComponent
        ],
    })
], AdminSecurityModule);
export { AdminSecurityModule };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/admin/security/admin-security.module.js.map