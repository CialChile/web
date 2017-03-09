import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AuthModule} from './modules/auth/auth.module';
import {AppRoutingModule} from './app-routing.module';
import {Http, RequestOptions} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {AppComponent} from './app.component';
import {ToastModule, ToastsManager} from 'ng2-toastr/ng2-toastr';
import {ApiService} from "./services/api.service";
import {AdminModule} from "./modules/admin/admin.module";
import {ClientModule} from "./modules/client/client.module";
import {ToastrService} from "./services/toastr/toastr.service";
import {DatatableService} from "./services/datatable/datatable.service";
import {EventsService} from "./services/events/events.service";
import {ModalModule} from 'ng2-bootstrap/modal';
import {DataTablesModule} from "./directives/datatable/angular-datatables.module";

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}

@NgModule({
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
})

export class AppModule {
}
