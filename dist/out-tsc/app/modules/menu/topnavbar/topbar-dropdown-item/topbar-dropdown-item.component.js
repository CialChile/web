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
var TopbarDropdownItemComponent = (function () {
    function TopbarDropdownItemComponent() {
    }
    TopbarDropdownItemComponent.prototype.ngOnInit = function () {
    };
    return TopbarDropdownItemComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], TopbarDropdownItemComponent.prototype, "item", void 0);
TopbarDropdownItemComponent = __decorate([
    Component({
        selector: 'app-topbar-dropdown-item',
        templateUrl: './topbar-dropdown-item.component.html',
        styleUrls: ['./topbar-dropdown-item.component.scss']
    }),
    __metadata("design:paramtypes", [])
], TopbarDropdownItemComponent);
export { TopbarDropdownItemComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/menu/topnavbar/topbar-dropdown-item/topbar-dropdown-item.component.js.map