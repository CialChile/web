var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from "../../../components/layouts/layouts.module";
import { TemplatesListComponent } from "./templates-list/templates-list.component";
import { TemplatesRoutingModule } from "./templates-routing.module";
import { TemplatesIndexComponent } from "./templates-index.component";
var TemplatesModule = (function () {
    function TemplatesModule() {
    }
    return TemplatesModule;
}());
TemplatesModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            TemplatesRoutingModule,
            LayoutsModule
        ],
        declarations: [TemplatesListComponent, TemplatesIndexComponent]
    })
], TemplatesModule);
export { TemplatesModule };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/admin/templates/templates.module.js.map