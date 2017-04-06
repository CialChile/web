var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { ManageActivityComponent } from './manage-activity/manage-activity.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { ActivitiesRoutingModule } from "./activities-routing.module";
import { ActivitiesIndexComponent } from "./activities-index.component";
import { LayoutsModule } from "../../../components/layouts/layouts.module";
var ActivitiesModule = (function () {
    function ActivitiesModule() {
    }
    return ActivitiesModule;
}());
ActivitiesModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ActivitiesRoutingModule,
            LayoutsModule
        ],
        declarations: [ActivitiesListComponent, ManageActivityComponent, ActivityDetailsComponent, ActivitiesIndexComponent]
    })
], ActivitiesModule);
export { ActivitiesModule };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/activities/activities.module.js.map