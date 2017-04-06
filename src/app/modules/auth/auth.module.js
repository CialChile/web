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
var auth_routing_module_1 = require("./auth-routing.module");
var login_component_1 = require("./login/login.component");
var logout_component_1 = require("./logout/logout.component");
var forms_1 = require("@angular/forms");
var auth_service_1 = require("./services/auth.service");
var auth_guard_service_1 = require("./guards/auth-guard.service");
var login_guard_service_1 = require("./guards/login-guard.service");
var user_service_1 = require("./services/user.service");
var admin_guard_1 = require("./guards/admin.guard");
var client_guard_1 = require("./guards/client.guard");
var permission_guard_1 = require("./guards/permission.guard");
var forms_helpers_module_1 = require("../../components/forms/forms-helpers.module");
var AuthModule = (function () {
    function AuthModule() {
    }
    return AuthModule;
}());
AuthModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            auth_routing_module_1.AuthRoutingModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            forms_helpers_module_1.FormsHelperModule
        ],
        providers: [auth_service_1.AuthService, auth_guard_service_1.AuthGuard, login_guard_service_1.LoginGuard, user_service_1.UserService, admin_guard_1.AdminGuard, client_guard_1.ClientGuard, permission_guard_1.PermissionGuard],
        declarations: [login_component_1.LoginComponent, logout_component_1.LogoutComponent],
    })
], AuthModule);
exports.AuthModule = AuthModule;
