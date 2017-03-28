import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssetsIndexComponent} from "./assets-index.component";
import {AssetsListComponent} from './assets-list/assets-list.component';
import {ManageAssetsComponent} from './manage-assets/manage-assets.component';
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
import {RouterModule} from "@angular/router";
import {DropdownModule as ng2Dropdown} from "ng2-bootstrap";
import {TabViewModule} from "primeng/components/tabview/tabview";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormsHelperModule} from "../../../components/forms/forms-helpers.module";
import {AutoCompleteModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {TextMaskModule} from "angular2-text-mask";

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
    RouterModule,
    TabViewModule,
    ng2Dropdown.forRoot(),
    AutoCompleteModule,
    DropdownModule,
    TextMaskModule
  ],
  declarations: [AssetsIndexComponent, AssetsListComponent, ManageAssetsComponent]
})
export class AssetsModule {
}
