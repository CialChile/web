import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ValidationService} from "../../../../components/forms/validation/validation.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../../services/api.service";
import {ConfirmationService} from "primeng/components/common/api";
import {objectToFormData} from "../../../../utilities/form/objectToFormData";

@Component({
  selector: 'admin-edit-companies',
  templateUrl: './admin-edit-companies.component.html',
  styleUrls: ['./admin-edit-companies.component.scss']
})
export class AdminEditCompaniesComponent implements OnInit {
  public companyForm: any;
  public company: any;
  public saving: boolean = false;
  public countries: string[];
  public states: string[];
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
      title: 'Editar',
      link: '/admin/console/companies/create',
      active: true
    }
  ];
  public fields: any[];
  public loading: boolean = true;
  public validityMask: any[] = [/[1-9]/, /\d/, /\d/];
  public telephoneMask = ['+', /[1-9]/, /[0-9]?/, /[0-9]?/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public rutMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d|[kK]/]
  public image = {
    objectURL: '',
    notDefault: false,
    deleted: false
  };

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private confirmationService: ConfirmationService,
              public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
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
    this.apiService.all('countries').subscribe(countries => this.countries = countries.data);
    this.apiService.all('company-fields/list').subscribe(fields => this.fields = fields.data);
    this.route.params.subscribe((params) => {
      this.breadcrumbs[this.breadcrumbs.length - 1].link = '/admin/console/companies/' + params['id'];
      this.apiService.one('admin/companies', params['id'], 'responsible').subscribe((company) => {
        this.loading = false;
        this.image = {
          objectURL: company.data.image.normal,
          notDefault: company.data.image.notDefault,
          deleted: false
        };
        this.initForm(company.data)
      })
    });
  }

  initForm(company) {
    this.company = company;
    this.companyForm.reset(company)
  }

  imageChange(image) {
    this.image = image;
  }

  onSubmit(form, $event: any) {
    $event.preventDefault();
    this.saving = true;
    let data = this.companyForm.value;
    if (data.responsible.email != this.company.responsible.email) {

      this.confirmationService.confirm({
        message: '¿Estas Seguro? Si Cambias el correo del usuario administrador, se invalidara el usuario anterior y se generara una nueva contraseña',
        accept: () => {
          this.save();
        }
      });
    } else {
      this.save();
    }
  }

  save() {
    let formData = objectToFormData(this.companyForm.getRawValue());
    if (this.image instanceof File) {
      formData.append('image', this.image);
    } else if (this.image.deleted) {
      formData.append('removeImage', true);
    }

    this.apiService.formDataUpdate('admin/companies', this.company.id, formData).subscribe((response) => {
        this.saving = false;
        this.toastr.success('Empresa actualizada con exito');
        this.router.navigate(['/admin/console/companies']);
      },
      (error) => {
        this.toastr.error(error);
        this.saving = false;
      });
  }

  cancelPrompt() {
    this.saving = false;
  }

  goBack() {
    this.router.navigate(['/admin/console/companies'])
  }

}
