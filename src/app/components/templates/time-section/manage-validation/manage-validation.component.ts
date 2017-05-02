import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {Validators, FormGroup, FormArray} from "@angular/forms";
import {TemplatesTimeHelper} from "../../helpers/template-time-helper";
import {SelectItem} from "primeng/components/common/api";
import {ValidationService} from "../../../forms/validation/validation.service";
import * as moment from 'moment';
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'templates-time-manage-validation',
  templateUrl: './manage-validation.component.html',
  styleUrls: ['./manage-validation.component.scss']
})
export class ManageValidationComponent implements OnInit, OnChanges {

  public validationForm: FormGroup;
  @Input() validations: FormArray;
  @Input() program: FormArray;
  @Input() validationFormArrayIndex: number;
  @Input() add: boolean;
  @Input() edit: boolean;
  @Output() validationCanceled = new EventEmitter();
  @Output() validationAdded = new EventEmitter();
  validationTypes: any[] = [
    {
      value: {slug: 'programType', name: 'Tipo de Programación'},
      label: 'Tipo de Programación'
    },
    {
      value: {slug: 'frequency', name: 'Frecuencia'},
      label: 'Frecuencia'
    },
    {
      value: {slug: 'period', name: 'Periodicidad'},
      label: 'Periodicidad'
    },
    {
      value: {slug: 'initHour', name: 'Hora de Inicio'},
      label: 'Hora de Inicio'
    },
    {
      value: {slug: 'finishHour', name: 'Hora de Finalización'},
      label: 'Hora de Finalización'
    },
    {
      value: {slug: 'dateRange', name: 'Fecha de Programación'},
      label: 'Fecha de Programación'
    }
  ];
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
  months: SelectItem[] = [
    {
      label: 'Enero',
      value: {value: 'Enero', days: 31}
    },
    {
      label: 'Febrero',
      value: {value: 'Febrero', days: 28}
    },
    {
      label: 'Marzo',
      value: {value: 'Marzo', days: 31}
    },
    {
      label: 'Abril',
      value: {value: 'Marzo', days: 30}
    },
    {
      label: 'Mayo',
      value: {value: 'Mayo', days: 31}
    },
    {
      label: 'Junio',
      value: {value: 'Junio', days: 30}
    },
    {
      label: 'Julio',
      value: {value: 'Julio', days: 31}
    },
    {
      label: 'Agosto',
      value: {value: 'Agosto', days: 31}
    },
    {
      label: 'Septiembre',
      value: {value: 'Septiembre', days: 30}
    },
    {
      label: 'Octubre',
      value: {value: 'Octubre', days: 31}
    },
    {
      label: 'Noviembre',
      value: {value: 'Noviembre', days: 30}
    },
    {
      label: 'Diciembre',
      value: {value: 'Diciembre', days: 31}
    }];
  initDays: SelectItem[] = [];
  endDays: SelectItem[] = [];

  constructor(private toastr: ToastsManager) {
    this.validationForm = TemplatesTimeHelper.generateValidation();
  }

  ngOnInit() {
    if (this.edit) {
      this.loadForm(this.validationFormArrayIndex);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['validationFormArrayIndex'] && changes['validationFormArrayIndex'].previousValue != changes['validationFormArrayIndex'].currentValue && !changes['validationFormArrayIndex'].firstChange) {
      this.loadForm(changes['validationFormArrayIndex'].currentValue)
    }

    if (changes['add'] && changes['add'].currentValue) {
      this.edit = false;
      this.validationForm.reset();
    }
  }

  private loadForm(index: number) {
    let values = this.validationFormArray.at(index).value;
    if (values.type.slug == 'finishHour') {
      values.finishHour.start = moment(values.finishHour.start).toDate();
      values.finishHour.end = moment(values.finishHour.end).toDate();
    }
    if (values.type.slug == 'initHour') {
      values.initHour.start = moment(values.initHour.start).toDate();
      values.initHour.end = moment(values.initHour.end).toDate();
    }
    this.validationForm.reset(values)
  }

  get validationFormArray(): FormArray {
    return this.validations as FormArray;
  }

