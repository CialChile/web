import {FormControl, Validators, FormGroup} from "@angular/forms";

export class TemplatesEquipmentHelper {
  public static generateEquipment(name = ''): FormGroup {
    let field: any = {};
    field.name = new FormControl(name, Validators.required);
    return new FormGroup(field);
  }
}
