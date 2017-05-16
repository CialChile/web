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
var dashboard_component_1 = require("./dashboard/global-dashboard/dashboard.component.ts");
var client_routing_module_1 = require("./client-routing.module");
var menu_module_1 = require("../menu/menu.module");
var user_can_module_1 = require("../../directives/user-can/user-can.module");
var index_component_1 = require("./index/index.component");
var layouts_module_1 = require("../../components/layouts/layouts.module");
var rrhh_module_1 = require("./rrhh/rrhh.module");
var profile_module_1 = require("./profile/profile.module");
var security_module_1 = require("./security/security.module");
var assets_module_1 = require("./assets/assets.module");
var configuration_module_1 = require("./configuration/configuration.module");
var ClientModule = (function () {
    function ClientModule() {
    }
    return ClientModule;
}());
ClientModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            client_routing_module_1.ClientRoutingModule,
            menu_module_1.MenuModule,
            user_can_module_1.UserCanModule,
            rrhh_module_1.RrhhModule,
            profile_module_1.ProfileModule,
            security_module_1.SecurityModule,
            assets_module_1.AssetsModule,
            layouts_module_1.LayoutsModule,
            configuration_module_1.ConfigurationModule
        ],
        declarations: [dashboard_component_1.DashboardComponent, index_component_1.IndexComponent],
    })
], ClientModule);
exports.ClientModule = ClientModule;
