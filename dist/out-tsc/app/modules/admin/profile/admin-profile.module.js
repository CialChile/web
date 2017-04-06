var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormsHelperModule } from "../../../components/forms/forms-helpers.module";
import { LayoutsModule } from "../../../components/layouts/layouts.module";
import { SharedModule } from "primeng/components/common/shared";
import { ButtonModule } from "primeng/components/button/button";
import { MultiSelectModule } from "primeng/components/multiselect/multiselect";
import { FileUploadModule } from "primeng/components/fileupload/fileupload";
import { AdminProfileComponent } from "./my-profile/admin-profile.component";
import { AdminChangePasswordComponent } from "./change-password/admin-change-password.component";
import { FormDirectivesModule } from "../../../directives/forms/form-directives.module";
var AdminProfileModule = (function () {
    function AdminProfileModule() {
    }
    return AdminProfileModule;
}());
AdminProfileModule = __decorate([
    NgModule({
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
], AdminProfileModule);
export { AdminProfileModule };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/admin/profile/admin-profile.module.js.map