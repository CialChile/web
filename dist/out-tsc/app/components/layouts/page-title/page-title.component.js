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
var PageTitleComponent = (function () {
    function PageTitleComponent() {
    }
    PageTitleComponent.prototype.ngOnInit = function () {
    };
    return PageTitleComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], PageTitleComponent.prototype, "title", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PageTitleComponent.prototype, "breadcrumbs", void 0);
PageTitleComponent = __decorate([
    Component({
        selector: 'app-page-title',
        templateUrl: './page-title.component.html',
        styleUrls: ['./page-title.component.scss']
    }),
    __metadata("design:paramtypes", [])
], PageTitleComponent);
export { PageTitleComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/components/layouts/page-title/page-title.component.js.map