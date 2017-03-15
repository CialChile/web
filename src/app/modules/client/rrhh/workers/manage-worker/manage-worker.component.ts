import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";
import {ValidationService} from "../../../../../components/forms/validation/validation.service";

@Component({
  selector: 'app-manage-worker',
  templateUrl: 'manage-worker.component.html',
  styleUrls: ['manage-worker.component.scss']
})
export class ManageWorkerComponent implements OnInit {
  private workerForm: any;
  private saving: boolean = false;
  private workerId: number;
  private title: string = 'Nuevo Trabajador';
  private breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'RRHH',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Trabajadores',
      link: '/client/rrhh/workers',
      active: false
    },
    {
      title: 'Crear',
      link: '/client/rrhh/workers/create',
      active: true
    }
  ];
  private countries: any;
  private states: any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
              public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
    this.workerForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.compose([Validators.required, ValidationService.emailValidator])]],
      position: ['', [Validators.required]],
      rut_passport: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      telephone: [''],
      active: [true],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip_code: ['', [Validators.required]],
      address: ['', [Validators.required]],
      emergency_telephone: ['', [Validators.required]],
      emergency_contact: ['', [Validators.required]],
      medical_information: [''],
    });
    this.workerForm.controls['country'].valueChanges.subscribe((value) => {
      if (value) {
        this.apiService.all('state/' + value).subscribe(states => this.states = states.data)
      }
    });
  }

  ngOnInit() {
    this.apiService.all('country').subscribe(countries => this.countries = countries.data)
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.title = 'Editar Trabajador';
        this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar';
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/rrhh/workers/' + params['id'];
        this.workerId = params['id'];
        this.apiService.one('client/worker', params['id']).subscribe((worker) => {
          this.initForm(worker.data)
        })
      }
    });
  }

  initForm(user) {
    this.workerForm.reset(user)
  }

  onSubmit() {
    let data = this.workerForm.value;
    this.saving = true;
    if (this.workerId) {
      this.apiService.update('client/worker', this.workerId, data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Trabajador actualizado con exito');
          this.router.navigate(['/client/rrhh/workers'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    } else {
      this.apiService.create('client/worker', data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Trabajador creado con exito');
          this.router.navigate(['/client/rrhh/workers'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    }
  }

  cancel() {
    this.router.navigate(['/client/rrhh/workers'])
  }

}
