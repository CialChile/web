import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component'
import {LogoutComponent} from './logout/logout.component'
import {AuthGuard} from './guards/auth-guard.service';
import {LoginGuard} from './guards/login-guard.service';

const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
    {path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class AuthRoutingModule {
}
