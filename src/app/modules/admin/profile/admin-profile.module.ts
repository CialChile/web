import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormsHelperModule} from "../../../components/forms/forms-helpers.module";
import {LayoutsModule} from "../../../components/layouts/layouts.module";
import {SharedModule} from "primeng/components/common/shared";
import {ButtonModule} from "primeng/components/button/button";
import {MultiSelectModule} from "primeng/components/multiselect/multiselect";
import {FileUploadModule} from "primeng/components/fileupload/fileupload";
import {EqualValidator} from "../../../directives/forms/equal-validator.directive";
import {AdminProfileComponent} from "./my-profile/admin-profile.component";
import {AdminChangePasswordComponent} from "./change-password/admin-change-password.component";
import {FormDirectivesModule} from "../../../directives/forms/form-directives.module";

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
    FormDirectivesModule
  ],
  declarations: [AdminProfileComponent, AdminChangePasswordComponent]
})
export class AdminProfileModule {
}
