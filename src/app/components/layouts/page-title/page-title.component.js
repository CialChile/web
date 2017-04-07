"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PageTitleComponent = (function () {
    function PageTitleComponent() {
    }
    PageTitleComponent.prototype.ngOnInit = function () {
    };
    return PageTitleComponent;
}());
__decorate([
    core_1.Input()
], PageTitleComponent.prototype, "title", void 0);
__decorate([
    core_1.Input()
], PageTitleComponent.prototype, "back", void 0);
__decorate([
    core_1.Input()
], PageTitleComponent.prototype, "breadcrumbs", void 0);
PageTitleComponent = __decorate([
    core_1.Component({
        selector: 'app-page-title',
        templateUrl: './page-title.component.html',
        styleUrls: ['./page-title.component.scss']
    })
], PageTitleComponent);
exports.PageTitleComponent = PageTitleComponent;
