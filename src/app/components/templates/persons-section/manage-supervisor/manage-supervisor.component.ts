import {Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';
import {FormArray, FormGroup, Validators} from "@angular/forms";
import {TemplatesPersonsHelper} from "../../helpers/template-persons-helper";
import {ToastsManager} from "ng2-toastr";
import {ValidationService} from "../../../forms/validation/validation.service";
import {ApiService} from "../../../../services/api.service";
import {checkPermission} from "../../../../utilities/permissions/checkPermission";
import {SelectItem} from "primeng/components/common/api";

@Component({
  selector: 'templates-person-manage-supervisor',
  templateUrl: './manage-supervisor.component.html',
  styleUrls: ['./manage-supervisor.component.scss']
})
export class ManageSupervisorComponent implements OnInit, OnChanges {

  @Input() supervisor: FormArray;
  @Input() add: boolean;
  @Input() edit: boolean;
  @Input() isAdmin: boolean;
  @Output() supervisorCanceled = new EventEmitter();
  @Output() supervisorAdded = new EventEmitter();
  supervisorForm: FormGroup;
  validationsTypes: SelectItem[] = [];
  suggestions = {
    'certifications': [],
    'position': [],
    'roles': [],
    'specialty': []
  };
  @Input() supervisorFormArrayIndex: number;

  constructor(private toastr: ToastsManager, private apiService: ApiService) {
    this.supervisorForm = TemplatesPersonsHelper.generateValidation();
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
      this.loadForm(this.supervisorFormArrayIndex);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['supervisorFormArrayIndex'] && changes['supervisorFormArrayIndex'].previousValue != changes['supervisorFormArrayIndex'].currentValue && !changes['supervisorFormArrayIndex'].firstChange) {
      this.loadForm(changes['supervisorFormArrayIndex'].currentValue)
    }

    if (changes['add'] && changes['add'].currentValue) {
      this.edit = false;
      this.supervisorForm.reset();
    }
  }

  private loadForm(index: number) {
    let values = this.supervisorFormArray.at(index).value;
    this.supervisorForm.reset(values)
  }

  get supervisorFormArray(): FormArray {
    return this.supervisor as FormArray;
  }

  addValidation(validationForm, event) {
    event.preventDefault();
    const data = this.supervisorForm.value;
    let validationError = false;
    if (!data.validation.hasOwnProperty('name') && data.validationName != 'experience') {
      this.toastr.error('Debe especificar un item valido');
      validationError = true;
    }
    if (!validationError) {
      this.supervisorAdded.emit();
      let supervisorFormCopy = TemplatesPersonsHelper.generateValidation();
      supervisorFormCopy.reset(this.supervisorForm.value);
      if (this.edit) {
        this.supervisorFormArray.removeAt(this.supervisorFormArrayIndex);
        this.supervisorFormArray.insert(this.supervisorFormArrayIndex, supervisorFormCopy);
      } else {
        this.supervisorFormArray.push(supervisorFormCopy);
      }
    }
  }

  changeSupervisorValidationType(event, formGroup) {
    const experience = this.supervisorFormArray.controls.filter((value) => {
      return value['controls']['validationName'].value == 'experience'
    });
    if (experience.length && event.value.name == 'experience') {
      this.supervisorForm.controls['value'].setValue('');
      this.toastr.error('Ya se definió la validación de Años de experiencias');
    } else {
      switch (event.value.name) {
        case 'specialty':
          this.supervisorForm.controls['validationName'].setValue('specialty');
          this.supervisorForm.controls['validationLabel'].setValue('Especialidad');
          this.supervisorForm.controls['validation'].setValidators(Validators.required);
          this.supervisorForm.controls['type'].setValue('autocomplete');
          break;
        case 'certifications':
          this.supervisorForm.controls['validationLabel'].setValue('Certificaciones');
          this.supervisorForm.controls['validationName'].setValue('certifications');
          this.supervisorForm.controls['validation'].setValidators(Validators.required);
          this.supervisorForm.controls['type'].setValue('autocomplete');
          break;
        case 'experience':
          this.supervisorForm.controls['validationName'].setValue('experience');
          this.supervisorForm.controls['validationLabel'].setValue('Años de Experiencia');
          this.supervisorForm.controls['validation'].setValidators(Validators.compose([Validators.required, ValidationService.numberValidator]));
          this.supervisorForm.controls['type'].setValue('text');
          break;
        case 'position':
          this.supervisorForm.controls['validationName'].setValue('position');
          this.supervisorForm.controls['validationLabel'].setValue('Cargo');
          this.supervisorForm.controls['validation'].setValidators(Validators.required);
          this.supervisorForm.controls['type'].setValue('autocomplete');
          break;
        case 'role':
          this.supervisorForm.controls['validationName'].setValue('roles');
          this.supervisorForm.controls['validationLabel'].setValue('Rol');
          this.supervisorForm.controls['validation'].setValidators(Validators.required);
          this.supervisorForm.controls['type'].setValue('autocomplete');
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
    this.supervisorCanceled.emit();
  }
}
