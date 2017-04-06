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
var assets_index_component_1 = require("./assets-index.component");
var assets_list_component_1 = require("./assets-list/assets-list.component");
var manage_assets_component_1 = require("./manage-assets/manage-assets.component");
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
var router_1 = require("@angular/router");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var tabview_1 = require("primeng/components/tabview/tabview");
var forms_1 = require("@angular/forms");
var forms_helpers_module_1 = require("../../../components/forms/forms-helpers.module");
var primeng_1 = require("primeng/primeng");
var primeng_2 = require("primeng/primeng");
var angular2_text_mask_1 = require("angular2-text-mask");
var asset_details_component_1 = require("./asset-details/asset-details.component");
var lightbox_1 = require("primeng/components/lightbox/lightbox");
var assets_routing_module_1 = require("./assets-routing.module");
var gmap_1 = require("primeng/components/gmap/gmap");
var AssetsModule = (function () {
    function AssetsModule() {
    }
    return AssetsModule;
}());
AssetsModule = __decorate([
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
            router_1.RouterModule,
            tabview_1.TabViewModule,
            ng2_bootstrap_1.DropdownModule.forRoot(),
            primeng_1.AutoCompleteModule,
            primeng_2.DropdownModule,
            angular2_text_mask_1.TextMaskModule,
            lightbox_1.LightboxModule,
            assets_routing_module_1.AssetsRoutingModule,
            gmap_1.GMapModule
        ],
        declarations: [assets_index_component_1.AssetsIndexComponent, assets_list_component_1.AssetsListComponent, manage_assets_component_1.ManageAssetsComponent, asset_details_component_1.AssetDetailsComponent]
    })
], AssetsModule);
exports.AssetsModule = AssetsModule;
