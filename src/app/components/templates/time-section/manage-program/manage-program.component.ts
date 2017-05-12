import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";
import * as moment from 'moment';
import {ValidationService} from "../../../forms/validation/validation.service";
import {TemplatesTimeHelper} from "../../helpers/template-time-helper";
import {ToastsManager} from "ng2-toastr";
import {SelectItem} from "primeng/components/common/api";

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
  estimatedTimeUnits: SelectItem[] = [
    {
      value: {slug: '0', name: 'Horas'},
      label: 'Horas'
    },
    {
      value: {slug: '1', name: 'Dias'},
      label: 'Dias'
    },
    {
      value: {slug: '2', name: 'Semanas'},
      label: 'Semanas'
    },
    {
      value: {slug: '3', name: 'Meses'},
      label: 'Meses'
    }
  ];
  days: any = {
    lunes: 'Lunes',
    martes: 'Martes',
    miercoles: 'Miércoles',
    jueves: 'Jueves',
    viernes: 'Viernes',
    sabado: 'Sabado',
    domingo: 'Domingo',
  };
  programTypes: SelectItem[] = [
    {
      value: {slug: 'periodical', name: 'Periódica'},
      label: 'Periódica'
    },
    {
      value: {slug: 'once', name: 'Solo una vez'},
      label: 'Solo una vez'
    }
  ];
  frequencyTypes: SelectItem[] = [
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
      this.programForm.reset(values)
    }
    this.programForm.valueChanges.subscribe(() => {
      let constraint: string = '';
      let timeConstraint: string = '';
      let durationConstraint: string = '';
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

      if (this.programForm.controls['initHour'].value) {
        timeConstraint = ` iniciando a las
        ${moment(this.programForm.controls['initHour'].value).format('hh:mm A')} `
      }

      if (this.programForm.controls['initHour'].value) {
        durationConstraint = ` con una duración estimada de 
        ${this.programForm.controls['estimatedTime'].value} ${this.programForm.controls['estimatedTimeUnit'].value.name}`
      }


      this.programNaturaLanguage = `La actividad se ejecutara con una frecuencia 
${this.programForm.controls['frequency'].value['label']} ${constraint} ${timeConstraint} ${durationConstraint}
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
    let daysSelected = true;
    if (this.programForm.controls['frequency'].value['slug'] == 'weekly') {
      daysSelected = false;
      const days = this.programForm.controls['days'].value;
      Object.keys(days).forEach((key) => {
        if (days[key]) {
          daysSelected = true;
        }
      });
      if (!daysSelected) {
        this.toastr.error('Debe especificar que dias de la semana se debe ejecutar la actividad')
      }
    }
    let failedValidations = [];
    this.validations.controls.forEach((validation) => {
      if (!TemplatesTimeHelper.validateProgram(this.programForm.value, validation.value)) {
        isValid = false;
        failedValidations.push(validation.value.type.name);
      }
    });

    if (isValid && daysSelected) {
      this.programAdded.emit();
      let programFormCopy = TemplatesTimeHelper.generateProgram();
      programFormCopy.reset(this.programForm.value);
      if (this.edit) {
        this.programFormArray.removeAt(0);
      }
      this.programFormArray.push(programFormCopy);
    } else {
      if (failedValidations.length) {
        this.toastr.error('Esta programación no cumple con las siguientes validaciones: ' + failedValidations.join(', '));
      }
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
