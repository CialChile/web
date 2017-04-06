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
var admin_dashboard_component_1 = require("./dashboard/admin-dashboard.component");
var admin_routing_module_1 = require("./admin-routing.module");
var menu_module_1 = require("../menu/menu.module");
var user_can_module_1 = require("../../directives/user-can/user-can.module");
var admin_index_component_1 = require("./index/admin-index.component");
var admin_companies_component_1 = require("./companies/admin-companies.component");
var admin_create_companies_component_1 = require("./companies/admin-create-companies/admin-create-companies.component");
var admin_edit_companies_component_1 = require("./companies/admin-edit-companies/admin-edit-companies.component");
var forms_helpers_module_1 = require("../../components/forms/forms-helpers.module");
var forms_1 = require("@angular/forms");
var admin_list_companies_component_1 = require("./companies/admin-list-companies/admin-list-companies.component");
var datatable_1 = require("primeng/components/datatable/datatable");
var shared_1 = require("primeng/components/common/shared");
var button_1 = require("primeng/components/button/button");
var multiselect_1 = require("primeng/components/multiselect/multiselect");
var inputswitch_1 = require("primeng/components/inputswitch/inputswitch");
var confirmdialog_1 = require("primeng/components/confirmdialog/confirmdialog");
var api_1 = require("primeng/components/common/api");
var angular2_text_mask_1 = require("angular2-text-mask");
var admin_profile_module_1 = require("./profile/admin-profile.module");
var admin_security_module_1 = require("./security/admin-security.module");
var AdminModule = (function () {
    function AdminModule() {
    }
    return AdminModule;
}());
AdminModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            admin_routing_module_1.AdminRoutingModule,
            menu_module_1.MenuModule,
            user_can_module_1.UserCanModule,
            forms_helpers_module_1.FormsHelperModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            confirmdialog_1.ConfirmDialogModule,
            datatable_1.DataTableModule,
            shared_1.SharedModule,
            button_1.ButtonModule,
            multiselect_1.MultiSelectModule,
            inputswitch_1.InputSwitchModule,
            angular2_text_mask_1.TextMaskModule,
            admin_profile_module_1.AdminProfileModule,
            admin_security_module_1.AdminSecurityModule
        ],
        declarations: [
            admin_index_component_1.AdminIndexComponent,
            admin_dashboard_component_1.AdminDashboardComponent,
            admin_companies_component_1.AdminCompaniesComponent,
            admin_list_companies_component_1.AdminListCompaniesComponent,
            admin_create_companies_component_1.AdminCreateCompaniesComponent,
            admin_edit_companies_component_1.AdminEditCompaniesComponent
        ],
        providers: [api_1.ConfirmationService]
    })
], AdminModule);
exports.AdminModule = AdminModule;
