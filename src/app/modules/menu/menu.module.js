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
var sidebar_component_1 = require("./sidebar/sidebar.component");
var topnavbar_component_1 = require("./topnavbar/topnavbar.component");
var sidebar_dropdown_component_1 = require("./sidebar/sidebar-dropdown/sidebar-dropdown.component");
var sidebar_item_component_1 = require("./sidebar/sidebar-item/sidebar-item.component");
var router_1 = require("@angular/router");
var footer_component_1 = require("../../components/footer/footer.component");
var topbar_dropdown_item_component_1 = require("./topnavbar/topbar-dropdown-item/topbar-dropdown-item.component");
var user_can_module_1 = require("../../directives/user-can/user-can.module");
var events_service_1 = require("../../services/events/events.service");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var MenuModule = (function () {
    function MenuModule() {
    }
    return MenuModule;
}());
MenuModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            router_1.RouterModule,
            dropdown_1.BsDropdownModule.forRoot(),
            user_can_module_1.UserCanModule
        ],
        declarations: [sidebar_component_1.SidebarComponent, topnavbar_component_1.TopNavBarComponent, footer_component_1.FooterComponent,
            sidebar_dropdown_component_1.SidebarDropdownComponent, sidebar_item_component_1.SidebarItemComponent, topbar_dropdown_item_component_1.TopbarDropdownItemComponent],
        providers: [events_service_1.EventsService],
        exports: [sidebar_component_1.SidebarComponent, topnavbar_component_1.TopNavBarComponent, footer_component_1.FooterComponent]
    })
], MenuModule);
exports.MenuModule = MenuModule;
