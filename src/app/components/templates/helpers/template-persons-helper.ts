import {FormControl, Validators, FormGroup} from "@angular/forms";

export class TemplatesPersonsHelper {
  public static generateValidation(value = '', validationName = '', validationLabel = '', validation = '', type = ''): FormGroup {
    let fieldConfig: any = {};
    fieldConfig.label = new FormControl('Tipo de Validación');
    fieldConfig.value = new FormControl(value, [Validators.required]);
    fieldConfig.validationName = new FormControl(validationName);
    fieldConfig.validationLabel = new FormControl(validationLabel);
    fieldConfig.validation = new FormControl(validation, [Validators.required]);
    fieldConfig.type = new FormControl(type);
    return new FormGroup(fieldConfig);
  }
}
