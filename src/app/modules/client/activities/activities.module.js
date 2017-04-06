"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var activities_list_component_1 = require("./activities-list/activities-list.component");
var manage_activity_component_1 = require("./manage-activity/manage-activity.component");
var activity_details_component_1 = require("./activity-details/activity-details.component");
var activities_routing_module_1 = require("./activities-routing.module");
var activities_index_component_1 = require("./activities-index.component");
var layouts_module_1 = require("../../../components/layouts/layouts.module");
var ActivitiesModule = (function () {
    function ActivitiesModule() {
    }
    return ActivitiesModule;
}());
ActivitiesModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            activities_routing_module_1.ActivitiesRoutingModule,
            layouts_module_1.LayoutsModule
        ],
        declarations: [activities_list_component_1.ActivitiesListComponent, manage_activity_component_1.ManageActivityComponent, activity_details_component_1.ActivityDetailsComponent, activities_index_component_1.ActivitiesIndexComponent]
    })
], ActivitiesModule);
exports.ActivitiesModule = ActivitiesModule;
