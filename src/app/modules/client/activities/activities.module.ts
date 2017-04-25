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
import {DataTableModule} from "primeng/components/datatable/datatable";
import {FileUploadModule} from "primeng/components/fileupload/fileupload";
import {SharedModule} from "primeng/components/common/shared";
import {MultiSelectModule} from "primeng/components/multiselect/multiselect";
import {CalendarModule} from "primeng/components/calendar/calendar";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {FormsHelperModule} from "../../../components/forms/forms-helpers.module";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {ButtonModule} from "primeng/components/button/button";
import {TemplatesModule} from "../../../components/templates/templates.module";

@NgModule({
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    LayoutsModule,
    DataTableModule,
    SharedModule,
    ButtonModule,
    MultiSelectModule,
    CalendarModule,
    FileUploadModule,
    ReactiveFormsModule,
    FormsHelperModule,
    FormsModule,
    DropdownModule,
    TemplatesModule
  ],
  declarations: [ActivitiesListComponent, ManageActivityComponent, ActivityDetailsComponent, ActivitiesIndexComponent, TemplatesListComponent, ManageTemplateComponent]
})
export class ActivitiesModule { }
