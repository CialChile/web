import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonsValidationConstraintListComponent} from "./persons-validation-constraint-list/persons-validation-constraint-list.component";
import {TimeValidationConstraintListComponent} from './time-validation-constraint-list/time-validation-constraint-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PersonsValidationConstraintListComponent, TimeValidationConstraintListComponent],
  exports: [PersonsValidationConstraintListComponent, TimeValidationConstraintListComponent]
})
export class ActivitiesComponentModule {
}
