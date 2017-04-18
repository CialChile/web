import {Component, OnInit} from '@angular/core';
import {DATEPICKERSPANISH} from "../../../../components/forms/date/datepicker.locale";
import {FormBuilder, Validators, FormArray} from "@angular/forms";
import {ApiService} from "../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";
import {objectToFormData} from "../../../../utilities/form/objectToFormData";
import {parseMask} from "../../../../utilities/form/maskParser";
import {environment} from "../../../../../environments/environment";


@Component({
  selector: 'app-manage-assets',
  templateUrl: './manage-assets.component.html',
  styleUrls: ['./manage-assets.component.scss']
})
export class ManageAssetsComponent implements OnInit {
  public assetForm: any;
  public saving: boolean = false;
  public assetId: number;
  public loading: boolean = false;
  public title: string = 'Nuevo Activo';
  public disableUpload = false;
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
      title: 'Crear',
      link: '/client/assets/create',
      active: true
    }
  ];
  public es = DATEPICKERSPANISH;
  public imageUploadUrl: string = environment.baseUrl;
  public documentUploadUrl: string = environment.baseUrl;
  public image: any = {
    objectURL: '',
    notDefault: false,
    deleted: false
  };
  public brandModels: any;
  public subcategories: any;
  public categories: any;
  public brands: any;
  public workplaces: any;
  public assetConfig: any;
  public skuMask: any = false;
  public validityMask: any[] = [/[1-9]/, /\d/];
  public rawCategories: any;
  public status: any;
  public workers: any;
  public defaultWorkerImage: string = 'assets/img/missing.png';
  public assetImages: any[] = [];
  public assetDocuments: any[] = [];
  public mapOptions: google.maps.MapOptions;
  public mapOverlays: google.maps.Marker[];
  public infoWindow: google.maps.InfoWindow;
  public selectedPosition: google.maps.LatLng;
  certifications: any[] = [];


  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
              public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
    this.assetForm = this.formBuilder.group({
      sku: ['', [Validators.required]],
      name: ['', [Validators.required]],
      serial: [''],
      validity_time: ['', [Validators.required]],
      integration_date: [new Date(), [Validators.required]],
      end_service_life_date: [{value: new Date(), disabled: true}],
      warranty_date: [],
      disincorporation_date: [],
      brand_id: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      workplace_id: ['', [Validators.required]],
      status_id: ['', [Validators.required]],
      model_id: [''],
      worker: ['', Validators.required],
      sub_category_id: [''],
      custom_fields: this.formBuilder.array([])
    });

    this.assetForm.controls['name'].valueChanges.subscribe((value) => {
      if (value) {
        this.initOverlays(value);
      }
    });

    this.assetForm.controls['brand_id'].valueChanges.subscribe((value) => {
      if (value) {
        this.apiService.all('client/assets/config/brands/' + value + '/brand-models').subscribe(brandModels => this.brandModels = brandModels.data.map((brandModel) => {
          return {label: brandModel.name, value: brandModel.id}
        }))
      }
    });

    this.assetForm.controls['validity_time'].valueChanges.subscribe((value) => {
      if (value) {
        this.setEndServiceLifeDate(value, this.assetForm.controls['integration_date'].value)
      }
    });

    this.assetForm.controls['integration_date'].valueChanges.subscribe((value) => {
      if (value) {
        this.setEndServiceLifeDate(this.assetForm.controls['validity_time'].value, value)
      }
    });
  }

  get custom_fields(): FormArray {
    return this.assetForm.get('custom_fields') as FormArray;
  };

  private addCustomFields(custom_fields_config: any) {
    if (custom_fields_config) {
      let customFields = custom_fields_config.map((customField) => {
        let formObject = <any>{};
        formObject.value = ['', customField.required ? Validators.required : null];
        formObject.label = [customField.label];
        formObject.required = [customField.required];
        return this.formBuilder.group(formObject);
      });
      this.assetForm.setControl('custom_fields', this.formBuilder.array(customFields));
    }
  }

  setEndServiceLifeDate(validityTime, integrationDate) {
    if (validityTime) {
      if (integrationDate instanceof Date) {
        integrationDate = new Date(integrationDate.getTime());
      } else {
        integrationDate = new Date(Date.parse(integrationDate.replace(/([0-9]+)\/([0-9]+)/, '$2/$1')))
      }
      let date = integrationDate.setFullYear(integrationDate.getFullYear() + parseInt(validityTime));
      this.assetForm.controls['end_service_life_date'].setValue(new Date(date));
    }
  }

  ngOnInit() {
    this.selectedPosition = new google.maps.LatLng(-33.48643545099988, -70.68603515625)
    this.mapOptions = {
      center: this.selectedPosition,
      zoom: 8
    };
    this.initOverlays('Activo');
    this.infoWindow = new google.maps.InfoWindow();

    this.apiService.all('client/assets/config/brands').subscribe(brands => this.brands = brands.data.map((brand) => {
      return {label: brand.name, value: brand.id}
    }));
    this.apiService.all('client/assets/config').subscribe(config => {
      this.assetConfig = config.data;
      this.skuMask = false;
      if (config.data.sku_type === 'mask') {
        this.skuMask = parseMask(config.data.sku_mask)
      }
    });
    this.apiService.all('client/assets/config/categories').subscribe((categories) => {
      this.categories = categories.data.map((category) => {
        return {label: category.name, value: category.id}
      });
      this.rawCategories = categories.data;
    });
    this.apiService.all('client/assets/config/workplaces').subscribe(workplaces => this.workplaces = workplaces.data.map((workplace) => {
      return {label: workplace.name, value: workplace.id}
    }));
    this.apiService.all('client/config/status/by-type/0').subscribe(statuses => this.status = statuses.data.map((status) => {
      return {label: status.name, value: status.id}
    }));
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.title = 'Editar Activo';
        this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar';
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/assets/' + params['id'];
        this.assetId = params['id'];
        this.imageUploadUrl += 'client/assets/' + params['id'] + '/images';
        this.documentUploadUrl += 'client/assets/' + params['id'] + '/documents';
        this.loading = true;
        this.apiService.one('client/assets', params['id'], 'worker,category,images,coverImage,documents,certifications').subscribe((asset) => {
          this.assetImages = asset.data.images;
          this.assetDocuments = asset.data.documents;
          this.certifications = asset.data.certifications;
          if (this.assetImages.length >= 5) {
            this.disableUpload = true;
          }
          this.selectedPosition = new google.maps.LatLng(asset.data.latitude, asset.data.longitude);
          this.mapOptions = {
            center: this.selectedPosition,
            zoom: 8
          };
          this.initOverlays(asset.data.name);
          this.initForm(asset.data);
          this.subscribeToCategoriesChanges();
          this.loading = false;
          if (asset.data.coverImage) {
            this.image = {
              objectURL: asset.data.coverImage.normal,
              notDefault: true,
              deleted: false
            };
          } else {
            this.image = {
              objectURL: '',
              notDefault: false,
              deleted: false
            };
          }
        }, (error) => {
          this.loading = false;
        })
      } else {
        this.subscribeToCategoriesChanges();
      }
    });
  }

  initForm(asset) {
    let customFields = [];
    for (let i = 0; i < asset.category.custom_fields_config.length; i++) {
      const duplicated = asset.custom_fields.filter((customField) => customField.label === asset.category.custom_fields_config[i].label)
      if (!duplicated.length) {
        customFields.push(asset.category.custom_fields_config[i])
      }
    }

    asset.custom_fields = asset.custom_fields.concat(customFields);
    this.addCustomFields(asset.custom_fields);
    this.assetForm.reset(asset)
  }

  searchWorker(event) {
    this.apiService.all('client/workers/search/by-name/' + event.query).subscribe((results) => {
      this.workers = results.data;
    })
  };

  configImageUpload(event) {
    const uploadedImagesCount = this.assetImages.length;
    let filesToUploadCount = 0;
    event.formData.forEach((data) => {
      filesToUploadCount++
    });
    if (uploadedImagesCount + filesToUploadCount > 5) {
      event.xhr.abort();
      this.toastr.error('Recuerda que no puedes subir mas de 5 imagenes por activo');
    } else {
      event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
      event.xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
    }
  }

  configDocumentUpload(event) {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    event.xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
  }

  imageUploaded(event) {
    const images = JSON.parse(event.xhr.responseText);
    this.assetImages = images.data;
    if (this.assetImages.length >= 5) {
      this.disableUpload = true;
    }
  }

  documentUploaded(event) {
    const documents = JSON.parse(event.xhr.responseText);
    this.assetDocuments = documents.data;
  }

  documentErrorUpload(event) {
    const errors = JSON.parse(event.xhr.responseText);
    Object.keys(errors.errors).forEach((property) => {
      this.toastr.error(errors.errors[property], 'Error');
    })
  }

  removeImage(imageId) {
    this.apiService.destroy('client/assets/' + this.assetId + '/images', imageId).toPromise().then((response) => {
      this.assetImages = this.assetImages.filter((image) => {
        return image.id != imageId;
      });

      if (this.assetImages.length < 5) {
        this.disableUpload = false;
      }
      this.toastr.success('Imagen eliminada con exito');
    })
  }

  showDocument(document) {
    let reader = new FileReader();

    this.apiService.downloadDocument('client/assets/' + this.assetId + '/documents/' + document.id, document.mime_type)
      .subscribe(data => {
        let blob: Blob = data.blob();
        reader.readAsDataURL(blob)
      });

    reader.onloadend = function (e) {
      window.open(reader.result);
    }
  }

  removeDocument(doc) {
    this.apiService.destroy('client/assets/' + this.assetId + '/documents', doc.id).toPromise().then((response) => {
      this.assetDocuments = this.assetDocuments.filter((document) => {
        return document.id != doc.id;
      });
      this.toastr.success('Documento eliminado con exito');
    })
  }

  initOverlays(name: string) {
    this.mapOverlays = [
      new google.maps.Marker({position: this.selectedPosition, title: name}),
    ];
  }

  handleMapOverlayClick(event) {
    let isMarker = event.overlay.getTitle != undefined;
    if (isMarker) {
      let title = event.overlay.getTitle();
      this.infoWindow.setContent('' + title + '');
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());
    }
  }

  handleMapClick(event) {
    this.selectedPosition = event.latLng;
    this.addMarker(event.latLng);
  }

  addMarker(selectedPosition) {
    this.mapOverlays = [];
    this.mapOverlays.push(new google.maps.Marker({
      position: {
        lat: selectedPosition.lat(),
        lng: selectedPosition.lng()
      }, title: this.assetForm.controls['name'].value, draggable: false
    }));
  }

  onSubmit(form, $event: any) {
    $event.preventDefault();
    let validationError = false;
    let data = this.assetForm.getRawValue();
    if (this.skuMask) {
      let sku = this.assetForm.value.sku;
      if (sku.indexOf('_') !== -1) {
        this.toastr.error('EL código de Identificación o SKU es invalido, por favor verifique que cumpla con el formato correcto');
        validationError = true;
      }
    }
    if (!data.worker.hasOwnProperty('id')) {
      this.toastr.error('Debe especificar un trabajador responsable del activo');
      validationError = true;
    }

    if (!validationError) {
      data.worker_id = data.worker.id;
      data.location = this.selectedPosition.lat() + ',' + this.selectedPosition.lng();
      delete data.worker;
      let formData = objectToFormData(data);
      if (this.image instanceof File) {
        formData.append('image', this.image);
      } else if (this.image.deleted) {
        formData.append('removeImage', true);
      }
      this.saving = true;
      if (this.assetId) {
        this.apiService.formDataUpdate('client/assets', this.assetId, formData).subscribe((response) => {
            this.saving = false;
            this.toastr.success('Activo actualizado con exito');
            this.router.navigate(['/client/assets'])
          },
          (error) => {
            this.toastr.error(error);
            this.saving = false;
          })
      } else {
        this.apiService.formDataCreate('client/assets', formData).subscribe((response) => {
            this.saving = false;
            this.toastr.success('Activo creado con exito');
            this.router.navigate(['/client/assets'])
          },
          (error) => {
            this.toastr.error(error);
            this.saving = false;
          })
      }
    }
  }

  imageChange(image) {
    this.image = image;
  }

  addCertification() {
    this.router.navigate(['/client/assets/' + this.assetId + '/certifications'])
  }

  removeCertification(certification) {
    this.apiService.destroy('client/assets/' + this.assetId + '/certifications', certification.certification_id).subscribe((response) => {
        this.toastr.success('Certificado Eliminado con Exito');
        this.certifications = this.certifications.filter((cert) => {
          return cert.certification_id != certification.certification_id;
        });
      },
      (error) => {
        this.toastr.error(error);
      })
  }

  editCertification(certification) {
    console.log(certification.certification_id);
    this.router.navigate(['/client/assets/' + this.assetId + '/certifications/' + certification.certification_id])
  }

  subscribeToCategoriesChanges() {
    this.assetForm.controls['category_id'].valueChanges.subscribe((value) => {
      if (value) {
        let selectedCategory = this.rawCategories.filter((category) => {
          return category.id == value
        });
        if (selectedCategory.length) {
          this.addCustomFields(selectedCategory[0].custom_fields_config);
        }
        this.apiService.all('client/assets/config/categories/' + value + '/subcategories').subscribe(subcategories => this.subcategories = subcategories.data.map((subcategory) => {
          return {label: subcategory.name, value: subcategory.id}
        }))
      }
    });
  }

  cancel() {
    this.router.navigate(['/client/assets'])
  }

}
