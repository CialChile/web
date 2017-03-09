import {NgModule} from '@angular/core';
import {ControlMessageComponent} from "./control-message/control-message.component";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [CommonModule],
  declarations: [ControlMessageComponent],
  exports: [ControlMessageComponent]

})
export class FormsHelperModule {
}
