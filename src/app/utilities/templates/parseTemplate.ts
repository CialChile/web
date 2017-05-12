import {FormGroup, Validators, FormControl, FormArray} from "@angular/forms";
import {TemplatesProceduresHelper} from "../../components/templates/helpers/template-procedures-helper";
import {TemplatesEquipmentHelper} from "../../components/templates/helpers/template-equipment-helper";

export class TemplateParser {


  constructor(private template, private form: FormGroup) {

  }

  parse(): FormGroup {
    this.form = this.parseGeneral(this.template.general, this.form);
    this.parseProcedures(this.template.procedures);
    this.parseEquipment(this.template.equipment);
    return this.form;
  }

  parseGeneral(general, form: FormGroup): FormGroup {

    form.controls['name'].setValue(general[0].value ? general[0].value : '');
    form.controls['description'].setValue(general[1].value ? general[1].value : '');
    if (!general[0].editable) {
      form.controls['name'].setValidators([]);
    }
    this.disableControl(!general[0].editable, form.controls['name']);
    this.disableControl(!general[1].editable, form.controls['description']);
    this.requiredControlValidation(general[1].required, form.controls['description']);
    return form;
  }

  disableControl(condition, control) {
    if (condition) {
      control.disable();
    } else {
      control.enable();
    }
  }

  requiredControlValidation(condition, control) {
    if (condition) {
      control.setValidators([Validators.required]);
    } else {
      control.setValidators([]);
    }
  }

  get procedures(): FormGroup {
    return this.form.get('procedures') as FormGroup;
  }

  get equipment(): FormGroup {
    return this.form.get('equipment') as FormGroup;
  }

  get equipmentList(): FormArray {
    return this.equipment.get('equipmentList') as FormArray;
  };

  get proceduresList(): FormArray {
    return this.procedures.get('procedureList') as FormArray;
  };

  private parseProcedures(procedures) {

    const proceduresLength = this.proceduresList.controls.length;
    for (let i = proceduresLength - 1; i >= 0; i--) {
      this.proceduresList.removeAt(i);
    }

    if (procedures) {
      procedures.procedureList.forEach((procedure) => {
        let definitionList = new FormArray([]);
        switch (procedure.type.slug) {
          case 'step':
            procedure.definitionList.forEach((definition) => {
              definitionList.push(TemplatesProceduresHelper.generateStep(definition.value));
            });
            this.proceduresList.push(TemplatesProceduresHelper.generateType(procedure.type, definitionList));
            break;
          case 'checklist':
            procedure.definitionList.forEach((definition) => {
              definitionList.push(TemplatesProceduresHelper.generateStep(definition.value));
            });
            this.proceduresList.push(TemplatesProceduresHelper.generateType(procedure.type, definitionList));
            break;
          case 'variables':
            procedure.definitionList.forEach((definition) => {
              definitionList.push(TemplatesProceduresHelper.generateVariable(definition.variableName, definition.from, definition.to, definition.required));
            });
            this.proceduresList.push(TemplatesProceduresHelper.generateType(procedure.type, definitionList));
            break;
          case 'data':
            procedure.definitionList.forEach((definition) => {
              definitionList.push(TemplatesProceduresHelper.generateData(definition.dataName, definition.dataType, definition.required));
            });
            this.proceduresList.push(TemplatesProceduresHelper.generateType(procedure.type, definitionList));
            break;
        }
      });
    }
  }

  private parseEquipment(equipment) {

    const equipmentLength = this.equipmentList.controls.length;
    for (let i = equipmentLength - 1; i >= 0; i--) {
      this.equipmentList.removeAt(i);
    }
    if (equipment) {
      equipment.equipmentList.forEach((equip) => {
        let equipmentData = equip.name;
        if (!equipment.editable) {
          equipmentData = {value: equip.name, disabled: true}
        }
        this.equipmentList.push(TemplatesEquipmentHelper.generateEquipment(equipmentData))
      });
    }
  }
}

