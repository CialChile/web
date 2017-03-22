import {NgModule} from '@angular/core';
import {ControlMessageComponent} from "./control-message/control-message.component";
import {CommonModule} from "@angular/common";
import {EtrackImageUploadComponent} from "./image-upload/etrack-image-upload.component";

@NgModule({
  imports: [CommonModule],
  declarations: [ControlMessageComponent, EtrackImageUploadComponent],
  exports: [ControlMessageComponent,EtrackImageUploadComponent]

})
export class FormsHelperModule {
}
