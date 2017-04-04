import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutsModule} from "../../../components/layouts/layouts.module";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {SharedModule} from "primeng/components/common/shared";
import {ButtonModule} from "primeng/components/button/button";
import {MultiSelectModule} from "primeng/components/multiselect/multiselect";
import {FileUploadModule} from "primeng/components/fileupload/fileupload";
import {DataGridModule} from "primeng/components/datagrid/datagrid";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {FormsHelperModule} from "../../../components/forms/forms-helpers.module";
import {RolesListComponent} from "./roles/roles-list/roles-list.component";
import {ManageRoleComponent} from "./roles/manage-role/manage-role.component";
import {UsersListComponent} from "./users/users-list/users-list.component";
import {ManageUserComponent} from "./users/manage-user/manage-user.component";
import {SecurityIndexComponent} from "./security-index";
import {SecurityRoutingModule} from "./security-routing.module";

@NgModule({
  imports: [
    CommonModule,
    LayoutsModule,
    DataTableModule,
    SharedModule,
    ButtonModule,
    MultiSelectModule,
    FileUploadModule,
    DataGridModule,
    ReactiveFormsModule,
    FormsHelperModule,
    FormsModule,
    SecurityRoutingModule
  ],
  declarations: [RolesListComponent,
    ManageRoleComponent, UsersListComponent, ManageUserComponent,
    SecurityIndexComponent],
})
export class SecurityModule {
}
