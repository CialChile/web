import { Component, OnInit } from '@angular/core';
import {DATEPICKERSPANISH} from "../../../../../../components/forms/date/datepicker.locale";
import {environment} from "../../../../../../../environments/environment";
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: 'app-manage-worker-certifications',
  templateUrl: './manage-worker-certifications.component.html',
  styleUrls: ['./manage-worker-certifications.component.scss']
})
export class ManageWorkerCertificationsComponent implements OnInit {
  public workerCertificationForm: any;
  public saving: boolean = false;
  public workerId: number;
  public workerCertificationId: number;
  public loading: boolean = false;
  public title: string = 'Añadir Certificación';
  public disableUpload = false;
  public backUrl: string = '';
  breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Trabajadores',
      link: '/client/workers',
      active: false
    },
    {
      title: 'Certificaciones',
      link: '/client/workers/certifications',
      active: false
    },
    {
      title: 'Crear',
      link: '/client/workers/certifications',
      active: true
    }
  ];
  public es = DATEPICKERSPANISH;
  public documentUploadUrl: string = environment.baseUrl;
  public workerCertificationDocuments: any[] = [];
  certifications: any[] = [];


  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
              public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
    this.workerCertificationForm = this.formBuilder.group({
      certification: ['', [Validators.required]],
      start_date: [new Date(), [Validators.required]],
    });
  }


  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.workerId = params['id'];
      this.backUrl = '/client/rrhh/workers/' + this.workerId;
      if (params['workerCertificationId']) {
        this.title = 'Editar Certificación Añadida';
        this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar Certificación';
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/workers/' + params['id'] + '/certifications/' + params['workerCertificationId'];
        this.workerCertificationId = params['workerCertificationId'];
        this.documentUploadUrl += 'client/workers/' + params['id'] + '/certifications/' + params['workerCertificationId'] + '/documents';
        this.loading = true;
        this.workerCertificationForm.controls['certification'].disable();
        this.apiService.one('client/workers/' + params['id'] + '/certifications', params['workerCertificationId'], 'documents,certification').subscribe((certification) => {
          this.workerCertificationDocuments = certification.data.documents;
          certification.data.certification = {
            id: certification.data.certification_id,
            name: certification.data.name
          };
          this.initForm(certification.data);
          this.loading = false;
        }, (error) => {
          this.loading = false;
        })
      }
    });
  }

  initForm(certification) {
    this.workerCertificationForm.reset(certification)
  }

  searchCertification(event) {
    this.apiService.all('client/certifications/search?name=' + event.query + '&type=' + 1).subscribe((results) => {
      this.certifications = results.data;
    })
  };

  configDocumentUpload(event) {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    event.xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
  }

  documentUploaded(event) {
    const documents = JSON.parse(event.xhr.responseText);
    this.workerCertificationDocuments = documents.data;
  }

  documentErrorUpload(event) {
    const errors = JSON.parse(event.xhr.responseText);
    Object.keys(errors.errors).forEach((property) => {
      this.toastr.error(errors.errors[property], 'Error');
    })
  }

  showDocument(document) {
    let reader = new FileReader();

    this.apiService.downloadDocument('client/workers/' + this.workerId + '/certifications/' + this.workerCertificationId + '/documents/' + document.id, document.mime_type)
      .subscribe(data => {
        let blob: Blob = data.blob();
        reader.readAsDataURL(blob)
      });

    reader.onloadend = function (e) {
      window.open(reader.result);
    }
  }

  removeDocument(doc) {
    this.apiService.destroy('client/workers/' + this.workerId + '/certifications/' + this.workerCertificationId + '/documents', doc.id).toPromise().then((response) => {
      this.workerCertificationDocuments = this.workerCertificationDocuments.filter((document) => {
        return document.id != doc.id;
      });
      this.toastr.success('Documento eliminado con exito');
    })
  }

  onSubmit(form, $event: any) {
    $event.preventDefault();
    let validationError = false;
    let data = Object.assign({}, this.workerCertificationForm.value);
    let startDate = moment(data.start_date)
    if (startDate.isValid()) {
      data.start_date = startDate.format('YYYY-MM-DD');
    } else {
      data.start_date = moment(data.start_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    }
    if (!data.certification.hasOwnProperty('id')) {
      this.toastr.error('Debe especificar un certificado');
      validationError = true;
    }

    if (!validationError) {
      data.certification_id = data.certification.id;
      this.saving = true;
      if (this.workerId && this.workerCertificationId) {
        this.apiService.update('client/workers/' + this.workerId + '/certifications', this.workerCertificationId, data).subscribe((response) => {
            this.saving = false;
            this.toastr.success('Certificación actualizada con exito');
            this.router.navigate(['/client/rrhh/workers/' + this.workerId])
          },
          (error) => {
            this.toastr.error(error);
            this.saving = false;
          })
      } else {
        this.apiService.create('client/workers/' + this.workerId + '/certifications', data).subscribe((response) => {
            this.saving = false;
            this.toastr.success('Certficación añadida al activo con exito');
            this.router.navigate(['/client/rrhh/workers/' + this.workerId + '/certifications/' + response.data.id])
          },
          (error) => {
            this.toastr.error(error);
            this.saving = false;
          })
      }
    }
  }


  cancel() {
    this.router.navigate(['/client/rrhh/workers/' + this.workerId])
  }

}
