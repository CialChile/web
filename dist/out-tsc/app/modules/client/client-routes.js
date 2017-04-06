import { AuthGuard } from '../auth/guards/auth-guard.service';
import { IndexComponent } from "./index/index.component";
import { ClientGuard } from "../auth/guards/client.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
export var routes = [
    {
        path: 'client',
        component: IndexComponent,
        canActivate: [AuthGuard, ClientGuard],
        canActivateChild: [AuthGuard, ClientGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            }
        ]
    }
];
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/client-routes.js.map