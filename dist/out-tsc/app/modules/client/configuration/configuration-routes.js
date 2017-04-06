import { IndexComponent } from "../index/index.component";
import { AuthGuard } from "../../auth/guards/auth-guard.service";
import { ClientGuard } from "../../auth/guards/client.guard";
import { PermissionGuard } from "../../auth/guards/permission.guard";
import { ConfigurationIndexComponent } from "./configuration-index.component";
import { BrandsListComponent } from "./brands/brands-list/brands-list.component";
import { ManageBrandsComponent } from "./brands/manage-brands/manage-brands.component";
import { BrandModelsListComponent } from "./brands/brand-models-list/brand-models-list.component";
import { ManageBrandModelsComponent } from "./brands/manage-brand-models/manage-brand-models.component";
import { CategoriesListComponent } from "./categories/categories-list/categories-list.component";
import { ManageCategoriesComponent } from "./categories/manage-categories/manage-categories.component";
import { SubcategoriesListComponent } from "./categories/subcategories-list/subcategories-list.component";
import { ManageSubcategoriesComponent } from "./categories/manage-subcategories/manage-subcategories.component";
import { WorkplacesListComponent } from "./workplaces/workplaces-list/workplaces-list.component";
import { ManageWorkplacesComponent } from "./workplaces/manage-workplaces/manage-workplaces.component";
import { AssetConfigComponent } from "./assets/asset-config/asset-config.component";
import { StatusListComponent } from "./status/status-list/status-list.component";
import { ManageStatusComponent } from "./status/manage-status/manage-status.component";
export var routes = [
    {
        path: 'client',
        component: IndexComponent,
        canActivate: [AuthGuard, ClientGuard],
        canActivateChild: [AuthGuard, ClientGuard],
        children: [
            {
                path: 'configuration',
                component: ConfigurationIndexComponent,
                canActivateChild: [AuthGuard, ClientGuard, PermissionGuard],
                children: [
                    {
                        path: 'brands',
                        component: BrandsListComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-brands.list'
                        },
                    },
                    {
                        path: 'brands/create',
                        component: ManageBrandsComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-brands.store'
                        }
                    },
                    {
                        path: 'brands/brand-models',
                        component: BrandModelsListComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-brand-models.list'
                        }
                    },
                    {
                        path: 'brands/brand-models/create',
                        component: ManageBrandModelsComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-brand-models.store'
                        }
                    },
                    {
                        path: 'brands/:id/brand-models/:brandModelId',
                        component: ManageBrandModelsComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-brand-models.store'
                        }
                    },
                    {
                        path: 'brands/:id',
                        component: ManageBrandsComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-brands.show'
                        }
                    },
                    {
                        path: 'categories',
                        component: CategoriesListComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-categories.list'
                        },
                    },
                    {
                        path: 'categories/create',
                        component: ManageCategoriesComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-categories.store'
                        }
                    },
                    {
                        path: 'categories/subcategories',
                        component: SubcategoriesListComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-subcategories.list'
                        }
                    },
                    {
                        path: 'categories/subcategories/create',
                        component: ManageSubcategoriesComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-subcategories.store'
                        }
                    },
                    {
                        path: 'categories/:id/subcategories/:subcategoryId',
                        component: ManageSubcategoriesComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-subcategories.show'
                        }
                    },
                    {
                        path: 'categories/:id',
                        component: ManageCategoriesComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-categories.show'
                        }
                    },
                    {
                        path: 'workplaces',
                        component: WorkplacesListComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-workplaces.list'
                        },
                    },
                    {
                        path: 'workplaces/create',
                        component: ManageWorkplacesComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-workplaces.store'
                        }
                    },
                    {
                        path: 'workplaces/:id',
                        component: ManageWorkplacesComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-workplaces.show'
                        }
                    },
                    {
                        path: 'assets',
                        component: AssetConfigComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-assets.show'
                        },
                    },
                    {
                        path: 'status',
                        component: StatusListComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-status.list'
                        },
                    },
                    {
                        path: 'status/create',
                        component: ManageStatusComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-status.store'
                        }
                    },
                    {
                        path: 'status/:id',
                        component: ManageStatusComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-status.show'
                        }
                    },
                ]
            }
        ]
    }
];
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/configuration/configuration-routes.js.map