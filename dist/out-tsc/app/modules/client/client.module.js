var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientRoutingModule } from "./client-routing.module";
import { MenuModule } from "../menu/menu.module";
import { UserCanModule } from "../../directives/user-can/user-can.module";
import { IndexComponent } from './index/index.component';
import { FormsHelperModule } from "../../components/forms/forms-helpers.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MyProfileComponent } from "./profile/my-profile/my-profile.component";
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { EqualValidator } from "../../directives/forms/equal-validator.directive";
import { WorkersListComponent } from './rrhh/workers/workers-list/workers-list.component';
import { RolesListComponent } from './security/roles/roles-list/roles-list.component';
import { UsersListComponent } from './security/users/users-list/users-list.component';
import { SecurityIndexComponent } from "./security/security-index";
import { ManageRoleComponent } from "./security/roles/manage-role/manage-role.component";
import { ManageUserComponent } from "./security/users/manage-user/manage-user.component";
import { ManageWorkerComponent } from "./rrhh/workers/manage-worker/manage-worker.component";
import { RrhhIndexComponent } from "./rrhh/rrhh-index";
import { LayoutsModule } from "../../components/layouts/layouts.module";
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { ButtonModule } from "primeng/components/button/button";
import { MultiSelectModule } from "primeng/components/multiselect/multiselect";
var ClientModule = (function () {
    function ClientModule() {
    }
    return ClientModule;
}());
ClientModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ClientRoutingModule,
            MenuModule,
            UserCanModule,
            FormsHelperModule,
            FormsModule,
            ReactiveFormsModule,
            LayoutsModule,
            DataTableModule,
            SharedModule,
            ButtonModule,
            MultiSelectModule
        ],
        declarations: [DashboardComponent, MyProfileComponent, IndexComponent,
            ChangePasswordComponent, EqualValidator, WorkersListComponent, RolesListComponent,
            ManageRoleComponent, ManageWorkerComponent, UsersListComponent, ManageUserComponent,
            SecurityIndexComponent, RrhhIndexComponent],
    })
], ClientModule);
export { ClientModule };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/client.module.js.map