import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ClientRoutingModule} from "./client-routing.module";
import {MenuModule} from "../menu/menu.module";
import {UserCanModule} from "../../directives/user-can/user-can.module";
import {IndexComponent} from './index/index.component';
import {LayoutsModule} from "../../components/layouts/layouts.module";
import {RrhhModule} from "./rrhh/rrhh.module";
import {ProfileModule} from "./profile/profile.module";
import {SecurityModule} from "./security/security.module";
import {AssetsModule} from "./assets/assets.module";
import {ConfigurationModule} from "./configuration/configuration.module";

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    MenuModule,
    UserCanModule,
    RrhhModule,
    ProfileModule,
    SecurityModule,
    AssetsModule,
    LayoutsModule,
    ConfigurationModule
  ],
  declarations: [DashboardComponent, IndexComponent],
})
export class ClientModule {
}
