var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from "../../../components/layouts/layouts.module";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { SharedModule } from "primeng/components/common/shared";
import { ButtonModule } from "primeng/components/button/button";
import { MultiSelectModule } from "primeng/components/multiselect/multiselect";
import { CalendarModule } from "primeng/components/calendar/calendar";
import { FileUploadModule } from "primeng/components/fileupload/fileupload";
import { DataGridModule } from "primeng/components/datagrid/datagrid";
import { ToggleButtonModule } from "primeng/components/togglebutton/togglebutton";
import { PanelModule } from "primeng/components/panel/panel";
import { DialogModule } from "primeng/components/dialog/dialog";
import { WorkersListComponent } from "./workers/workers-list/workers-list.component";
import { ManageWorkerComponent } from "./workers/manage-worker/manage-worker.component";
import { RrhhIndexComponent } from "./rrhh-index";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FormsHelperModule } from "../../../components/forms/forms-helpers.module";
import { WorkerDetailsComponent } from './workers/worker-details/worker-details.component';
import { TabViewModule } from 'primeng/primeng';
import { RrhhRoutingModule } from "./rrhh-routing.module";
import { LightboxModule } from "primeng/components/lightbox/lightbox";
var RrhhModule = (function () {
    function RrhhModule() {
    }
    return RrhhModule;
}());
RrhhModule = __decorate([
    NgModule({
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
        ],
        declarations: [WorkersListComponent, ManageWorkerComponent, RrhhIndexComponent, WorkerDetailsComponent]
    })
], RrhhModule);
export { RrhhModule };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/rrhh/rrhh.module.js.map