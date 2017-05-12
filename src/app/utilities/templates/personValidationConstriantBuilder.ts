export class PersonValidationConstraintBuilder {

  private groupedValidations = {
    role: [],
    certifications: [],
    position: [],
    specialty: [],
    experience: null
  };

  constructor(private validations: any[]) {

    validations.forEach((validation) => {
      if (validation.value.name != 'experience') {
        this.groupedValidations[validation.value.name].push(validation.validation)
      } else {
        this.groupedValidations[validation.value.name] = validation.validation;
      }
    })

  }

  build(): string[] {
    let constraints: string[] = [];
    const roles = this.constraintBuilder(this.groupedValidations.role);
    const certifications = this.constraintBuilder(this.groupedValidations.certifications, 'y');
    const positions = this.constraintBuilder(this.groupedValidations.position);
    const specialties = this.constraintBuilder(this.groupedValidations.specialty);
    if (roles) {
      constraints.push('Rol: ' + roles)
    }
    if (certifications) {
      constraints.push('Certificación: ' + certifications)
    }
    if (positions) {
      constraints.push('Cargo: ' + positions)
    }
    if (specialties) {
      constraints.push('Especialidad: ' + specialties)
    }

    return constraints;
  }

  private constraintBuilder(validations, operator = 'ó'): string {
    if (!validations.length) {
      return '';
    }
    const validationLength = validations.length - 1;
    if (!validationLength) {
      if (validations[0].hasOwnProperty('name')) {
        return validations[0].name;
      } else {
        return validations[0]
      }
    }
    return validations.reduce((previous, current, currentIndex) => {
        if (previous.hasOwnProperty('name')) {
          previous = previous.name;
        }
        if (currentIndex == validationLength) {
          return previous + ' ' + operator + ' ' + current.name
        }

        return previous + current.name + ', '
      }
    )
  }
}
