import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ClientRoutingModule} from "./client-routing.module";
import {MenuModule} from "../menu/menu.module";
import {UserCanModule} from "../../directives/user-can/user-can.module";

@NgModule({
    imports: [
        CommonModule,
        ClientRoutingModule,
        MenuModule,
        UserCanModule
    ],
    declarations: [DashboardComponent],
})
export class ClientModule {
}
