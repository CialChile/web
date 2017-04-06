import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutsModule} from "../../../components/layouts/layouts.module";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {SharedModule} from "primeng/components/common/shared";
import {ButtonModule} from "primeng/components/button/button";
import {DataGridModule} from "primeng/components/datagrid/datagrid";
import {MultiSelectModule} from "primeng/components/multiselect/multiselect";
import {ToggleButtonModule} from "primeng/components/togglebutton/togglebutton";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {FormsHelperModule} from "../../../components/forms/forms-helpers.module";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {PanelModule} from "primeng/components/panel/panel";
import { TextMaskModule } from 'angular2-text-mask';
import {GMapModule} from 'primeng/primeng';
import {AdminConfigurationRoutingModule} from "./admin-configuration-routing.module";
import {AdminConfigurationIndexComponent} from "./admin-configuration-index.component";
import {IndustriesListComponent} from "./industries/industries-list/industries-list.component";

@NgModule({
  imports: [
    CommonModule,
    LayoutsModule,
    DataTableModule,
    SharedModule,
    ButtonModule,
    MultiSelectModule,
    DataGridModule,
    ToggleButtonModule,
    ReactiveFormsModule,
    FormsHelperModule,
    FormsModule,
    DropdownModule,
    PanelModule,
    TextMaskModule,
    AdminConfigurationRoutingModule,
    GMapModule
  ],
  declarations: [AdminConfigurationIndexComponent, IndustriesListComponent]
})
export class AdminConfigurationModule {
}
