import {Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';
import {FormArray, FormGroup, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {ApiService} from "../../../../services/api.service";
import {TemplatesPersonsHelper} from "../../helpers/template-persons-helper";
import {ValidationService} from "../../../forms/validation/validation.service";
import {checkPermission} from "../../../../utilities/permissions/checkPermission";
import {SelectItem} from "primeng/components/common/api";

@Component({
  selector: 'templates-person-manage-operator',
  templateUrl: './manage-operator.component.html',
  styleUrls: ['./manage-operator.component.scss']
})
export class ManageOperatorComponent implements OnInit,OnChanges {
  @Input() operator: FormArray;
  @Input() add: boolean;
  @Input() edit: boolean;
  @Input() isAdmin: boolean;
  @Output() operatorCanceled = new EventEmitter();
  @Output() operatorAdded = new EventEmitter();
  operatorForm: FormGroup;
  validationsTypes: SelectItem[] = [];
  suggestions = {
    'certifications': [],
    'position': [],
    'roles': [],
    'specialty': []
  };
  @Input() operatorFormArrayIndex: number;

  constructor(private toastr: ToastsManager, private apiService: ApiService) {
    this.operatorForm = TemplatesPersonsHelper.generateValidation();
    if (!this.isAdmin) {
      this.validationsTypes = [
        {
          label: 'Especialidad',
          value: {name: 'specialty', label: 'Especialidad'}
        },
        {
          label: 'Certificaciones',
          value: {name: 'certifications', label: 'Certificaciones'}
        },
        {
          label: 'Experiencia',
          value: {name: 'experience', label: 'Experiencia'}
        },
        {
          label: 'Cargo',
          value: {name: 'position', label: 'Cargo'}
        }
      ];
      if (checkPermission('client-security-roles.list')) {
        this.validationsTypes.push({
          label: 'Rol',
          value: {name: 'role', label: 'Rol'}
        })
      }
    } else {
      this.validationsTypes = [
        {
          label: 'Experiencia',
          value: {name: 'experience', label: 'Experiencia'}
        }
      ];
    }

  }

  ngOnInit() {
    if (this.edit) {
      this.loadForm(this.operatorFormArrayIndex)
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['operatorFormArrayIndex'] && changes['operatorFormArrayIndex'].previousValue != changes['operatorFormArrayIndex'].currentValue && !changes['operatorFormArrayIndex'].firstChange) {
      this.loadForm(changes['operatorFormArrayIndex'].currentValue)
    }

    if (changes['add'] && changes['add'].currentValue) {
      this.edit = false;
      this.operatorForm.reset();
    }
  }

  private loadForm(index: number) {
    let values = this.operatorFormArray.at(index).value;
    this.operatorForm.reset(values)
  }

  get operatorFormArray(): FormArray {
    return this.operator as FormArray;
  }

  addValidation(validationForm, event) {
    event.preventDefault();
    const data = this.operatorForm.value;
    let validationError = false;
    if (!data.validation.hasOwnProperty('name') && data.validationName != 'experience') {
      this.toastr.error('Debe especificar un item valido');
      validationError = true;
    }
    if (!validationError) {
      this.operatorAdded.emit();
      let operatorFormCopy = TemplatesPersonsHelper.generateValidation();
      operatorFormCopy.reset(this.operatorForm.value);
      if (this.edit) {
        this.operatorFormArray.removeAt(this.operatorFormArrayIndex);
        this.operatorFormArray.insert(this.operatorFormArrayIndex, operatorFormCopy);
      } else {
        this.operatorFormArray.push(operatorFormCopy);
      }
    }
  }

  changeOperatorValidationType(event, formGroup) {
    const experience = this.operatorFormArray.controls.filter((value) => {
      return value['controls']['validationName'].value == 'experience'
    });
    if (experience.length && event.value.name == 'experience') {
      this.operatorForm.controls['value'].setValue('');
      this.toastr.error('Ya se definió la validación de Años de experiencias');
    } else {
      switch (event.value.name) {
        case 'specialty':
          this.operatorForm.controls['validationName'].setValue('specialty');
          this.operatorForm.controls['validationLabel'].setValue('Especialidad');
          this.operatorForm.controls['validation'].setValidators(Validators.required);
          this.operatorForm.controls['type'].setValue('autocomplete');
          break;
        case 'certifications':
          this.operatorForm.controls['validationLabel'].setValue('Certificaciones');
          this.operatorForm.controls['validationName'].setValue('certifications');
          this.operatorForm.controls['validation'].setValidators(Validators.required);
          this.operatorForm.controls['type'].setValue('autocomplete');
          break;
        case 'experience':
          this.operatorForm.controls['validationName'].setValue('experience');
          this.operatorForm.controls['validationLabel'].setValue('Años de Experiencia');
          this.operatorForm.controls['validation'].setValidators(Validators.compose([Validators.required, ValidationService.numberValidator]));
          this.operatorForm.controls['type'].setValue('text');
          break;
        case 'position':
          this.operatorForm.controls['validationName'].setValue('position');
          this.operatorForm.controls['validationLabel'].setValue('Cargo');
          this.operatorForm.controls['validation'].setValidators(Validators.required);
          this.operatorForm.controls['type'].setValue('autocomplete');
          break;
        case 'role':
          this.operatorForm.controls['validationName'].setValue('roles');
          this.operatorForm.controls['validationLabel'].setValue('Rol');
          this.operatorForm.controls['validation'].setValidators(Validators.required);
          this.operatorForm.controls['type'].setValue('autocomplete');
          break;
      }
    }
  }

  search(event, name) {
    if (name == 'certifications') {
      this.apiService.all('client/certifications/search?name=' + event.query + '&type=' + 0).subscribe((results) => {
        this.suggestions.certifications = results.data;
      })
    } else if (name == 'position') {
      this.apiService.all('client/workers/positions/search?name=' + event.query).subscribe((results) => {
        this.suggestions.position = results.data;
      })
    } else if (name == 'specialty') {
      this.apiService.all('client/workers/specialties/search?name=' + event.query).subscribe((results) => {
        this.suggestions.specialty = results.data;
      })
    } else {
      this.apiService.all('client/roles').subscribe((roles) => {
        this.suggestions.roles = roles.data;
      });
    }
  }

  cancel() {
    this.edit = false;
    this.add = false;
    this.operatorCanceled.emit();
  }
}
