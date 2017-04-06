import { IndexComponent } from "../index/index.component";
import { AuthGuard } from "../../auth/guards/auth-guard.service";
import { ClientGuard } from "../../auth/guards/client.guard";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
export var routes = [
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
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/profile/profile-routes.js.map