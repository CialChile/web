import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientRoutingModule} from "./client-routing.module";
import {MenuModule} from "../menu/menu.module";
import {UserCanModule} from "../../directives/user-can/user-can.module";
import {IndexComponent} from './index/index.component';
import {RrhhModule} from "./rrhh/rrhh.module";
import {ProfileModule} from "./profile/profile.module";
import {SecurityModule} from "./security/security.module";
import {AssetsModule} from "./assets/assets.module";
import {ConfigurationModule} from "./configuration/configuration.module";
import {CertificationsModule} from "./certifications/certifications.module";
import {ActivitiesModule} from "./activities/activities.module";
import {DashboardModule} from "./dashboard/dashboard.module";

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
    DashboardModule,
    ConfigurationModule,
    CertificationsModule,
    ActivitiesModule
  ],
  declarations: [IndexComponent],
})
export class ClientModule {
}
