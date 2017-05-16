import {IndexComponent} from "../index/index.component";
import {AuthGuard} from "../../auth/guards/auth-guard.service";
import {ClientGuard} from "../../auth/guards/client.guard";
import {Routes} from "@angular/router";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {MyNotificationsComponent} from "./my-notifications/my-notifications.component";
import {MyScheduleComponent} from "./my-schedule/my-schedule.component";
import {MyActivitiesComponent} from "./my-activities/my-activities.component";
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
        path: 'my-notifications',
        component: MyNotificationsComponent,
      },
      {
        path: 'my-schedule',
        component: MyScheduleComponent,
      },
      {
        path: 'my-activities',
        component: MyActivitiesComponent,
      },
      {
        path: 'my-profile/change-password',
        component: ChangePasswordComponent
      },
    ]
  }
];
