import {FormControl, Validators, FormGroup, FormArray} from "@angular/forms";

export class TemplatesProceduresHelper {
  public static  generateType(type = '', definitionList: FormArray): FormGroup {
    let fieldConfig: any = {};
    fieldConfig.type = new FormControl(type, [Validators.required]);
    fieldConfig.definitionList = definitionList;
    return new FormGroup(fieldConfig);
  }

  public static  generateStep(value = ''): FormGroup {
    let fieldConfig: any = {};
    fieldConfig.value = new FormControl(value, [Validators.required]);
    return new FormGroup(fieldConfig);
  }

  public static generateVariable(name = '', from = '', to = '', required = true): FormGroup {
    let fieldConfig: any = {};
    fieldConfig.variableName = new FormControl(name, [Validators.required]);
    fieldConfig.from = new FormControl(from, [Validators.required]);
    fieldConfig.to = new FormControl(to, [Validators.required]);
    fieldConfig.required = new FormControl(required);
    return new FormGroup(fieldConfig);
  }

  public static generateData(name = '', type = '', required = true): FormGroup {
    let fieldConfig: any = {};
    fieldConfig.dataName = new FormControl(name, [Validators.required]);
    fieldConfig.dataType = new FormControl(type, [Validators.required]);
    fieldConfig.required = new FormControl(required);
    return new FormGroup(fieldConfig);
  }
}
