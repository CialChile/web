"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var auth_module_1 = require("./modules/auth/auth.module");
var app_routing_module_1 = require("./app-routing.module");
var http_2 = require("@angular/http");
var angular2_jwt_1 = require("angular2-jwt");
var app_component_1 = require("./app.component");
var api_service_1 = require("./services/api.service");
var admin_module_1 = require("./modules/admin/admin.module");
var client_module_1 = require("./modules/client/client.module");
var toastr_service_1 = require("./services/toastr/toastr.service");
var datatable_service_1 = require("./services/datatable/datatable.service");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var auth_service_factory_1 = require("./auth.service.factory");
var animations_1 = require("@angular/platform-browser/animations");
var toastr_default_options_1 = require("./components/toastr/toastr-default-options");
var activities_module_1 = require("./modules/client/activities/activities.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            auth_module_1.AuthModule,
            app_routing_module_1.AppRoutingModule,
            admin_module_1.AdminModule,
            client_module_1.ClientModule,
            ng2_toastr_1.ToastModule.forRoot(),
            forms_1.ReactiveFormsModule,
            animations_1.BrowserAnimationsModule,
            activities_module_1.ActivitiesModule
        ],
        providers: [{ provide: ng2_toastr_1.ToastOptions, useClass: toastr_default_options_1.ToastrDefaultOptions }, {
                provide: angular2_jwt_1.AuthHttp,
                useFactory: auth_service_factory_1.authHttpServiceFactory,
                deps: [http_2.Http, http_2.RequestOptions]
            }, ng2_toastr_1.ToastsManager, api_service_1.ApiService, toastr_service_1.ToastrService, datatable_service_1.DatatableService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
