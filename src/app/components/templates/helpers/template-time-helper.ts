import {FormControl, Validators, FormGroup} from "@angular/forms";
import {isObject} from "rxjs/util/isObject";
import * as moment from 'moment';
import {isDate} from "rxjs/util/isDate";

export class TemplatesTimeHelper {
  public static generateProgram(): FormGroup {
    const days = new FormGroup({
      lunes: new FormControl(false),
      martes: new FormControl(false),
      miercoles: new FormControl(false),
      jueves: new FormControl(false),
      viernes: new FormControl(false),
      sabado: new FormControl(false),
      domingo: new FormControl(false),
    });
    let config = {
      programType: new FormControl('', Validators.required),
      frequency: new FormControl(''),
      periodicity: new FormControl(1),
      days: days,
      dayOfMonth: new FormControl(''),
      initHour: new FormControl('', Validators.required),
      finishHour: new FormControl('', Validators.required)
    };
    return new FormGroup(config);
  }

  public static generateValidation(): FormGroup {
    let config = {
      type: new FormControl('', Validators.required),
      standard: new FormGroup({
        value: new FormControl(''),
        editable: new FormControl(true),
      }),
      initHour: new FormGroup({
        start: new FormControl(''),
        end: new FormControl(''),
      }),
      finishHour: new FormGroup({
        start: new FormControl(''),
        end: new FormControl(''),
      }),
      dateRange: new FormGroup({
        initDay: new FormControl(''),
        initMonth: new FormControl(''),
        endDay: new FormControl(''),
        endMonth: new FormControl(''),
      }),
    };
    return new FormGroup(config);
  }

  public static validateProgram(program, validation) {
    const capitalize = ([first, ...rest]) => {
      console.log(first, rest)
      return first.toUpperCase() + rest;
    };

    return TemplatesTimeHelper['validate' + capitalize(validation.type['slug'])](program, validation)
  }

  private static validateInitHour(program, validation) {
    return TemplatesTimeHelper.validateTime(validation.initHour.start, validation.initHour.end, program.initHour);
  }

  private static validateFinishHour(program, validation) {

    return TemplatesTimeHelper.validateTime(validation.finishHour.start, validation.finishHour.end, program.finishHour);
  }

  private static validateProgramType(program, validation) {
    return TemplatesTimeHelper.validateStandard(program.programType.slug, validation);
  }

  private static validateFrequency(program, validation) {
    return TemplatesTimeHelper.validateStandard(program.frequency.slug, validation);
  }

  private static validatePeriod(program, validation) {
    return TemplatesTimeHelper.validateStandard(program.periodicity, validation);
  }

  private static validateStandard(programValue, validation) {

    const isEditable = validation.standard.editable;
    const validationValue = isObject(validation.standard.value) ? validation.standard.value['slug'] : validation.standard.value;
    if (isEditable) {
      return true;
    }

    return validationValue == programValue;
  }

  private static validateTime(start, end, programValue) {
    const startTime = moment(start).set({'year': 2017, 'month': 1, 'day': 1});
    const endTime = moment(end).set({'year': 2017, 'month': 1, 'day': 1});
    const programTime = moment(programValue).set({'year': 2017, 'month': 1, 'day': 1});

    return programTime.isBetween(startTime, endTime);
  }

}
