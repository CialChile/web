import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";
import {TemplatesProceduresHelper} from "../../../../../components/templates/helpers/template-procedures-helper";

@Component({
  selector: 'app-activity-manage-procedures',
  templateUrl: './manage-procedures.component.html',
  styleUrls: ['./manage-procedures.component.scss']
})
export class ManageProceduresComponent implements OnInit {

  @Input() proceduresFG: FormGroup;
  addingProcedure: boolean = false;
  editingProcedure: boolean = false;
  editProcedureIndex: number;
  procedure: FormGroup;
  procedureForm: any;
  proceduresTypes: any[] = [
    {
      value: {slug: 'step', name: 'Paso a Paso'},
      label: 'Paso a Paso'
    },
    {
      value: {slug: 'checklist', name: 'Checklist'},
      label: 'Checklist'
    },
    {
      value: {slug: 'variables', name: 'Valoración de Variables'},
      label: 'Valoración de Variables'
    },
    {
      value: {slug: 'data', name: 'Ingreso de Datos'},
      label: 'Ingreso de Datos'
    }
  ];

  dataTypes: any[] = [
    {
      value: 'input',
      label: 'Campo de texto'
    },
    {
      value: 'textarea',
      label: 'Campo de Descripción'
    },
    {
      value: 'numbre',
      label: 'Campo Numerico'
    },
  ];

  constructor(private formBuilder: FormBuilder) {
    this.procedureForm = this.formBuilder.group({
      type: ['', Validators.required],
      definitionList: this.formBuilder.array([])
    })
  }

  ngOnInit() {
  }

  get procedureList(): FormArray {
    return this.proceduresFG.get('procedureList') as FormArray;
  };

  get definitionList(): FormArray {
    return this.procedureForm.get('definitionList') as FormArray;
  };

  newProcedure() {
    this.addingProcedure = true;
    this.procedureForm.reset();
  }

  editProcedure(procedure, index: number) {
    this.editProcedureIndex = index;
    this.editingProcedure = true;
    this.changeProcedureType();
    let procedureForm = procedure;
    this.procedureForm.controls['type'].setValue(procedure.controls['type'].value);
    const type = procedure.controls['type'].value;
    switch (type.slug) {
      case 'step':
        procedureForm.controls['definitionList'].controls.forEach((control) => {
          this.addStep(control.controls['value'].value, true)
        });
        break;
      case 'checklist':
        procedureForm.controls['definitionList'].controls.forEach((control) => {
          this.addStep(control.controls['value'].value, true)
        });
        break;
      case 'variables':
        procedureForm.controls['definitionList'].controls.forEach((control) => {
          this.addVariable(control.controls['variableName'].value, control.controls['from'].value, control.controls['to'].value, control.controls['required'].value, true)
        });
        break;
      case 'data':
        procedureForm.controls['definitionList'].controls.forEach((control) => {
          this.addData(control.controls['dataName'].value, control.controls['dataType'].value, control.controls['required'].value, true)
        });
        break;
    }
  }

  changeProcedureType() {
    const procedureDefinitionLength = this.definitionList.controls.length;
    for (let i = procedureDefinitionLength - 1; i >= 0; i--) {
      this.definitionList.removeAt(i);
    }
  }

  removeProcedure(index: number) {
    this.procedureList.removeAt(index)
  }

  addProcedure(procedureForm, event) {
    event.preventDefault();
    const type = procedureForm.controls['type'].value;
    let definition = this.formBuilder.array([]);
    switch (type.slug) {
      case 'step':
        procedureForm.controls['definitionList'].controls.forEach((control) => {
          definition.push(this.addStep(control.controls['value'].value, false))
        });
        break;
      case 'checklist':
        procedureForm.controls['definitionList'].controls.forEach((control) => {
          definition.push(this.addStep(control.controls['value'].value, false))
        });
        break;
      case 'variables':
        procedureForm.controls['definitionList'].controls.forEach((control) => {
          definition.push(this.addVariable(control.controls['variableName'].value, control.controls['from'].value, control.controls['to'].value, control.controls['required'].value, false))
        });
        break;
      case 'data':
        procedureForm.controls['definitionList'].controls.forEach((control) => {
          definition.push(this.addData(control.controls['dataName'].value, control.controls['dataType'].value, control.controls['required'].value, false))
        });
        break;
    }
    const procedureFormCopy = this.formBuilder.group({
      type: [type, Validators.required],
      definitionList: definition
    });

    if (this.editingProcedure) {
      this.procedureList.removeAt(this.editProcedureIndex);
      this.procedureList.insert(this.editProcedureIndex, procedureFormCopy);
      this.editingProcedure = false;
    } else {
      this.procedureList.push(procedureFormCopy);
      this.addingProcedure = false;
    }
  }

  addStep(value = '', add = true): FormGroup {
    let fieldConfig: FormGroup = TemplatesProceduresHelper.generateStep(value);
    if (add) {
      this.definitionList.push(fieldConfig);
    }
    return fieldConfig;
  }

  addVariable(name = '', from = '', to = '', required = true, add = true): FormGroup {
    let fieldConfig: FormGroup = TemplatesProceduresHelper.generateVariable(name, from, to, required);
    if (add) {
      this.definitionList.push(fieldConfig);
    }
    return fieldConfig;
  }

  addData(name = '', type = '', required = true, add = true): FormGroup {
    let fieldConfig: FormGroup = TemplatesProceduresHelper.generateData(name, type, required);
    if (add) {
      this.definitionList.push(fieldConfig);
    }
    return fieldConfig;
  }

  removeDefinitionItem(index: number) {
    this.definitionList.removeAt(index)
  }

  cancelAddProcedure() {
    this.addingProcedure = false;
    this.editingProcedure = false;
  }


}
