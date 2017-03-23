import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormsHelperModule} from "../../../components/forms/forms-helpers.module";
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
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {EqualValidator} from "../../../directives/forms/equal-validator.directive";
import {MyProfileComponent} from "./my-profile/my-profile.component";

@NgModule({
  imports: [
    CommonModule,
    FormsHelperModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutsModule,
    SharedModule,
    ButtonModule,
    MultiSelectModule,
    FileUploadModule,
  ],
  declarations: [MyProfileComponent, ChangePasswordComponent, EqualValidator]
})
export class ProfileModule {
}
