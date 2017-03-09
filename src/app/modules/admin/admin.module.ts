import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminDashboardComponent} from "./dashboard/admin-dashboard.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {MenuModule} from "../menu/menu.module";
import {UserCanModule} from "../../directives/user-can/user-can.module";
import {AdminIndexComponent} from "./index/admin-index.component";
import {AdminCompaniesComponent} from './companies/admin-companies.component';
import {AdminCreateCompaniesComponent} from './companies/admin-create-companies/admin-create-companies.component';
import {AdminEditCompaniesComponent} from './companies/admin-edit-companies/admin-edit-companies.component';
import {FormsHelperModule} from "../../components/forms/forms-helpers.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminListCompaniesComponent} from "./companies/admin-list-companies/admin-list-companies.component";
import {ModalModule} from "ng2-bootstrap/modal";
import {DataTablesModule} from "../../directives/datatable/angular-datatables.module";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MenuModule,
    UserCanModule,
    DataTablesModule,
    FormsHelperModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule
  ],
  declarations: [
    AdminIndexComponent,
    AdminDashboardComponent,
    AdminCompaniesComponent,
    AdminListCompaniesComponent,
    AdminCreateCompaniesComponent,
    AdminEditCompaniesComponent
  ],
})
export class AdminModule {
}


