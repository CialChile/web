import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AssetsIndexComponent} from "./assets-index.component";
import { AssetsListComponent } from './assets-list/assets-list.component';
import { ManageAssetsComponent } from './manage-assets/manage-assets.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AssetsIndexComponent, AssetsListComponent, ManageAssetsComponent]
})
export class AssetsModule { }
