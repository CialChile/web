import {FormControl, Validators, FormGroup} from "@angular/forms";

export class TemplatesDocumentsHelper {
  public static generateDocument(name = '', types = [], required = true): FormGroup {
    let field: any = {};
    field.name = new FormControl(name, Validators.required);
    field.types = new FormControl(types, Validators.required);
    field.required = new FormControl(required);
    return new FormGroup(field);
  }
}
