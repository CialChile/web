var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientRoutingModule } from "./client-routing.module";
import { MenuModule } from "../menu/menu.module";
import { UserCanModule } from "../../directives/user-can/user-can.module";
import { IndexComponent } from './index/index.component';
import { LayoutsModule } from "../../components/layouts/layouts.module";
import { RrhhModule } from "./rrhh/rrhh.module";
import { ProfileModule } from "./profile/profile.module";
import { SecurityModule } from "./security/security.module";
import { AssetsModule } from "./assets/assets.module";
import { ConfigurationModule } from "./configuration/configuration.module";
var ClientModule = (function () {
    function ClientModule() {
    }
    return ClientModule;
}());
ClientModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ClientRoutingModule,
            MenuModule,
            UserCanModule,
            RrhhModule,
            ProfileModule,
            SecurityModule,
            AssetsModule,
            LayoutsModule,
            ConfigurationModule
        ],
        declarations: [DashboardComponent, IndexComponent],
    })
], ClientModule);
export { ClientModule };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/client.module.js.map