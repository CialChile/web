var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthModule } from './modules/auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { AppComponent } from './app.component';
import { ApiService } from "./services/api.service";
import { AdminModule } from "./modules/admin/admin.module";
import { ClientModule } from "./modules/client/client.module";
import { ToastrService } from "./services/toastr/toastr.service";
import { DatatableService } from "./services/datatable/datatable.service";
import { ToastModule, ToastsManager, ToastOptions } from "ng2-toastr/ng2-toastr";
import { authHttpServiceFactory } from './auth.service.factory';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent
        ],
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            AuthModule,
            AppRoutingModule,
            AdminModule,
            ClientModule,
            ToastModule,
            ReactiveFormsModule,
            BrowserAnimationsModule
        ],
        providers: [{
                provide: AuthHttp,
                useFactory: authHttpServiceFactory,
                deps: [Http, RequestOptions]
            }, ToastsManager, ToastOptions, ApiService, ToastrService, DatatableService],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/app.module.js.map