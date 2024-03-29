import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ValidationService} from "../../../../components/forms/validation/validation.service";
import {ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";
import {ApiService} from "../../../../services/api.service";
import {objectToFormData} from "../../../../utilities/form/objectToFormData";

@Component({
  selector: 'admin-create-companies',
  templateUrl: './admin-create-companies.component.html',
  styleUrls: ['./admin-create-companies.component.scss']
})
export class AdminCreateCompaniesComponent implements OnInit {
  public companyForm: any;
  public saving: boolean = false;
  breadcrumbs = [
    {
      title: 'Home',
      link: '/admin/console/dashboard',
      active: false
    },
    {
      title: 'Empresas',
      link: '/admin/console/companies',
      active: false
    },
    {
      title: 'Crear',
      link: '/admin/console/companies/create',
      active: true
    }
  ];
  public countries: string[];
  public states: string[];
  public fields: any[];
  public validityMask: any[] = [/[1-9]/, /\d/, /\d/];
  public telephoneMask = ['+', /[1-9]/, /[0-9]?/, /[0-9]?/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public rutMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d|[kK]/]
  public image: any = {
    objectURL: '',
    notDefault: false,
    deleted: false
  };

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
              public toastr: ToastsManager, private router: Router) {
    this.companyForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      commercial_name: ['', [Validators.required]],
      fiscal_identification: ['', Validators.compose([Validators.required, ValidationService.rutValidator])],
      field_id: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip_code: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      telephone: ['', [Validators.required]],
      fax: [''],
      users_number: ['', [Validators.required]],
      responsible: this.formBuilder.group({
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
        rut_passport: ['', [Validators.required]],
        position: ['', [Validators.required]],
        specialty: ['', [Validators.required]]
      })
    });
    this.companyForm.controls['country'].valueChanges.subscribe((value) => {
      if (value) {
        this.apiService.all('states/' + value).subscribe(states => this.states = states.data)
      }
    });
  }

  ngOnInit() {
    this.apiService.all('countries').subscribe(countries => this.countries = countries.data)
    this.apiService.all('company-fields/list').subscribe(fields => this.fields = fields.data)
  }

  imageChange(image) {
    this.image = image;
  }

  onSubmit(form, $event: any) {
    $event.preventDefault();
    let data = this.companyForm.getRawValue();
    let formData = objectToFormData(data);
    if (this.image instanceof File) {
      formData.append('image', this.image);
    } else if (this.image.deleted) {
      formData.append('removeImage', true);
    }
    this.saving = true;
    this.apiService.formDataCreate('admin/companies', formData).subscribe((response) => {
        this.saving = false;
        this.toastr.success('Empresa creada con exito');
        this.toastr.success('Un correo electrónico ha sido enviado a la dirección de usuario especificado con mas instrucciones para acceder a la cuenta');
        this.router.navigate(['/admin/console/companies'])
      },
      (error) => {
        this.toastr.error(error);
        this.saving = false;
      })
  }

  cancel() {
    this.router.navigate(['/admin/console/companies'])
  }
}
