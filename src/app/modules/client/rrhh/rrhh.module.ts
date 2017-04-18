import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutsModule} from "../../../components/layouts/layouts.module";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {SharedModule} from "primeng/components/common/shared";
import {ButtonModule} from "primeng/components/button/button";
import {MultiSelectModule} from "primeng/components/multiselect/multiselect";
import {CalendarModule} from "primeng/components/calendar/calendar";
import {FileUploadModule} from "primeng/components/fileupload/fileupload";
import {DataGridModule} from "primeng/components/datagrid/datagrid";
import {ToggleButtonModule} from "primeng/components/togglebutton/togglebutton";
import {PanelModule} from "primeng/components/panel/panel";
import {DialogModule} from "primeng/components/dialog/dialog";
import {WorkersListComponent} from "./workers/workers-list/workers-list.component";
import {ManageWorkerComponent} from "./workers/manage-worker/manage-worker.component";
import {RrhhIndexComponent} from "./rrhh-index";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {FormsHelperModule} from "../../../components/forms/forms-helpers.module";
import {WorkerDetailsComponent} from './workers/worker-details/worker-details.component';
import {TabViewModule} from 'primeng/primeng';
import {RrhhRoutingModule} from "./rrhh-routing.module";
import {LightboxModule} from "primeng/components/lightbox/lightbox";
import { ManageWorkerCertificationsComponent } from './workers/manage-worker/manage-worker-certifications/manage-worker-certifications.component';
import {AutoCompleteModule} from "primeng/components/autocomplete/autocomplete";

@NgModule({
  imports: [
    CommonModule,
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
    RrhhRoutingModule,
    LightboxModule,
    AutoCompleteModule

  ],
  declarations: [WorkersListComponent, ManageWorkerComponent, RrhhIndexComponent, WorkerDetailsComponent, ManageWorkerCertificationsComponent]
})
export class RrhhModule {
}
