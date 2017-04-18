import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";
import {ValidationService} from "../../../../../components/forms/validation/validation.service";

@Component({
  selector: 'app-manage-institutes',
  templateUrl: './manage-institutes.component.html',
  styleUrls: ['./manage-institutes.component.scss']
})
export class ManageInstitutesComponent implements OnInit {
  public instituteForm: any;
  public saving: boolean = false;
  public instituteId: number;
  public loading: boolean = false;
  public title: string = 'Nuevo Instituto';
  public rutMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d|[kK]/]
  public telephoneMask = ['+', /[1-9]/, /[0-9]?/, /[0-9]?/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  public breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Certificaciones',
      link: '/client/certifications/list',
      active: false
    },
    {
      title: 'Institutos',
      link: '/client/certifications/config/institutes',
      active: false
    },
    {
      title: 'Crear',
      link: '/client/certifications/config/institutes/create',
      active: true
    }
  ];
  public states: any;
  public countries: any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
              public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
    this.instituteForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      rut: ['', Validators.compose([Validators.required, ValidationService.rutValidator])],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: [''],
      city: ['', Validators.required],
      contact: ['', Validators.required],
      telephone_contact: ['', Validators.required],
      email_contact: ['', Validators.compose([Validators.required, ValidationService.emailValidator])]
    });

    this.instituteForm.controls['country'].valueChanges.subscribe((value) => {
      if (value) {
        this.apiService.all('states/' + value).subscribe(states => this.states = states.data)
      }
    });
  }

  ngOnInit() {
    this.apiService.all('countries').subscribe(countries => this.countries = countries.data)
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.title = 'Editar Instituto';
        this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar';
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/certifications/config/institutes/' + params['id'];
        this.instituteId = params['id'];
        this.loading = true;
        this.apiService.one('client/certifications/config/institutes', params['id'], '').subscribe((institute) => {
          this.loading = false;
          this.initForm(institute.data)
        }, (error) => {
          this.loading = false;
        })
      }
    });
  }

  initForm(institute) {
    this.instituteForm.reset(institute)
  }

  onSubmit() {
    let data = this.instituteForm.value;
    this.saving = true;
    if (this.instituteId) {
      this.apiService.update('client/certifications/config/institutes', this.instituteId, data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Instituto actualizado con exito');
          this.router.navigate(['/client/certifications/config/institutes'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    } else {
      this.apiService.create('client/certifications/config/institutes', data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Instituto creado con exito');
          this.router.navigate(['/client/certifications/config/institutes'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    }
  }

  cancel() {
    this.router.navigate(['/client/certifications/config/institutes'])
  }


}
