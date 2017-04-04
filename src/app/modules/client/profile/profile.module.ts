import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormsHelperModule} from "../../../components/forms/forms-helpers.module";
import {LayoutsModule} from "../../../components/layouts/layouts.module";
import {SharedModule} from "primeng/components/common/shared";
import {ButtonModule} from "primeng/components/button/button";
import {MultiSelectModule} from "primeng/components/multiselect/multiselect";
import {FileUploadModule} from "primeng/components/fileupload/fileupload";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {FormDirectivesModule} from "../../../directives/forms/form-directives.module";
import {ProfileRoutingModule} from "./profile-routing.module";

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
    FormDirectivesModule,
    ProfileRoutingModule
  ],
  declarations: [MyProfileComponent, ChangePasswordComponent]
})
export class ProfileModule {
}
