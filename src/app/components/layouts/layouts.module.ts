import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {PageTitleComponent} from "./page-title/page-title.component";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [PageTitleComponent],
  exports: [PageTitleComponent]

})
export class LayoutsModule {
}
