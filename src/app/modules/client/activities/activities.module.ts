import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { ManageActivityComponent } from './manage-activity/manage-activity.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import {ActivitiesRoutingModule} from "./activities-routing.module";
import {ActivitiesIndexComponent} from "./activities-index.component";
import {LayoutsModule} from "../../../components/layouts/layouts.module";
import { TemplatesListComponent } from './templates/templates-list/templates-list.component';
import { ManageTemplateComponent } from './templates/manage-template/manage-template.component';

@NgModule({
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    LayoutsModule
  ],
  declarations: [ActivitiesListComponent, ManageActivityComponent, ActivityDetailsComponent, ActivitiesIndexComponent, TemplatesListComponent, ManageTemplateComponent]
})
export class ActivitiesModule { }
