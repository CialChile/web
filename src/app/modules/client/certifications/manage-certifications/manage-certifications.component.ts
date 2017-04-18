import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-manage-certifications',
  templateUrl: './manage-certifications.component.html',
  styleUrls: ['./manage-certifications.component.scss']
})
export class ManageCertificationsComponent implements OnInit {
  public certificationForm: any;
  public saving: boolean = false;
  public certificationId: number;
  public loading: boolean = false;
  public title: string = 'Nueva Certificación';

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
      title: 'Crear',
      link: '/client/certifications/create',
      active: true
    }
  ];
  public states: any;
  public countries: any;
  public certificationTypes: any;
  public institutes: any;
  public status: any;
  public validityMask: any[] = [/[1-9]/, /\d/, /\d/];
  public VALIDITY_UNITS = [
    {value: 2, label: 'Años'},
    {value: 1, label: 'Meses'},
    {value: 0, label: 'Dias'}
  ];
  certificationsAssets: any[] = [];
  certificationsWorkers: any[] = [];
  displayAddAsset: boolean = false;
  displayAddWorker: boolean = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
              public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
    this.certificationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      description: [''],
      type: ['0'],
      status_id: [''],
      institute_id: ['', Validators.required],
      validity_time: ['', Validators.required],
      validity_time_unit: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.apiService.all('client/certifications/config/institutes').subscribe(institutes => this.institutes = institutes.data.map((institutes) => {
      return {label: institutes.name, value: institutes.id}
    }));
    this.apiService.all('client/config/status/by-type/2').subscribe(statuses => this.status = statuses.data.map((status) => {
      return {label: status.name, value: status.id}
    }));
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.title = 'Editar Certificación';
        this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar';
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/certifications/' + params['id'];
        this.certificationId = params['id'];
        this.loading = true;
        this.apiService.one('client/certifications', params['id'], 'workers,assets').subscribe((certification) => {
          this.loading = false;
          this.certificationsAssets = certification.data.assets;
          this.certificationsWorkers = certification.data.workers;
          if (this.certificationsAssets.length || this.certificationsWorkers.length) {
            this.certificationForm.controls['type'].disable();
          }
          this.initForm(certification.data)
        }, (error) => {
          this.loading = false;
        })
      }
    });
  }

  initForm(certification) {
    this.certificationForm.reset(certification)
  }

  onSubmit() {
    let data = this.certificationForm.value;
    this.saving = true;
    if (this.certificationId) {
      this.apiService.update('client/certifications', this.certificationId, data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Certificación actualizada con exito');
          this.router.navigate(['/client/certifications/list'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    } else {
      this.apiService.create('client/certifications', data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Certificación creada con exito');
          this.router.navigate(['/client/certifications/list'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    }
  }

  removeWorker(worker) {
    this.apiService.destroy('client/workers/' + worker.id + '/certifications', this.certificationId).subscribe((response) => {
        this.toastr.success('Certificado Eliminado con Exito');
        this.certificationsWorkers = this.certificationsWorkers.filter((cert) => {
          return cert.id != worker.id;
        });
        if (!this.certificationsAssets.length && !this.certificationsWorkers.length) {
          this.certificationForm.controls['type'].enable();
        }
      },
      (error) => {
        this.toastr.error(error);
      })
  }

  removeAsset(asset) {
    this.apiService.destroy('client/assets/' + asset.id + '/certifications', this.certificationId).subscribe((response) => {
        this.toastr.success('Certificado Eliminado con Exito');
        this.certificationsAssets = this.certificationsAssets.filter((cert) => {
          return cert.id != asset.id;
        });
        if (!this.certificationsAssets.length && !this.certificationsWorkers.length) {
          this.certificationForm.controls['type'].enable();
        }
      },
      (error) => {
        this.toastr.error(error);
      })
  }

  cancel() {
    this.router.navigate(['/client/certifications/list'])
  }

}
