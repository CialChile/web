import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";

@Component({
  selector: 'templates-time-manage-program',
  templateUrl: './manage-program.component.html',
  styleUrls: ['./manage-program.component.scss']
})
export class ManageProgramComponent implements OnInit {
  @Input() program: FormArray;
  @Input() visible: boolean;
  @Output() programCanceled = new EventEmitter();
  @Output() programAdded = new EventEmitter();

  programForm: FormGroup;
  programTypes: any[] = [
    {
      value: {slug: 'periodical', name: 'Periódica'},
      label: 'Periódica'
    },
    {
      value: {slug: 'once', name: 'Solo una vez'},
      label: 'Solo una vez'
    }
  ];
  frequencyTypes: any[] = [
    {
      value: {slug: 'daily', label: 'Diaria'},
      label: 'Diaria'
    },
    {
      value: {slug: 'weekly', label: 'Semanal'},
      label: 'Semanal'
    },
    {
      value: {slug: 'monthly', label: 'Mensual'},
      label: 'Mensual'
    },
  ];

  periodicityLabel: any = {
    daily: 'día(s)',
    weekly: 'semana(s)',
    monthly: 'mes(es)'
  };

  constructor(private formBuilder: FormBuilder) {
    this.programForm = this.formBuilder.group({
      programType: ['', Validators.required],
      frequency: ['', Validators.required],
      periodicity: [1, Validators.required],
      days: [[]],
      dayOfMonth: [''],
      initHour: ['', Validators.required],
      finishHour: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  addProgram(programForm, event) {
    event.preventDefault();
    this.programAdded.emit();

  }

  changeProgramType(event) {

  }

  changeFrequencyType(event) {

  }

  cancel() {
    this.visible = false;
    this.programCanceled.emit();
  }
}
