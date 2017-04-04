import {NgModule} from '@angular/core';
import {ControlMessageComponent} from "./control-message/control-message.component";
import {CommonModule} from "@angular/common";
import {EtrackImageUploadComponent} from "./image-upload/etrack-image-upload.component";
import {ImageDisplayComponent} from './image-display/image-display.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ControlMessageComponent, EtrackImageUploadComponent, ImageDisplayComponent],
  exports: [ControlMessageComponent, EtrackImageUploadComponent, ImageDisplayComponent]

})
export class FormsHelperModule {
}
