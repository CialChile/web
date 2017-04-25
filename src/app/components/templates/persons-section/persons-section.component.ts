import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {ValidationService} from "../../forms/validation/validation.service";
import {ToastsManager} from "ng2-toastr";
import {TemplatesPersonsHelper} from "../helpers/template-persons-helper";

@Component({
  selector: 'templates-persons-section',
  templateUrl: './persons-section.component.html',
  styleUrls: ['./persons-section.component.scss']
})
export class PersonsSectionComponent implements OnInit {

  @Input() section;
  @Input() templateForm: FormGroup;
  suggestions = {
    'certifications': [],
    'position': []
  };
  validationsTypes = [
    {
      label: 'Especialidad',
      value: {name: 'specialty'}
    },
    {
      label: 'Certificaciones',
      value: {name: 'certifications'}
    },
    {
      label: 'Expericía',
      value: {name: 'experience'}
    },
    {
      label: 'cargo',
      value: {name: 'position'}
    }
  ];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private toastr: ToastsManager) {
  }

  ngOnInit() {

  }

  get persons(): FormArray {
    return this.templateForm.get('persons') as FormArray;
  };

  addSection() {
    this.section.visible = true;
  }

  removeSection() {
    this.section.visible = false;
    const personsLength = this.persons.controls.length;
    for (let i = personsLength - 1; i >= 0; i--) {
      this.persons.removeAt(i);
    }
  }

  removeValidation(index) {
    this.persons.removeAt(index);
  }

  addValidation() {
    this.persons.push(TemplatesPersonsHelper.generateValidation());
  }

  changeValidationType(event, formGroup, index: number) {
    const experience = this.persons.controls.filter((value) => {
      return value['controls']['validationName'].value == 'experience'
    });
    if (experience.length && event.value.name == 'experience') {
      formGroup.controls['value'].setValue('');
      this.toastr.error('Ya se definio la validación de Años de experiencias');
    } else {
      switch (event.value.name) {
        case 'specialty':
          formGroup.controls['validationName'].setValue('specialty');
          formGroup.controls['validationLabel'].setValue('Especialidad');
          formGroup.controls['validation'].setValidators(Validators.required);
          formGroup.controls['type'].setValue('text');
          break;
        case 'certifications':
          formGroup.controls['validationLabel'].setValue('Certificaciones');
          formGroup.controls['validationName'].setValue('certifications');
          formGroup.controls['validation'].setValidators(Validators.required);
          formGroup.controls['type'].setValue('autocomplete');
          break;
        case 'experience':
          formGroup.controls['validationName'].setValue('experience');
          formGroup.controls['validationLabel'].setValue('Años de Experiencia');
          formGroup.controls['validation'].setValidators(Validators.compose([Validators.required, ValidationService.numberValidator]));
          formGroup.controls['type'].setValue('text');
          break;
        case 'position':
          formGroup.controls['validationName'].setValue('position');
          formGroup.controls['validationLabel'].setValue('Cargo');
          formGroup.controls['validation'].setValidators(Validators.required);
          formGroup.controls['type'].setValue('autocomplete');
          break;
      }
      this.persons.setControl(index, formGroup);
    }
  }

  search(event, name) {
    if (name == 'certifications') {
      this.apiService.all('client/certifications/search?name=' + event.query + '&type=' + 0).subscribe((results) => {
        this.suggestions.certifications = results.data;
      })
    } else {
      this.apiService.all('client/workers/positions/search?name=' + event.query).subscribe((results) => {
        this.suggestions.position = results.data;
      })
    }
  }
}
