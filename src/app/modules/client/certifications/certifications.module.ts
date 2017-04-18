import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CertificationsRoutingModule} from "./certifications-routing.module";
import {CertificationsIndexComponent} from "./certifications-index.component";
import {CertificationsListComponent} from './certifications-list/certifications-list.component';
import {CertificationsDetailsComponent} from './certifications-details/certifications-details.component';
import {ManageCertificationsComponent} from './manage-certifications/manage-certifications.component';
import {InstitutesListComponent} from './config/institutes-list/institutes-list.component';
import {ManageInstitutesComponent} from './config/manage-institutes/manage-institutes.component';
import {LayoutsModule} from "../../../components/layouts/layouts.module";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {SharedModule} from "primeng/components/common/shared";
import {ButtonModule} from "primeng/components/button/button";
import {MultiSelectModule} from "primeng/components/multiselect/multiselect";
import {CalendarModule} from "primeng/components/calendar/calendar";
import {FileUploadModule} from "primeng/components/fileupload/fileupload";
import {DataGridModule} from "primeng/components/datagrid/datagrid";
import {ToggleButtonModule} from "primeng/components/togglebutton/togglebutton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PanelModule} from "primeng/components/panel/panel";
import {DialogModule} from "primeng/components/dialog/dialog";
import {FormsHelperModule} from "../../../components/forms/forms-helpers.module";
import {TabViewModule} from "primeng/components/tabview/tabview";
import {AutoCompleteModule} from "primeng/components/autocomplete/autocomplete";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {TextMaskModule} from "angular2-text-mask";
import {RadioButtonModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    CertificationsRoutingModule,
    LayoutsModule,
    DataTableModule,
    SharedModule,
    ButtonModule,
    MultiSelectModule,
    CalendarModule,
    FileUploadModule,
    DataGridModule,
    ToggleButtonModule,
    PanelModule,
    DialogModule,
    ReactiveFormsModule,
    FormsHelperModule,
    FormsModule,
    TabViewModule,
    AutoCompleteModule,
    DropdownModule,
    TextMaskModule,
    RadioButtonModule
  ],
  declarations: [CertificationsIndexComponent, CertificationsListComponent, CertificationsDetailsComponent,
    ManageCertificationsComponent, InstitutesListComponent, ManageInstitutesComponent]
})
export class CertificationsModule {
}
