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
import { EtrackUserCanDirective } from "./etrack-user-can.directive";
export var UserCanModule = (function () {
    function UserCanModule() {
    }
    UserCanModule = __decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: [EtrackUserCanDirective],
            exports: [EtrackUserCanDirective]
        }), 
        __metadata('design:paramtypes', [])
    ], UserCanModule);
    return UserCanModule;
}());
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/directives/user-can/user-can.module.js.map