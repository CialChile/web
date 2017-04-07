import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormArray} from "@angular/forms";
import {ApiService} from "../../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})
export class ManageCategoriesComponent implements OnInit {

  public categoryForm: any;
  public saving: boolean = false;
  public categoryId: number;
  public loading: boolean = false;
  public title: string = 'Nueva Categoría';
  public customFields: any[] = [];
  public breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Configuración',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Categorías',
      link: '/client/configuration/categories',
      active: false
    },
    {
      title: 'Crear',
      link: '/client/configuration/categories/create',
      active: true
    }
  ];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
              public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      custom_fields_config: this.formBuilder.array([])
    });
  }

  get custom_fields_config(): FormArray {
    return this.categoryForm.get('custom_fields_config') as FormArray;
  };

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.title = 'Editar Categoria';
        this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar';
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/configuration/categories/' + params['id'];
        this.categoryId = params['id'];
        this.loading = true;
        this.apiService.one('client/assets/config/categories', params['id'], '').subscribe((category) => {
          this.loading = false;
          this.initForm(category.data)
        }, (error) => {
          this.loading = false;
        })
      }
    });
  }

  initForm(category) {
    this.customFields = category.custom_fields_config.map((customField) => {
      return this.formBuilder.group({
        label: [customField.label, Validators.required],
        required: [customField.required]
      });
    });
    if (this.customFields.length) {
      this.categoryForm.setControl('custom_fields_config', this.formBuilder.array(this.customFields));
    }
    this.categoryForm.reset(category)
  }

  addCustomField() {
    let customField = this.formBuilder.group({
      label: ['', Validators.required],
      required: [true]
    });

    this.customFields.push(customField);
    this.categoryForm.setControl('custom_fields_config', this.formBuilder.array(this.customFields));
  }

  removeCustomField(index) {
    this.customFields.splice(index, 1);
    this.categoryForm.setControl('custom_fields_config', this.formBuilder.array(this.customFields));
  }

  onSubmit() {
    let data = this.categoryForm.value;
    this.saving = true;
    if (this.categoryId) {
      this.apiService.update('client/assets/config/categories', this.categoryId, data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Categoría actualizada con exito');
          this.router.navigate(['/client/configuration/categories'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    } else {
      this.apiService.create('client/assets/config/categories', data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Categoría creada con exito');
          this.router.navigate(['/client/configuration/categories'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    }
  }

  cancel() {
    this.router.navigate(['/client/configuration/categories'])
  }

}
