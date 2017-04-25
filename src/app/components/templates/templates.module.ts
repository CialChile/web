import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeneralSectionComponent} from './general-section/general-section.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {FormsHelperModule} from "../forms/forms-helpers.module";
import {PersonsSectionComponent} from './persons-section/persons-section.component';
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {AutoCompleteModule} from "primeng/components/autocomplete/autocomplete";
import {EquipmentSectionComponent} from './equipment-section/equipment-section.component';
import {ProceduresSectionComponent} from './procedures-section/procedures-section.component';
import {DataTableModule} from "primeng/components/datatable/datatable";
import {DocumentsSectionComponent} from './documents-section/documents-section.component';
import {MultiSelectModule} from "primeng/components/multiselect/multiselect";
import {ClosureSectionComponent} from './closure-section/closure-section.component';
import {TimeSectionComponent} from './time-section/time-section.component';
import { ManageProgramComponent } from './time-section/manage-program/manage-program.component';
import { ManageValidationComponent } from './time-section/manage-validation/manage-validation.component';
import {CheckboxModule} from "primeng/components/checkbox/checkbox";
import {CalendarModule} from "primeng/components/calendar/calendar";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsHelperModule,
    FormsModule,
    DropdownModule,
    AutoCompleteModule,
    DataTableModule,
    MultiSelectModule,
    CheckboxModule,
    CalendarModule
  ],
  declarations: [GeneralSectionComponent, PersonsSectionComponent, EquipmentSectionComponent,
    ProceduresSectionComponent, DocumentsSectionComponent, ClosureSectionComponent,
    TimeSectionComponent,
    ManageProgramComponent,
    ManageValidationComponent],
  exports: [GeneralSectionComponent, PersonsSectionComponent, EquipmentSectionComponent,
    ProceduresSectionComponent, DocumentsSectionComponent, ClosureSectionComponent,
    TimeSectionComponent]

})
export class TemplatesModule {
}
