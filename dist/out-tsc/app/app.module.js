var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthModule } from './modules/auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AppComponent } from './app.component';
import { ToastModule, ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ApiService } from "./services/api.service";
import { AdminModule } from "./modules/admin/admin.module";
import { ClientModule } from "./modules/client/client.module";
import { ToastrService } from "./services/toastr/toastr.service";
import { DatatableService } from "./services/datatable/datatable.service";
import { EventsService } from "./services/events/events.service";
import { ModalModule } from 'ng2-bootstrap/modal';
import { DataTablesModule } from "./directives/datatable/angular-datatables.module";
export function authHttpServiceFactory(http, options) {
    return new AuthHttp(new AuthConfig({
        tokenName: 'token',
        globalHeaders: [{ 'Content-Type': 'application/json' }],
    }), http, options);
}
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
            ],
            imports: [
                BrowserModule,
                FormsModule,
                HttpModule,
                AuthModule,
                AppRoutingModule,
                ClientModule,
                AdminModule,
                ToastModule,
                ReactiveFormsModule,
                ModalModule.forRoot(),
                DataTablesModule.forRoot(),
            ],
            providers: [{
                    provide: AuthHttp,
                    useFactory: authHttpServiceFactory,
                    deps: [Http, RequestOptions]
                }, ToastsManager, ApiService, ToastrService, DatatableService, EventsService],
            bootstrap: [AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/app.module.js.map