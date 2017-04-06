var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { TopNavBarComponent } from "./topnavbar/topnavbar.component";
import { SidebarDropdownComponent } from "./sidebar/sidebar-dropdown/sidebar-dropdown.component";
import { SidebarItemComponent } from "./sidebar/sidebar-item/sidebar-item.component";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "../../components/footer/footer.component";
import { TopbarDropdownItemComponent } from "./topnavbar/topbar-dropdown-item/topbar-dropdown-item.component";
import { UserCanModule } from "../../directives/user-can/user-can.module";
import { EventsService } from "../../services/events/events.service";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
var MenuModule = (function () {
    function MenuModule() {
    }
    return MenuModule;
}());
MenuModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            RouterModule,
            BsDropdownModule.forRoot(),
            UserCanModule
        ],
        declarations: [SidebarComponent, TopNavBarComponent, FooterComponent,
            SidebarDropdownComponent, SidebarItemComponent, TopbarDropdownItemComponent],
        providers: [EventsService],
        exports: [SidebarComponent, TopNavBarComponent, FooterComponent]
    })
], MenuModule);
export { MenuModule };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/menu/menu.module.js.map