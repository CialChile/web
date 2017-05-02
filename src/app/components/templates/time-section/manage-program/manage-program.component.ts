import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";
import * as moment from 'moment';
import {ValidationService} from "../../../forms/validation/validation.service";
import {TemplatesTimeHelper} from "../../helpers/template-time-helper";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'templates-time-manage-program',
  templateUrl: './manage-program.component.html',
  styleUrls: ['./manage-program.component.scss']
})
export class ManageProgramComponent implements OnInit {
  @Input() program: FormArray;
  @Input() validations: FormArray;
  @Input() add: boolean;
  @Input() edit: boolean;
  @Output() programCanceled = new EventEmitter();
  @Output() programAdded = new EventEmitter();

  programForm: FormGroup;
  days: any = {
    lunes: 'Lunes',
    martes: 'Martes',
    miercoles: 'Miércoles',
    jueves: 'Jueves',
    viernes: 'Viernes',
    sabado: 'Sabado',
    domingo: 'Domingo',
  };
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

  programNaturaLanguage: string = '';

  periodicityLabel: any = {
    daily: 'día(s)',
    weekly: 'semana(s)',
    monthly: 'mes(es)'
  };

  constructor(private toastr: ToastsManager) {

  }

  ngOnInit() {
    this.programForm = TemplatesTimeHelper.generateProgram();
    if (this.edit) {
      let values = this.programFormArray.at(0).value;
      values.initHour = moment(values.initHour).toDate();
      values.finishHour = moment(values.finishHour).toDate();
      this.programForm.reset(values)
    }
    this.programForm.valueChanges.subscribe(() => {
      let constraint: string = '';
      let timeConstraint: string = '';
      if (this.programForm.controls['frequency'].value['slug'] == 'weekly') {
        const days = this.programForm.controls['days'].value;
        Object.keys(days).forEach((key) => {
          constraint += days[key] ? this.days[key] + ', ' : '';
        });
        constraint = ' todos los ' + constraint.substr(0, constraint.length - 2);
      }

      if (this.programForm.controls['frequency'].value['slug'] == 'monthly' && this.programForm.controls['dayOfMonth'].value) {
        constraint = ' los dias ' + this.programForm.controls['dayOfMonth'].value
      }

      if (this.programForm.controls['initHour'].value && this.programForm.controls['finishHour'].value) {
        timeConstraint = ` entre las
        ${moment(this.programForm.controls['initHour'].value).format('hh:mm A')} y las ${moment(this.programForm.controls['finishHour'].value).format('hh:mm A')}`
      }


      this.programNaturaLanguage = `La actividad se ejecutara con una frecuencia 
${this.programForm.controls['frequency'].value['label']} ${constraint} ${timeConstraint}
cada ${this.programForm.controls['periodicity'].value} 
${this.periodicityLabel[this.programForm.controls['frequency'].value['slug']]}`

    })
  }

  get programFormArray(): FormArray {
    return this.program as FormArray;
  }

  addProgram(programForm, event) {
    event.preventDefault();
    let isValid = true;
    let failedValidations = [];
    this.validations.controls.forEach((validation) => {
      if (!TemplatesTimeHelper.validateProgram(this.programForm.value, validation.value)) {
        isValid = false;
        failedValidations.push(validation.value.type.name);
      }
    });

    if (isValid) {
      this.programAdded.emit();
      let programFormCopy = TemplatesTimeHelper.generateProgram();
      programFormCopy.reset(this.programForm.value);
      if (this.edit) {
        this.programFormArray.removeAt(0);
      }
      this.programFormArray.push(programFormCopy);
    } else {
      this.toastr.error('Esta programación no cumple con las siguientes validaciones: ' + failedValidations.join(', '));
    }
  }

  changeProgramType(event) {
    if (event.value.slug == 'periodical') {
      this.programForm.get('frequency').setValidators([Validators.required]);
      this.programForm.get('periodicity').setValidators(Validators.compose([Validators.required, ValidationService.numberValidator, ValidationService.minNumberValidator]));
    } else {
      this.programForm.get('frequency').setValidators([]);
      this.programForm.get('periodicity').setValidators([]);
      this.programForm.get('dayOfMonth').setValidators([]);
    }
  }

  changeFrequencyType(event) {
    if (event.value.slug == 'monthly') {
      this.programForm.get('dayOfMonth').setValidators(Validators.compose([Validators.required, ValidationService.numberValidator, ValidationService.monthDayValidator]));
    } else {
      this.programForm.get('dayOfMonth').setValidators([]);
    }
  }

  cancel() {
    this.add = false;
    this.edit = false;
    this.programCanceled.emit();
  }
}