  addValidation(validationForm, event) {
    event.preventDefault();
    let isValid = true;
    if (this.program.at(0)) {
      if (!TemplatesTimeHelper.validateProgram(this.program.at(0).value, this.validationForm.value)) {
        isValid = false;
      }
    }
    if (isValid) {
      this.validationAdded.emit();
      let validationFormCopy = TemplatesTimeHelper.generateValidation();
      validationFormCopy.reset(this.validationForm.value);
      if (this.edit) {
        this.validations.removeAt(this.validationFormArrayIndex);
        this.validations.insert(this.validationFormArrayIndex, validationFormCopy);
      } else {
        this.validations.push(validationFormCopy);
      }
    } else {
      this.toastr.error('La programación establecida por defecto no cumple con esta validación')
    }
  }

  changeValidationType(event) {

    const formValues = this.validationForm.value;
    this.validationForm.controls['standard'].get('value').setValidators([]);
    this.validationForm.controls['initHour'].get('start').setValidators([]);
    this.validationForm.controls['initHour'].get('end').setValidators([]);
    this.validationForm.controls['finishHour'].get('start').setValidators([]);
    this.validationForm.controls['finishHour'].get('end').setValidators([]);
    this.validationForm.controls['dateRange'].get('initDay').setValidators([]);
    this.validationForm.controls['dateRange'].get('initMonth').setValidators([]);
    this.validationForm.controls['dateRange'].get('endDay').setValidators([]);
    this.validationForm.controls['dateRange'].get('endMonth').setValidators([]);

    if (event.value.slug == 'period') {
      this.validationForm.controls['standard'].get('value').setValidators(Validators.compose([Validators.required, ValidationService.minNumberValidator]));
      const newValues = {type: event.value, standard: formValues.standard}
      this.validationForm.reset(newValues)
    } else if (event.value.slug == 'frequency' || event.value.slug == 'programType') {
      const newValues = {type: event.value, standard: formValues.standard}
      this.validationForm.controls['standard'].get('value').setValidators(Validators.compose([Validators.required]));
      this.validationForm.reset(newValues)
    } else if (event.value.slug == 'initHour') {
      const newValues = {type: event.value, initHour: formValues.initHour}
      this.validationForm.controls['initHour'].get('start').setValidators(Validators.compose([Validators.required]));
      this.validationForm.controls['initHour'].get('end').setValidators(Validators.compose([Validators.required]));
      this.validationForm.reset(newValues)
    } else if (event.value.slug == 'finishHour') {
      const newValues = {type: event.value, finishHour: formValues.finishHour}
      this.validationForm.controls['finishHour'].get('start').setValidators(Validators.compose([Validators.required]));
      this.validationForm.controls['finishHour'].get('end').setValidators(Validators.compose([Validators.required]));
      this.validationForm.reset(newValues)
    } else if (event.value.slug == 'dateRange') {
      const newValues = {type: event.value, dateRange: formValues.dateRange}
      this.validationForm.controls['dateRange'].get('initDay').setValidators(Validators.compose([Validators.required]));
      this.validationForm.controls['dateRange'].get('initMonth').setValidators(Validators.compose([Validators.required]));
      this.validationForm.controls['dateRange'].get('endDay').setValidators(Validators.compose([Validators.required]));
      this.validationForm.controls['dateRange'].get('endMonth').setValidators(Validators.compose([Validators.required]));
      this.validationForm.reset(newValues)
    }
  }

  changeInitMonth(event) {
    this.initDays = [];
    const initDay = this.validationForm.controls['dateRange'].get('initDay');
    initDay.setValue(1);
    for (let i = 1; i <= event.value.days; i++) {
      const day: SelectItem = {label: '' + i, value: i};
      this.initDays.push(day)
    }
  }

  changeEndMonth(event) {
    this.endDays = [];
    const endDay = this.validationForm.controls['dateRange'].get('endDay');
    endDay.setValue(1);
    for (let i = 1; i <= event.value.days; i++) {
      const day: SelectItem = {label: '' + i, value: i};
      this.endDays.push(day)
    }
  }

  cancel() {
    this.edit = false;
    this.add = false;
    this.validationCanceled.emit();
  }

}
