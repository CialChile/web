import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ValidationService} from "../../../../components/forms/validation/validation.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../../services/api.service";
import {ModalDirective} from "ng2-bootstrap";
import {ConfirmationService} from "primeng/components/common/api";

@Component({
  selector: 'admin-edit-companies',
  templateUrl: './admin-edit-companies.component.html',
  styleUrls: ['./admin-edit-companies.component.scss']
})
export class AdminEditCompaniesComponent implements OnInit {
  private companyForm: any;
  private company: any;
  private saving: boolean = false;
  protected countries: string[];
  protected states: string[];
  protected fields: any[];
  private loading: boolean = true;
  private validityMask: any[] = [/[1-9]/, /\d/];

  @ViewChild('prompt') public promptModal: ModalDirective;

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
    this.apiService.all('countries').subscribe(countries => this.countries = countries.data);
    this.apiService.all('company-fields/list').subscribe(fields => this.fields = fields.data);
    this.route.params.subscribe((params) => {
      this.apiService.one('admin/companies', params['id'], 'responsible').subscribe((company) => {
        this.loading = false;
        this.initForm(company.data)
      })
    });
  }

  initForm(company) {
    this.company = company;
    this.companyForm.reset(company)
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
    let data = this.companyForm.value;
    this.promptModal.hide();
    this.apiService.update('admin/companies', this.company.id, data).subscribe((response) => {
        this.saving = false;
        this.toastr.success('Empresa actualizada con exito');
        this.router.navigate(['/admin/companies']);
      },
      (error) => {
        this.toastr.error(error);
        this.saving = false;
      });
  }

  cancelPrompt() {
    this.saving = false;
    this.promptModal.hide();
  }

  goBack() {
    this.router.navigate(['/admin/companies'])
  }

}
