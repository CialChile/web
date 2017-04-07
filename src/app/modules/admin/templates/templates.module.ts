import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutsModule} from "../../../components/layouts/layouts.module";
import {TemplatesListComponent} from "./templates-list/templates-list.component";
import {TemplatesRoutingModule} from "./templates-routing.module";
import {TemplatesIndexComponent} from "./templates-index.component";

@NgModule({
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    LayoutsModule
  ],
  declarations: [TemplatesListComponent,TemplatesIndexComponent]
})
export class TemplatesModule { }
