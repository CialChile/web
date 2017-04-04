import {IndexComponent} from "../index/index.component";
import {AuthGuard} from "../../auth/guards/auth-guard.service";
import {ClientGuard} from "../../auth/guards/client.guard";
import {Routes} from "@angular/router";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
export const routes: Routes = [
  {
    path: 'client',
    component: IndexComponent,
    canActivate: [AuthGuard, ClientGuard],
    canActivateChild: [AuthGuard, ClientGuard],
    children: [
      {
        path: 'my-profile',
        component: MyProfileComponent,
      },
      {
        path: 'my-profile/change-password',
        component: ChangePasswordComponent
      },
    ]
  }
];
