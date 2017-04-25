import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";

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
  programForm: any;

  public addingValidation: boolean = false;
  public editingValidation: boolean = false;
  public validationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
  }

  get program(): FormArray {
    return this.timeFG.get('program') as FormArray;
  };

  get validations(): FormArray {
    return this.timeFG.get('validations') as FormArray;
  };

  editProgram(program, index: number) {
    this.editingProgram = true;
  }

  removeProgram(index: number) {
    this.program.removeAt(index)
  }

  newProgram() {
    this.addingProgram = true;
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

}
