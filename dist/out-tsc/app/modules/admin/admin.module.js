var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from "./dashboard/admin-dashboard.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { MenuModule } from "../menu/menu.module";
import { UserCanModule } from "../../directives/user-can/user-can.module";
import { AdminIndexComponent } from "./index/admin-index.component";
import { AdminCompaniesComponent } from './companies/admin-companies.component';
import { AdminCreateCompaniesComponent } from './companies/admin-create-companies/admin-create-companies.component';
import { AdminEditCompaniesComponent } from './companies/admin-edit-companies/admin-edit-companies.component';
import { FormsHelperModule } from "../../components/forms/forms-helpers.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminListCompaniesComponent } from "./companies/admin-list-companies/admin-list-companies.component";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { SharedModule } from "primeng/components/common/shared";
import { ButtonModule } from "primeng/components/button/button";
import { MultiSelectModule } from "primeng/components/multiselect/multiselect";
import { InputSwitchModule } from "primeng/components/inputswitch/inputswitch";
import { ConfirmDialogModule } from "primeng/components/confirmdialog/confirmdialog";
import { ConfirmationService } from "primeng/components/common/api";
var AdminModule = (function () {
    function AdminModule() {
    }
    return AdminModule;
}());
AdminModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            AdminRoutingModule,
            MenuModule,
            UserCanModule,
            FormsHelperModule,
            FormsModule,
            ReactiveFormsModule,
            ConfirmDialogModule,
            DataTableModule,
            SharedModule,
            ButtonModule,
            MultiSelectModule,
            InputSwitchModule
        ],
        declarations: [
            AdminIndexComponent,
            AdminDashboardComponent,
            AdminCompaniesComponent,
            AdminListCompaniesComponent,
            AdminCreateCompaniesComponent,
            AdminEditCompaniesComponent
        ],
        providers: [ConfirmationService]
    })
], AdminModule);
export { AdminModule };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/admin/admin.module.js.map