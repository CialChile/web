import * as moment from 'moment';

export class TimeValidationConstraintBuilder {

  private groupedValidations = {
    programType: [],
    frequency: [],
    period: [],
    initHour: [],
    estimatedTime: []
  };

  constructor(private validations: any[]) {

    validations.forEach((validation) => {
      if (validation.type.slug != 'dateRange')
        this.groupedValidations[validation.type.slug].push(validation)
    })

  }

  build(): string[] {
    let constraints: string[] = [];
    const programType = this.constraintBuilder(this.groupedValidations.programType, 'ProgramType');
    const frequency = this.constraintBuilder(this.groupedValidations.frequency, 'Frequency');
    const period = this.constraintBuilder(this.groupedValidations.period, 'Period');
    const initHour = this.constraintBuilder(this.groupedValidations.initHour, 'InitHour');
    const estimatedTime = this.constraintBuilder(this.groupedValidations.estimatedTime, 'EstimatedTime');
    if (programType) {
      constraints.push('Tipo de Programa: ' + programType)
    }
    if (frequency) {
      constraints.push('Frecuencia: ' + frequency)
    }
    if (period) {
      constraints.push('Periodicidad: ' + period)
    }
    if (initHour) {
      constraints.push('Hora de inicio: ' + initHour)
    }

    if (estimatedTime) {
      constraints.push('Tiempo estimado: ' + estimatedTime)
    }

    return constraints;
  }

  private constraintBuilder(validations, type, operator = 'ó'): string {
    if (!validations.length) {
      return '';
    }
    const validationLength = validations.length - 1;
    if (!validationLength) {
      return this['format' + type](validations[0]);
    }
    return validations.reduce((previous, current, currentIndex) => {
        previous = this['format' + type](previous);

        if (currentIndex == validationLength) {
          return previous + ' ' + operator + ' ' + this['format' + type](current)
        }

        return previous + this['format' + type](current) + ', '
      }
    )
  }

  private formatProgramType(validation) {
    return validation.standard.value.name;
  }

  private formatFrequency(validation) {
    return validation.standard.value.label;
  }

  private formatPeriod(validation) {
    return validation.standard.value;
  }

  private formatInitHour(validation) {
    return 'Entre las ' + moment(validation.initHour.start).format('hh:mm A') + ' y las ' + moment(validation.initHour.end).format('hh:mm A');
  }

  private formatEstimatedTime(validation) {
    return validation.estimatedTime.time + ' ' + validation.estimatedTime.unit.name;
  }
}
