import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutsModule} from "../../../components/layouts/layouts.module";
import {TemplatesListComponent} from "./templates-list/templates-list.component";
import {TemplatesRoutingModule} from "./templates-routing.module";
import {TemplatesIndexComponent} from "./templates-index.component";
import {ProgramTypesListComponent} from './program-types-list/program-types-list.component';
import {DataTableModule} from "primeng/components/datatable/datatable";
import {SharedModule} from "primeng/components/common/shared";
import {MultiSelectModule} from "primeng/components/multiselect/multiselect";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {FormsHelperModule} from "../../../components/forms/forms-helpers.module";
import { ManageProgramTypeComponent } from './manage-program-type/manage-program-type.component';
import {ManageTemplateComponent} from "./manage-template/manage-template.component";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {TemplatesModule as TemplateHelpersModule} from "../../../components/templates/templates.module";
import {ButtonModule} from "primeng/components/button/button";

@NgModule({
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    LayoutsModule,
    DataTableModule,
    SharedModule,
    MultiSelectModule,
    ReactiveFormsModule,
    FormsHelperModule,
    FormsModule,
    DropdownModule,
    TemplateHelpersModule,
    ButtonModule
  ],
  declarations: [TemplatesListComponent, TemplatesIndexComponent,
    ProgramTypesListComponent, ManageProgramTypeComponent,ManageTemplateComponent]
})
export class TemplatesModule {
}
