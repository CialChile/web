import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminDashboardComponent} from "./dashboard/admin-dashboard.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {MenuModule} from "../menu/menu.module";
import {UserCanModule} from "../../directives/user-can/user-can.module";
import {AdminIndexComponent} from "./index/admin-index.component";
import {AdminCompaniesComponent} from './companies/admin-companies.component';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MenuModule,
    UserCanModule,
    DataTablesModule
  ],
  declarations: [AdminIndexComponent, AdminDashboardComponent, AdminCompaniesComponent],
})
export class AdminModule {
}


