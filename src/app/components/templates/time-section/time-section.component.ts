import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";
import * as moment from 'moment';

@Component({
  selector: 'templates-time-section',
  templateUrl: './time-section.component.html',
  styleUrls: ['./time-section.component.scss']
})
export class TimeSectionComponent implements OnInit {

  @Input() section;
  @Input() timeFG: FormGroup;
  addingProgram: boolean = false;
  editingProgram: boolean = false;

  public addingValidation: boolean = false;
  public editingValidation: boolean = false;
  public editValidationIndex: number;

  constructor() {

  }

  ngOnInit() {
    this.timeFG.controls['editable'].valueChanges.subscribe((value) => {
      if (value === false) {
        const validationLength = this.validations.controls.length;
        for (let i = validationLength - 1; i >= 0; i--) {
          this.validations.removeAt(i);
        }
      }
    })
  }

  get program(): FormArray {
    return this.timeFG.get('program') as FormArray;
  };

  get validations(): FormArray {
    return this.timeFG.get('validations') as FormArray;
  };

  editProgram(program, index: number) {
    this.editingProgram = true;
    this.addingProgram = false;
  }

  removeProgram(index: number) {
    this.program.removeAt(index);
    this.hideProgramForm();
  }

  editValidation(validation, index: number) {
    this.editingValidation = true;
    this.addingValidation = false;
    this.editValidationIndex = index;
  }

  removeValidation(index: number) {
    this.validations.removeAt(index)
    if (this.editValidationIndex == index) {
      this.hideValidationForm();
      this.editValidationIndex = null;
    }
  }

  newProgram() {
    this.addingProgram = true;
    this.editingProgram = false;

  }

  newValidation() {
    this.addingValidation = true;
  }

  hideProgramForm() {
    this.editingProgram = false;
    this.addingProgram = false;
  }

  hideValidationForm() {
    this.editingValidation = false;
    this.addingValidation = false;
  }

  parseTime(value) {
    return moment(value).format('hh:mm A')
  }
}
