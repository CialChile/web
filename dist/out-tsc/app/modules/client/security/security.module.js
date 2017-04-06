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
import { RolesListComponent } from "./roles/roles-list/roles-list.component";
import { ManageRoleComponent } from "./roles/manage-role/manage-role.component";
import { UsersListComponent } from "./users/users-list/users-list.component";
import { ManageUserComponent } from "./users/manage-user/manage-user.component";
import { SecurityIndexComponent } from "./security-index";
import { SecurityRoutingModule } from "./security-routing.module";
var SecurityModule = (function () {
    function SecurityModule() {
    }
    return SecurityModule;
}());
SecurityModule = __decorate([
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
            SecurityRoutingModule
        ],
        declarations: [RolesListComponent,
            ManageRoleComponent, UsersListComponent, ManageUserComponent,
            SecurityIndexComponent],
    })
], SecurityModule);
export { SecurityModule };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/security/security.module.js.map