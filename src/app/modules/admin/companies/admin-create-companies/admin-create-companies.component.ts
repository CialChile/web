import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ValidationService} from "../../../../components/forms/validation/validation.service";
import {ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";
import {ApiService} from "../../../../services/api.service";

@Component({
  selector: 'admin-create-companies',
  templateUrl: './admin-create-companies.component.html',
  styleUrls: ['./admin-create-companies.component.scss']
})
export class AdminCreateCompaniesComponent implements OnInit {
  private companyForm: any;
  private saving: boolean = false;
  private countries: string[];
  private states: string[];
  private fields: any[];
  private validityMask: any[] = [/[1-9]/, /\d/];

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
      fax: ['', [Validators.required]],
      users_number: ['', [Validators.required]],
      responsible: this.formBuilder.group({
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
        rut_passport: ['', [Validators.required]],
        position: ['', [Validators.required]]
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

  onSubmit() {
    let data = this.companyForm.value;
    this.saving = true;
    this.apiService.create('admin/companies', data).subscribe((response) => {
        this.saving = false;
        this.toastr.success('Empresa creada con exito');
        this.toastr.success('Un correo electrónico ha sido enviado a la dirección de usuario especificado con mas instrucciones para acceder a la cuenta');
        this.router.navigate(['/admin/companies'])
      },
      (error) => {
        this.toastr.error(error);
        this.saving = false;
      })
  }

  cancel() {
    this.router.navigate(['/admin/companies'])
  }
}
