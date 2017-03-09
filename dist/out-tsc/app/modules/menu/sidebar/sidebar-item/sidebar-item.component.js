var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { MenuItem } from "../../types/MenuItem";
export var SidebarItemComponent = (function () {
    function SidebarItemComponent() {
    }
    SidebarItemComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(), 
        __metadata('design:type', MenuItem)
    ], SidebarItemComponent.prototype, "item", void 0);
    SidebarItemComponent = __decorate([
        Component({
            selector: 'app-sidebar-item',
            templateUrl: './sidebar-item.component.html',
            styleUrls: ['./sidebar-item.component.scss']
        }), 
        __metadata('design:paramtypes', [])
    ], SidebarItemComponent);
    return SidebarItemComponent;
}());
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/menu/sidebar/sidebar-item/sidebar-item.component.js.map