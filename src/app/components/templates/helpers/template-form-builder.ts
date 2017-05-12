import {FormGroup, FormArray} from "@angular/forms";
import {TemplatesPersonsHelper} from "./template-persons-helper";
import {TemplatesEquipmentHelper} from "./template-equipment-helper";
import {TemplatesDocumentsHelper} from "./template-documents-helper";
import {TemplatesProceduresHelper} from "./template-procedures-helper";
import {TemplatesTimeHelper} from "./template-time-helper";
export class TemplateFormBuilder {
  constructor(private form: FormGroup, private formValues: any) {
  }

  generate() {

    if (this.formValues.persons) {
      this.persons.controls['hasSupervisor'].setValue(this.formValues.persons.hasSupervisor);
      this.formValues.persons.supervisor.forEach((supervisorFormValue) => {
        this.supervisor.push(TemplatesPersonsHelper.generateValidation(supervisorFormValue.value, supervisorFormValue.validationName, supervisorFormValue.validationLabel, supervisorFormValue.validation, supervisorFormValue.type))
      });
      this.formValues.persons.operator.forEach((operatorFormValue) => {
        this.operator.push(TemplatesPersonsHelper.generateValidation(operatorFormValue.value, operatorFormValue.validationName, operatorFormValue.validationLabel, operatorFormValue.validation, operatorFormValue.type))
      });
    }
    if (this.formValues.equipment) {
      this.equipment.controls['editable'].setValue(this.formValues.equipment.editable);
      this.formValues.equipment.equipmentList.forEach((equipment) => {
        this.equipmentList.push(TemplatesEquipmentHelper.generateEquipment(equipment.name))
      });
    }

    if (this.formValues.time) {
      this.time.controls['editable'].setValue(this.formValues.time.editable);

      this.formValues.time.program.forEach((document) => {
        this.programList.push(TemplatesTimeHelper.generateProgram())
      });

      this.formValues.time.validations.forEach((document) => {
        this.validationsList.push(TemplatesTimeHelper.generateValidation())
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

  get persons(): FormGroup {
    return this.form.controls['template'].get('persons') as FormGroup;
  };

  get supervisor(): FormArray {
    return this.persons.get('supervisor') as FormArray;
  };

  get operator(): FormArray {
    return this.persons.get('operator') as FormArray;
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

  get programList(): FormArray {
    return this.time.get('program') as FormArray;
  };

  get validationsList(): FormArray {
    return this.time.get('validations') as FormArray;
  };

  get equipment(): FormGroup {
    return this.form.controls['template'].get('equipment') as FormGroup;
  }

  get time(): FormGroup {
    return this.form.controls['template'].get('time') as FormGroup;
  }

  get procedures(): FormGroup {
    return this.form.controls['template'].get('procedures') as FormGroup;
  }

  get documents(): FormGroup {
    return this.form.controls['template'].get('documents') as FormGroup;
  }

}
