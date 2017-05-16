import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./global-dashboard/dashboard.component";
import {MyDashboardComponent} from "./my-dashboard/my-dashboard.component";
import {LayoutsModule} from "../../../components/layouts/layouts.module";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {SharedModule} from "primeng/components/common/shared";
import {ButtonModule} from "primeng/components/button/button";
import {TooltipModule} from "primeng/components/tooltip/tooltip";
import {ChartModule} from "primeng/components/chart/chart";
import {LightboxModule} from "primeng/components/lightbox/lightbox";

@NgModule({
  imports: [
    CommonModule,
    LayoutsModule,
    DataTableModule,
    SharedModule,
    ButtonModule,
    TooltipModule,
    ChartModule,
    LightboxModule
  ],
  declarations: [DashboardComponent, MyDashboardComponent]
})
export class DashboardModule {
}
