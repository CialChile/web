import {FormGroup, FormArray} from "@angular/forms";
import {TemplatesPersonsHelper} from "./template-persons-helper";
import {TemplatesEquipmentHelper} from "./template-equipment-helper";
import {TemplatesDocumentsHelper} from "./template-documents-helper";
import {TemplatesProceduresHelper} from "./template-procedures-helper";
export class TemplateFormBuilder {
  constructor(private form: FormGroup, private formValues: any) {
  }

  generate() {

    if (this.formValues.persons) {
      this.formValues.persons.forEach((personFormValue) => {
        this.persons.push(TemplatesPersonsHelper.generateValidation(personFormValue.value, personFormValue.validationName, personFormValue.validationLabel, personFormValue.validation, personFormValue.type))
      });
    }
    if (this.formValues.equipment) {
      this.equipment.controls['editable'].setValue(this.formValues.equipment.editable);
      this.formValues.equipment.equipmentList.forEach((equipment) => {
        this.equipmentList.push(TemplatesEquipmentHelper.generateEquipment(equipment.name))
      });
    }

    if (this.formValues.documents) {
      this.formValues.documents.documentList.forEach((document) => {
        this.documentList.push(TemplatesDocumentsHelper.generateDocument(document.name, document.types, document.required))
      });
    }

    if (this.formValues.procedures) {
      this.formValues.procedures.procedureList.forEach((procedure) => {
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
              definitionList.push(TemplatesProceduresHelper.generateVariable(definition.name, definition.from, definition.to, definition.required));
            });
            this.proceduresList.push(TemplatesProceduresHelper.generateType(procedure.type, definitionList));
            break;
          case 'data':
            procedure.definitionList.forEach((definition) => {
              definitionList.push(TemplatesProceduresHelper.generateData(definition.name, definition.type, definition.required));
            });
            this.proceduresList.push(TemplatesProceduresHelper.generateType(procedure.type, definitionList));
            break;
        }
      });
    }

    return this.form;
  }

  get persons(): FormArray {
    return this.form.controls['template'].get('persons') as FormArray;
  };

  get equipmentList(): FormArray {
    return this.equipment.get('equipmentList') as FormArray;
  };

  get proceduresList(): FormArray {
    return this.procedures.get('procedureList') as FormArray;
  };

  get documentList(): FormArray {
    return this.documents.get('documentList') as FormArray;
  };

  get equipment(): FormGroup {
    return this.form.controls['template'].get('equipment') as FormGroup;
  }

  get procedures(): FormGroup {
    return this.form.controls['template'].get('procedures') as FormGroup;
  }

  get documents(): FormGroup {
    return this.form.controls['template'].get('documents') as FormGroup;
  }

}
