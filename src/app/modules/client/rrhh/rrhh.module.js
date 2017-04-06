"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var layouts_module_1 = require("../../../components/layouts/layouts.module");
var datatable_1 = require("primeng/components/datatable/datatable");
var shared_1 = require("primeng/components/common/shared");
var button_1 = require("primeng/components/button/button");
var multiselect_1 = require("primeng/components/multiselect/multiselect");
var calendar_1 = require("primeng/components/calendar/calendar");
var fileupload_1 = require("primeng/components/fileupload/fileupload");
var datagrid_1 = require("primeng/components/datagrid/datagrid");
var togglebutton_1 = require("primeng/components/togglebutton/togglebutton");
var panel_1 = require("primeng/components/panel/panel");
var dialog_1 = require("primeng/components/dialog/dialog");
var workers_list_component_1 = require("./workers/workers-list/workers-list.component");
var manage_worker_component_1 = require("./workers/manage-worker/manage-worker.component");
var rrhh_index_1 = require("./rrhh-index");
var forms_1 = require("@angular/forms");
var forms_helpers_module_1 = require("../../../components/forms/forms-helpers.module");
var worker_details_component_1 = require("./workers/worker-details/worker-details.component");
var primeng_1 = require("primeng/primeng");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var rrhh_routing_module_1 = require("./rrhh-routing.module");
var RrhhModule = (function () {
    function RrhhModule() {
    }
    return RrhhModule;
}());
RrhhModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            layouts_module_1.LayoutsModule,
            datatable_1.DataTableModule,
            shared_1.SharedModule,
            button_1.ButtonModule,
            multiselect_1.MultiSelectModule,
            calendar_1.CalendarModule,
            fileupload_1.FileUploadModule,
            datagrid_1.DataGridModule,
            togglebutton_1.ToggleButtonModule,
            panel_1.PanelModule,
            dialog_1.DialogModule,
            forms_1.ReactiveFormsModule,
            forms_helpers_module_1.FormsHelperModule,
            forms_1.FormsModule,
            primeng_1.TabViewModule,
            ng2_bootstrap_1.DropdownModule.forRoot(),
            rrhh_routing_module_1.RrhhRoutingModule
        ],
        declarations: [workers_list_component_1.WorkersListComponent, manage_worker_component_1.ManageWorkerComponent, rrhh_index_1.RrhhIndexComponent, worker_details_component_1.WorkerDetailsComponent]
    })
], RrhhModule);
exports.RrhhModule = RrhhModule;
