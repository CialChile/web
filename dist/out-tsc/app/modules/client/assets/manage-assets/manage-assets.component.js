var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DATEPICKERSPANISH } from "../../../../components/forms/date/datepicker.locale";
import { FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "../../../../services/api.service";
import { ToastsManager } from "ng2-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { objectToFormData } from "../../../../utilities/form/objectToFormData";
import { parseMask } from "../../../../utilities/form/maskParser";
import { environment } from "../../../../../environments/environment";
var ManageAssetsComponent = (function () {
    function ManageAssetsComponent(formBuilder, apiService, toastr, router, route) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.toastr = toastr;
        this.router = router;
        this.route = route;
        this.saving = false;
        this.loading = false;
        this.title = 'Nuevo Activo';
        this.disableUpload = false;
        this.breadcrumbs = [
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
        this.es = DATEPICKERSPANISH;
        this.imageUploadUrl = environment.baseUrl;
        this.documentUploadUrl = environment.baseUrl;
        this.image = {
            objectURL: '',
            notDefault: false,
            deleted: false
        };
        this.skuMask = false;
        this.validityMask = [/[1-9]/, /\d/];
        this.defaultWorkerImage = 'assets/img/missing.png';
        this.assetImages = [];
        this.assetDocuments = [];
        this.assetForm = this.formBuilder.group({
            sku: ['', [Validators.required]],
            name: ['', [Validators.required]],
            serial: [''],
            validity_time: ['', [Validators.required]],
            integration_date: [new Date(), [Validators.required]],
            end_service_life_date: [{ value: new Date(), disabled: true }],
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
        this.assetForm.controls['name'].valueChanges.subscribe(function (value) {
            if (value) {
                _this.initOverlays(value);
            }
        });
        this.assetForm.controls['brand_id'].valueChanges.subscribe(function (value) {
            if (value) {
                _this.apiService.all('client/assets/config/brands/' + value + '/brand-models').subscribe(function (brandModels) { return _this.brandModels = brandModels.data.map(function (brandModel) {
                    return { label: brandModel.name, value: brandModel.id };
                }); });
            }
        });
        this.assetForm.controls['validity_time'].valueChanges.subscribe(function (value) {
            if (value) {
                _this.setEndServiceLifeDate(value, _this.assetForm.controls['integration_date'].value);
            }
        });
        this.assetForm.controls['integration_date'].valueChanges.subscribe(function (value) {
            if (value) {
                _this.setEndServiceLifeDate(_this.assetForm.controls['validity_time'].value, value);
            }
        });
    }
    Object.defineProperty(ManageAssetsComponent.prototype, "custom_fields", {
        get: function () {
            return this.assetForm.get('custom_fields');
        },
        enumerable: true,
        configurable: true
    });
    ;
    ManageAssetsComponent.prototype.addCustomFields = function (custom_fields_config) {
        var _this = this;
        if (custom_fields_config) {
            var customFields = custom_fields_config.map(function (customField) {
                var formObject = {};
                formObject.value = ['', customField.required ? Validators.required : null];
                formObject.label = [customField.label];
                formObject.required = [customField.required];
                return _this.formBuilder.group(formObject);
            });
            this.assetForm.setControl('custom_fields', this.formBuilder.array(customFields));
        }
    };
    ManageAssetsComponent.prototype.setEndServiceLifeDate = function (validityTime, integrationDate) {
        if (validityTime) {
            if (integrationDate instanceof Date) {
                integrationDate = new Date(integrationDate.getTime());
            }
            else {
                integrationDate = new Date(Date.parse(integrationDate.replace(/([0-9]+)\/([0-9]+)/, '$2/$1')));
            }
            var date = integrationDate.setFullYear(integrationDate.getFullYear() + parseInt(validityTime));
            this.assetForm.controls['end_service_life_date'].setValue(new Date(date));
        }
    };
    ManageAssetsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectedPosition = new google.maps.LatLng(-33.48643545099988, -70.68603515625);
        this.mapOptions = {
            center: this.selectedPosition,
            zoom: 8
        };
        this.initOverlays('Activo');
        this.infoWindow = new google.maps.InfoWindow();
        this.apiService.all('client/assets/config/brands').subscribe(function (brands) { return _this.brands = brands.data.map(function (brand) {
            return { label: brand.name, value: brand.id };
        }); });
        this.apiService.all('client/assets/config').subscribe(function (config) {
            _this.assetConfig = config.data;
            _this.skuMask = false;
            if (config.data.sku_type === 'mask') {
                _this.skuMask = parseMask(config.data.sku_mask);
            }
        });
        this.apiService.all('client/assets/config/categories').subscribe(function (categories) {
            _this.categories = categories.data.map(function (category) {
                return { label: category.name, value: category.id };
            });
            _this.rawCategories = categories.data;
        });
        this.apiService.all('client/assets/config/workplaces').subscribe(function (workplaces) { return _this.workplaces = workplaces.data.map(function (workplace) {
            return { label: workplace.name, value: workplace.id };
        }); });
        this.apiService.all('client/config/status/by-type/0').subscribe(function (statuses) { return _this.status = statuses.data.map(function (status) {
            return { label: status.name, value: status.id };
        }); });
        this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.title = 'Editar Activo';
                _this.breadcrumbs[_this.breadcrumbs.length - 1].title = 'Editar';
                _this.breadcrumbs[_this.breadcrumbs.length - 1].link = '/client/assets/' + params['id'];
                _this.assetId = params['id'];
                _this.imageUploadUrl += 'client/assets/' + params['id'] + '/images';
                _this.documentUploadUrl += 'client/assets/' + params['id'] + '/documents';
                _this.loading = true;
                _this.apiService.one('client/assets', params['id'], 'worker,category,images,coverImage,documents').subscribe(function (asset) {
                    _this.assetImages = asset.data.images;
                    _this.assetDocuments = asset.data.documents;
                    if (_this.assetImages.length >= 5) {
                        _this.disableUpload = true;
                    }
                    _this.selectedPosition = new google.maps.LatLng(asset.data.latitude, asset.data.longitude);
                    _this.mapOptions = {
                        center: _this.selectedPosition,
                        zoom: 8
                    };
                    _this.initOverlays(asset.data.name);
                    _this.initForm(asset.data);
                    _this.subscribeToCategoriesChanges();
                    _this.loading = false;
                    if (asset.data.coverImage) {
                        _this.image = {
                            objectURL: asset.data.coverImage.normal,
                            notDefault: true,
                            deleted: false
                        };
                    }
                    else {
                        _this.image = {
                            objectURL: '',
                            notDefault: false,
                            deleted: false
                        };
                    }
                }, function (error) {
                    _this.loading = false;
                });
            }
            else {
                _this.subscribeToCategoriesChanges();
            }
        });
    };
    ManageAssetsComponent.prototype.initForm = function (asset) {
        var customFields = [];
        var _loop_1 = function (i) {
            var duplicated = asset.custom_fields.filter(function (customField) { return customField.label === asset.category.custom_fields_config[i].label; });
            if (!duplicated.length) {
                customFields.push(asset.category.custom_fields_config[i]);
            }
        };
        for (var i = 0; i < asset.category.custom_fields_config.length; i++) {
            _loop_1(i);
        }
        asset.custom_fields = asset.custom_fields.concat(customFields);
        this.addCustomFields(asset.custom_fields);
        this.assetForm.reset(asset);
    };
    ManageAssetsComponent.prototype.searchWorker = function (event) {
        var _this = this;
        this.apiService.all('client/workers/search/by-name/' + event.query).subscribe(function (results) {
            _this.workers = results.data;
        });
    };
    ;
    ManageAssetsComponent.prototype.configImageUpload = function (event) {
        var uploadedImagesCount = this.assetImages.length;
        var filesToUploadCount = 0;
        event.formData.forEach(function (data) {
            filesToUploadCount++;
        });
        if (uploadedImagesCount + filesToUploadCount > 5) {
            event.xhr.abort();
            this.toastr.error('Recuerda que no puedes subir mas de 5 imagenes por activo');
        }
        else {
            event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            event.xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
        }
    };
    ManageAssetsComponent.prototype.configDocumentUpload = function (event) {
        event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
        event.xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
    };
    ManageAssetsComponent.prototype.imageUploaded = function (event) {
        var images = JSON.parse(event.xhr.responseText);
        this.assetImages = images.data;
        if (this.assetImages.length >= 5) {
            this.disableUpload = true;
        }
    };
    ManageAssetsComponent.prototype.documentUploaded = function (event) {
        var documents = JSON.parse(event.xhr.responseText);
        this.assetDocuments = documents.data;
    };
    ManageAssetsComponent.prototype.documentErrorUpload = function (event) {
        var _this = this;
        var errors = JSON.parse(event.xhr.responseText);
        Object.keys(errors.errors).forEach(function (property) {
            _this.toastr.error(errors.errors[property], 'Error');
        });
    };
    ManageAssetsComponent.prototype.removeImage = function (imageId) {
        var _this = this;
        this.apiService.destroy('client/assets/' + this.assetId + '/images', imageId).toPromise().then(function (response) {
            _this.assetImages = _this.assetImages.filter(function (image) {
                return image.id != imageId;
            });
            if (_this.assetImages.length < 5) {
                _this.disableUpload = false;
            }
            _this.toastr.success('Imagen eliminada con exito');
        });
    };
    ManageAssetsComponent.prototype.showDocument = function (document) {
        var reader = new FileReader();
        this.apiService.downloadDocument(this.assetId, document.id, document.mime_type)
            .subscribe(function (data) {
            var blob = data.blob();
            reader.readAsDataURL(blob);
        });
        reader.onloadend = function (e) {
            window.open(reader.result);
        };
    };
    ManageAssetsComponent.prototype.removeDocument = function (doc) {
        var _this = this;
        this.apiService.destroy('client/assets/' + this.assetId + '/documents', doc.id).toPromise().then(function (response) {
            _this.assetDocuments = _this.assetDocuments.filter(function (document) {
                return document.id != doc.id;
            });
            _this.toastr.success('Documento eliminado con exito');
        });
    };
    ManageAssetsComponent.prototype.initOverlays = function (name) {
        this.mapOverlays = [
            new google.maps.Marker({ position: this.selectedPosition, title: name }),
        ];
    };
    ManageAssetsComponent.prototype.handleMapOverlayClick = function (event) {
        var isMarker = event.overlay.getTitle != undefined;
        if (isMarker) {
            var title = event.overlay.getTitle();
            this.infoWindow.setContent('' + title + '');
            this.infoWindow.open(event.map, event.overlay);
            event.map.setCenter(event.overlay.getPosition());
        }
    };
    ManageAssetsComponent.prototype.handleMapClick = function (event) {
        this.selectedPosition = event.latLng;
        this.addMarker(event.latLng);
    };
    ManageAssetsComponent.prototype.addMarker = function (selectedPosition) {
        this.mapOverlays = [];
        this.mapOverlays.push(new google.maps.Marker({
            position: {
                lat: selectedPosition.lat(),
                lng: selectedPosition.lng()
            }, title: this.assetForm.controls['name'].value, draggable: false
        }));
    };
    ManageAssetsComponent.prototype.onSubmit = function (form, $event) {
        var _this = this;
        $event.preventDefault();
        var validationError = false;
        var data = this.assetForm.getRawValue();
        if (this.skuMask) {
            var sku = this.assetForm.value.sku;
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
            var formData = objectToFormData(data);
            if (this.image instanceof File) {
                formData.append('image', this.image);
            }
            else if (this.image.deleted) {
                formData.append('removeImage', true);
            }
            this.saving = true;
            if (this.assetId) {
                this.apiService.formDataUpdate('client/assets', this.assetId, formData).subscribe(function (response) {
                    _this.saving = false;
                    _this.toastr.success('Activo actualizado con exito');
                    _this.router.navigate(['/client/assets']);
                }, function (error) {
                    _this.toastr.error(error);
                    _this.saving = false;
                });
            }
            else {
                this.apiService.formDataCreate('client/assets', formData).subscribe(function (response) {
                    _this.saving = false;
                    _this.toastr.success('Activo creado con exito');
                    _this.router.navigate(['/client/assets']);
                }, function (error) {
                    _this.toastr.error(error);
                    _this.saving = false;
                });
            }
        }
    };
    ManageAssetsComponent.prototype.imageChange = function (image) {
        this.image = image;
    };
    ManageAssetsComponent.prototype.subscribeToCategoriesChanges = function () {
        var _this = this;
        this.assetForm.controls['category_id'].valueChanges.subscribe(function (value) {
            if (value) {
                var selectedCategory = _this.rawCategories.filter(function (category) {
                    return category.id == value;
                });
                if (selectedCategory.length) {
                    _this.addCustomFields(selectedCategory[0].custom_fields_config);
                }
                _this.apiService.all('client/assets/config/categories/' + value + '/subcategories').subscribe(function (subcategories) { return _this.subcategories = subcategories.data.map(function (subcategory) {
                    return { label: subcategory.name, value: subcategory.id };
                }); });
            }
        });
    };
    ManageAssetsComponent.prototype.cancel = function () {
        this.router.navigate(['/client/assets']);
    };
    return ManageAssetsComponent;
}());
ManageAssetsComponent = __decorate([
    Component({
        selector: 'app-manage-assets',
        templateUrl: './manage-assets.component.html',
        styleUrls: ['./manage-assets.component.scss']
    }),
    __metadata("design:paramtypes", [FormBuilder, ApiService,
        ToastsManager, Router, ActivatedRoute])
], ManageAssetsComponent);
export { ManageAssetsComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/assets/manage-assets/manage-assets.component.js.map