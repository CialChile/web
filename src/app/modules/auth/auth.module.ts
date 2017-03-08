import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';

import {FormsModule, ReactiveFormsModule}   from '@angular/forms';
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./guards/auth-guard.service";
import {LoginGuard} from "./guards/login-guard.service";
import {UserService} from "./services/user.service";
import {AdminGuard} from "./guards/admin.guard";
import {ClientGuard} from "./guards/client.guard";
import {ControlMessageComponent} from "../../components/forms/control-message/control-message.component";
import {PermissionGuard} from "./guards/permission.guard";

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [AuthService, AuthGuard, LoginGuard, UserService, AdminGuard, ClientGuard, PermissionGuard],
    declarations: [LoginComponent, LogoutComponent, ControlMessageComponent],
})
export class AuthModule {
}
