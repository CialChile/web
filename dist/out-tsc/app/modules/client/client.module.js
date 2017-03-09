var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientRoutingModule } from "./client-routing.module";
import { MenuModule } from "../menu/menu.module";
import { UserCanModule } from "../../directives/user-can/user-can.module";
export var ClientModule = (function () {
    function ClientModule() {
    }
    ClientModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                ClientRoutingModule,
                MenuModule,
                UserCanModule
            ],
            declarations: [DashboardComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], ClientModule);
    return ClientModule;
}());
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/client.module.js.map