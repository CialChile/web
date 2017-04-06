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
import {DataTableModule} from "primeng/components/datatable/datatable";
import {SharedModule} from "primeng/components/common/shared";
import {ButtonModule} from "primeng/components/button/button";
import {MultiSelectModule} from "primeng/components/multiselect/multiselect";
import {InputSwitchModule} from "primeng/components/inputswitch/inputswitch";
import {ConfirmDialogModule} from "primeng/components/confirmdialog/confirmdialog";
import {ConfirmationService} from "primeng/components/common/api";
import {TextMaskModule} from "angular2-text-mask";
import {AdminProfileModule} from "./profile/admin-profile.module";
import {AdminSecurityModule} from "./security/admin-security.module";
import {LightboxModule} from "primeng/components/lightbox/lightbox";
import {TemplatesModule} from "./templates/templates.module";
import {AdminConfigurationModule} from "./configuration/admin-configuration.module";

@NgModule({
  imports: [
    CommonModule,
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
    InputSwitchModule,
    TextMaskModule,
    AdminProfileModule,
    AdminSecurityModule,
    LightboxModule,
    TemplatesModule,
    AdminConfigurationModule,
    AdminRoutingModule,

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
export class AdminModule {
}


