import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AuthModule} from './modules/auth/auth.module';
import {AppRoutingModule} from './app-routing.module';
import {Http, RequestOptions} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';
import {AppComponent} from './app.component';
import {ApiService} from "./services/api.service";
import {AdminModule} from "./modules/admin/admin.module";
import {ClientModule} from "./modules/client/client.module";
import {ToastrService} from "./services/toastr/toastr.service";
import {DatatableService} from "./services/datatable/datatable.service";
import {ToastModule, ToastsManager, ToastOptions} from "ng2-toastr/ng2-toastr";
import {authHttpServiceFactory} from './auth.service.factory'
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrDefaultOptions} from "./components/toastr/toastr-default-options";
import {ActivitiesModule} from "./modules/client/activities/activities.module";
import {PersonsValidationConstraintListComponent} from './components/activities/persons-validation-constraint-list/persons-validation-constraint-list.component';
import {WindowRefService} from "./services/browser/windowRef.service";

@NgModule({
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
    ToastModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: ToastOptions, useClass: ToastrDefaultOptions}, {
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
  }, ToastsManager, ApiService, ToastrService, DatatableService, WindowRefService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
