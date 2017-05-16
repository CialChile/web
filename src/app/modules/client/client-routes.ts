import {AuthGuard} from '../auth/guards/auth-guard.service';
import {Routes} from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {ClientGuard} from "../auth/guards/client.guard";
import {DashboardComponent} from "./dashboard/global-dashboard/dashboard.component";
import {MyDashboardComponent} from "./dashboard/my-dashboard/my-dashboard.component";

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthGuard, ClientGuard],
    canActivateChild: [AuthGuard, ClientGuard],
    children: [
      {
        path: 'global-dashboard',
        component: DashboardComponent
      },
      {
        path: 'dashboard',
        component: MyDashboardComponent
      }
    ]
  }
];
