import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormArray} from "@angular/forms";

@Component({
  selector: 'templates-time-manage-validation',
  templateUrl: './manage-validation.component.html',
  styleUrls: ['./manage-validation.component.scss']
})
export class ManageValidationComponent implements OnInit {

  public validationForm: FormGroup;
  @Input() validations: FormArray;
  @Input() visible: boolean;
  @Output() validationCanceled = new EventEmitter();
  @Output() validationAdded = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
    this.validationForm = this.formBuilder.group({
      programType: ['', Validators.required],
      frequency: ['', Validators.required],
      periodicity: ['', Validators.required],
      days: [[]],
      dayOfMonth: [''],
      initHour: ['', Validators.required],
      finishHour: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  cancel() {
    this.visible = false;
    this.validationCanceled.emit();
  }

}
