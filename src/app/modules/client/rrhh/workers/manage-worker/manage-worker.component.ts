import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";
import {ValidationService} from "../../../../../components/forms/validation/validation.service";
import {DATEPICKERSPANISH} from "../../../../../components/forms/date/datepicker.locale";
import {objectToFormData} from "../../../../../utilities/form/objectToFormData";

@Component({
  selector: 'app-manage-worker',
  templateUrl: 'manage-worker.component.html',
  styleUrls: ['manage-worker.component.scss']
})
export class ManageWorkerComponent implements OnInit {
  private workerForm: any;
  private saving: boolean = false;
  private workerId: number;
  private loading: boolean = false;
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
  private tableView: boolean = true;
  private es = DATEPICKERSPANISH;
  private image: any = {
    objectURL: '',
    notDefault: false,
    deleted: false
  };

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
        this.apiService.all('states/' + value).subscribe(states => this.states = states.data)
      }
    });
  }

  ngOnInit() {
    this.apiService.all('countries').subscribe(countries => this.countries = countries.data)
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.title = 'Editar Trabajador';
        this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar';
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/rrhh/workers/' + params['id'];
        this.workerId = params['id'];
        this.loading = true;
        this.apiService.one('client/workers', params['id']).subscribe((worker) => {
          this.initForm(worker.data);
          this.loading = false;
          this.image = {
            objectURL: worker.data.image,
            notDefault: !!worker.data.image,
            deleted: false
          };
        }, (error) => {
          this.loading = false;
        })
      }
    });
  }

  initForm(user) {
    this.workerForm.reset(user)
  }

  onSubmit() {
    let formData = objectToFormData(this.workerForm.value);
    if (this.image instanceof File) {
      formData.append('image', this.image);
    } else if (this.image.deleted) {
      formData.append('removeImage', true);
    }
    this.saving = true;
    if (this.workerId) {
      this.apiService.formDataUpdate('client/workers', this.workerId, formData).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Trabajador actualizado con exito');
          this.router.navigate(['/client/rrhh/workers'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    } else {
      this.apiService.formDataCreate('client/workers', formData).subscribe((response) => {
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

  imageChange(image) {
    this.image = image;
  }

  cancel() {
    this.router.navigate(['/client/rrhh/workers'])
  }

}
