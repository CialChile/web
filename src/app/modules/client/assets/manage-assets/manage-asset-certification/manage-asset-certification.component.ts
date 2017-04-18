import {Component, OnInit} from '@angular/core';
import {DATEPICKERSPANISH} from "../../../../../components/forms/date/datepicker.locale";
import {environment} from "../../../../../../environments/environment";
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: 'app-manage-asset-certification',
  templateUrl: './manage-asset-certification.component.html',
  styleUrls: ['./manage-asset-certification.component.scss']
})
export class ManageAssetCertificationComponent implements OnInit {

  public assetCertificationForm: any;
  public saving: boolean = false;
  public assetId: number;
  public assetCertificationId: number;
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
      title: 'Activos',
      link: '/client/assets',
      active: false
    },
    {
      title: 'Certificaciones',
      link: '/client/assets/certifications',
      active: false
    },
    {
      title: 'Crear',
      link: '/client/assets/certifications',
      active: true
    }
  ];
  public es = DATEPICKERSPANISH;
  public documentUploadUrl: string = environment.baseUrl;
  public assetCertificationDocuments: any[] = [];
  certifications: any[] = [];


  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
              public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
    this.assetCertificationForm = this.formBuilder.group({
      certification: ['', [Validators.required]],
      start_date: [new Date(), [Validators.required]],
    });
  }


  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.assetId = params['id'];
      this.backUrl = '/client/assets/' + this.assetId;
      if (params['assetCertificationId']) {
        this.title = 'Editar Certificación Añadida';
        this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar Certificación';
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/assets/' + params['id'] + '/certifications/' + params['assetCertificationId'];
        this.assetCertificationId = params['assetCertificationId'];
        this.documentUploadUrl += 'client/assets/' + params['id'] + '/certifications/' + params['assetCertificationId'] + '/documents';
        this.loading = true;
        this.assetCertificationForm.controls['certification'].disable();
        this.apiService.one('client/assets/' + params['id'] + '/certifications', params['assetCertificationId'], 'documents,certification').subscribe((certification) => {
          this.assetCertificationDocuments = certification.data.documents;
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
    this.assetCertificationForm.reset(certification)
  }

  searchCertification(event) {
    this.apiService.all('client/certifications/search?name=' + event.query + '&type=' + 0).subscribe((results) => {
      this.certifications = results.data;
    })
  };

  configDocumentUpload(event) {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    event.xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
  }

  documentUploaded(event) {
    const documents = JSON.parse(event.xhr.responseText);
    this.assetCertificationDocuments = documents.data;
  }

  documentErrorUpload(event) {
    const errors = JSON.parse(event.xhr.responseText);
    Object.keys(errors.errors).forEach((property) => {
      this.toastr.error(errors.errors[property], 'Error');
    })
  }

  showDocument(document) {
    let reader = new FileReader();

    this.apiService.downloadDocument('client/assets/' + this.assetId + '/certifications/' + this.assetCertificationId + '/documents/' + document.id, document.mime_type)
      .subscribe(data => {
        let blob: Blob = data.blob();
        reader.readAsDataURL(blob)
      });

    reader.onloadend = function (e) {
      window.open(reader.result);
    }
  }

  removeDocument(doc) {
    this.apiService.destroy('client/assets/' + this.assetId + '/certifications/' + this.assetCertificationId + '/documents', doc.id).toPromise().then((response) => {
      this.assetCertificationDocuments = this.assetCertificationDocuments.filter((document) => {
        return document.id != doc.id;
      });
      this.toastr.success('Documento eliminado con exito');
    })
  }

  onSubmit(form, $event: any) {
    $event.preventDefault();
    let validationError = false;
    let data = Object.assign({}, this.assetCertificationForm.value);
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
      if (this.assetId && this.assetCertificationId) {
        this.apiService.update('client/assets/' + this.assetId + '/certifications', this.assetCertificationId, data).subscribe((response) => {
            this.saving = false;
            this.toastr.success('Certificación actualizada con exito');
            this.router.navigate(['/client/assets/' + this.assetId])
          },
          (error) => {
            this.toastr.error(error);
            this.saving = false;
          })
      } else {
        this.apiService.create('client/assets/' + this.assetId + '/certifications', data).subscribe((response) => {
            this.saving = false;
            this.toastr.success('Certficación añadida al activo con exito');
            this.router.navigate(['/client/assets/' + this.assetId + '/certifications/' + response.data.id])
          },
          (error) => {
            this.toastr.error(error);
            this.saving = false;
          })
      }
    }
  }


  cancel() {
    this.router.navigate(['/client/assets/' + this.assetId])
  }
}
