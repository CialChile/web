var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsIndexComponent } from "./assets-index.component";
import { AssetsListComponent } from './assets-list/assets-list.component';
import { ManageAssetsComponent } from './manage-assets/manage-assets.component';
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
import { RouterModule } from "@angular/router";
import { TabViewModule } from "primeng/components/tabview/tabview";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormsHelperModule } from "../../../components/forms/forms-helpers.module";
import { AutoCompleteModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { TextMaskModule } from "angular2-text-mask";
import { AssetDetailsComponent } from './asset-details/asset-details.component';
import { LightboxModule } from "primeng/components/lightbox/lightbox";
import { AssetsRoutingModule } from "./assets-routing.module";
import { GMapModule } from "primeng/components/gmap/gmap";
var AssetsModule = (function () {
    function AssetsModule() {
    }
    return AssetsModule;
}());
AssetsModule = __decorate([
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
            RouterModule,
            TabViewModule,
            AutoCompleteModule,
            DropdownModule,
            TextMaskModule,
            LightboxModule,
            AssetsRoutingModule,
            GMapModule
        ],
        declarations: [AssetsIndexComponent, AssetsListComponent, ManageAssetsComponent, AssetDetailsComponent]
    })
], AssetsModule);
export { AssetsModule };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/assets/assets.module.js.map