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
var forms_1 = require("@angular/forms");
var forms_helpers_module_1 = require("../../../components/forms/forms-helpers.module");
var layouts_module_1 = require("../../../components/layouts/layouts.module");
var shared_1 = require("primeng/components/common/shared");
var button_1 = require("primeng/components/button/button");
var multiselect_1 = require("primeng/components/multiselect/multiselect");
var fileupload_1 = require("primeng/components/fileupload/fileupload");
var change_password_component_1 = require("./change-password/change-password.component");
var my_profile_component_1 = require("./my-profile/my-profile.component");
var form_directives_module_1 = require("../../../directives/forms/form-directives.module");
var profile_routing_module_1 = require("./profile-routing.module");
var ProfileModule = (function () {
    function ProfileModule() {
    }
    return ProfileModule;
}());
ProfileModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_helpers_module_1.FormsHelperModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            layouts_module_1.LayoutsModule,
            shared_1.SharedModule,
            button_1.ButtonModule,
            multiselect_1.MultiSelectModule,
            fileupload_1.FileUploadModule,
            form_directives_module_1.FormDirectivesModule,
            profile_routing_module_1.ProfileRoutingModule
        ],
        declarations: [my_profile_component_1.MyProfileComponent, change_password_component_1.ChangePasswordComponent]
    })
], ProfileModule);
exports.ProfileModule = ProfileModule;
