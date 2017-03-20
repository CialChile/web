import { AuthGuard } from '../auth/guards/auth-guard.service';
import { AdminDashboardComponent } from "./dashboard/admin-dashboard.component";
import { AdminGuard } from "../auth/guards/admin.guard";
import { AdminIndexComponent } from "./index/admin-index.component";
import { AdminCompaniesComponent } from "./companies/admin-companies.component";
import { AdminCreateCompaniesComponent } from "./companies/admin-create-companies/admin-create-companies.component";
import { AdminListCompaniesComponent } from "./companies/admin-list-companies/admin-list-companies.component";
import { AdminEditCompaniesComponent } from "./companies/admin-edit-companies/admin-edit-companies.component";
export var routes = [
    {
        path: 'admin',
        component: AdminIndexComponent,
        canActivate: [AuthGuard, AdminGuard],
        canActivateChild: [AuthGuard, AdminGuard],
        children: [
            {
                path: 'dashboard',
                component: AdminDashboardComponent,
            },
            {
                path: 'companies',
                component: AdminCompaniesComponent,
                children: [
                    {
                        path: '',
                        component: AdminListCompaniesComponent,
                    },
                    {
                        path: 'create',
                        component: AdminCreateCompaniesComponent,
                    },
                    {
                        path: ':id',
                        component: AdminEditCompaniesComponent,
                    }
                ]
            }
        ]
    },
];
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/admin/admin-routes.js.map