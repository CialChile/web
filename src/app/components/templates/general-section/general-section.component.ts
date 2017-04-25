import {Component, Input, OnInit} from '@angular/core'
import {FormGroup, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'templates-general-section',
  templateUrl: './general-section.component.html',
  styleUrls: ['./general-section.component.scss']
})
export class GeneralSectionComponent implements OnInit {

  @Input() section;
  @Input() templateForm: FormGroup;
  public fields = [
    {
      name: 'activity_name',
      label: 'Nombre de la Actividad',
      type: 'text',
      validations: {
        required: {
          value: true,
          disabled: true
        },
      },
      editable: {
        value: true,
        disabled: false
      },
      value: '',
      valueRequired: false
    },
    {
      name: 'activity_description',
      label: 'Descripción de la Actividad',
      type: 'textarea',
      validations: {
        required: {
          value: true,
          disabled: false
        },
      },
      editable: {
        value: true,
        disabled: false
      },
      value: '',
      valueRequired: false
    },
  ];

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm()

  }

  get generalForm(): FormArray {
    return this.templateForm.get('general') as FormArray
  }

  private initForm() {
    this.fields.forEach((field) => {
      let fieldConfig: any = {};
      fieldConfig.label = new FormControl(field.label);
      fieldConfig.type = new FormControl(field.type);
      fieldConfig.value = new FormControl('', field.valueRequired ? [Validators.required] : []);
      fieldConfig.editable = new FormControl(field.editable);
      fieldConfig.required = new FormControl(field.validations.required);
      this.generalForm.push(this.formBuilder.group(fieldConfig));
    });
  }


}
