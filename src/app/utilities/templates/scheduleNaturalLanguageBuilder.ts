import * as moment from 'moment';

export class ScheduleNaturalLanguageBuilder {

  static build(frequency, periodicity, days, dayOfMonth, initHour, estimatedTime, estimatedTimeUnit) {
    let constraint: string = '';
    let timeConstraint: string = '';
    let durationConstraint: string = '';
    const periodicityLabel: any = {
      daily: 'día(s)',
      weekly: 'semana(s)',
      monthly: 'mes(es)'
    };
    const daysLabel: any = {
      lunes: 'Lunes',
      martes: 'Martes',
      miercoles: 'Miércoles',
      jueves: 'Jueves',
      viernes: 'Viernes',
      sabado: 'Sabados',
      domingo: 'Domingos',
    };
    if (frequency.slug == 'weekly') {
      let selectedDays = Object.keys(days);
      selectedDays = selectedDays.filter((value) => {
        return !!days[value];
      });
      const selectedDaysLength = selectedDays.length
      if (!selectedDaysLength) {
        constraint = '';
      } else if (selectedDaysLength == 1) {
        constraint += daysLabel[selectedDays[0]];
      } else {
        constraint = selectedDays.reduce((previous, current, currentIndex) => {
          if (currentIndex == 1) {
            previous = daysLabel[previous];
          }

          if (currentIndex == selectedDaysLength - 1) {
            return previous + ' y ' + daysLabel[current];
          }

          return previous + ', ' + daysLabel[current]
        });
      }

      constraint = constraint ? ' todos los ' + constraint : '';
    }

    if (frequency.slug == 'monthly' && dayOfMonth) {
      constraint = ' los dias ' + dayOfMonth
    }

    if (initHour) {
      timeConstraint = ` iniciando a las
        ${moment(initHour).format('hh:mm A')} `
    }

    if (estimatedTime) {
      durationConstraint = ` con una duración estimada de 
        ${estimatedTime} ${estimatedTimeUnit.hasOwnProperty('name') ? estimatedTimeUnit.name : estimatedTimeUnit}`
    }


    return `La actividad se ejecutara con una frecuencia 
${frequency.label} ${constraint} ${timeConstraint} ${durationConstraint}
cada ${periodicity} 
${periodicityLabel[frequency.slug]}`

  }
}
