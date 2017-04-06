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
import { FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "../../../../../services/api.service";
import { ToastsManager } from "ng2-toastr";
import { Router, ActivatedRoute } from "@angular/router";
var ManageBrandModelsComponent = (function () {
    function ManageBrandModelsComponent(formBuilder, apiService, toastr, router, route) {
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.toastr = toastr;
        this.router = router;
        this.route = route;
        this.saving = false;
        this.loading = false;
        this.title = 'Nuevo Modelo';
        this.breadcrumbs = [
            {
                title: 'Home',
                link: '/client/dashboard',
                active: false
            },
            {
                title: 'Configuración',
                link: '/client/dashboard',
                active: false
            },
            {
                title: 'Modelos',
                link: '/client/configuration/brand-models',
                active: false
            },
            {
                title: 'Crear',
                link: '/client/configuration/brand-models/create',
                active: true
            }
        ];
        this.brandModelForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            brand: ['', [Validators.required]],
        });
    }
    ManageBrandModelsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.all('client/assets/config/brands').subscribe(function (brands) { return _this.brands = brands.data.map(function (brand) {
            return { label: brand.name, value: brand.id };
        }); });
        this.route.params.subscribe(function (params) {
            if (params['brandModelId']) {
                _this.title = 'Editar Modelo';
                _this.breadcrumbs[_this.breadcrumbs.length - 1].title = 'Editar';
                _this.breadcrumbs[_this.breadcrumbs.length - 1].link = '/client/configuration/brand-models/' + params['id'];
                _this.brandModelId = params['brandModelId'];
                _this.brandId = params['id'];
                _this.loading = true;
                _this.apiService.one('client/assets/config/brands/' + params['id'] + '/brand-models', params['brandModelId'], 'brand').subscribe(function (brandModel) {
                    _this.loading = false;
                    brandModel.data.brand = brandModel.data.brand.id;
                    _this.initForm(brandModel.data);
                }, function (error) {
                    _this.loading = false;
                });
            }
        });
    };
    ManageBrandModelsComponent.prototype.initForm = function (brandModel) {
        this.brandModelForm.reset(brandModel);
    };
    ManageBrandModelsComponent.prototype.onSubmit = function () {
        var _this = this;
        var data = this.brandModelForm.value;
        this.saving = true;
        if (this.brandModelId) {
            this.apiService.update('client/assets/config/brands/' + data.brand + '/brand-models', this.brandModelId, data).subscribe(function (response) {
                _this.saving = false;
                _this.toastr.success('Modelo actualizado con exito');
                _this.router.navigate(['/client/configuration/brands/brand-models']);
            }, function (error) {
                _this.toastr.error(error);
                _this.saving = false;
            });
        }
        else {
            this.apiService.create('client/assets/config/brands/' + data.brand + '/brand-models', data).subscribe(function (response) {
                _this.saving = false;
                _this.toastr.success('Modelo creado con exito');
                _this.router.navigate(['/client/configuration/brands/brand-models']);
            }, function (error) {
                _this.toastr.error(error);
                _this.saving = false;
            });
        }
    };
    ManageBrandModelsComponent.prototype.cancel = function () {
        this.router.navigate(['/client/configuration/brands/brand-models']);
    };
    return ManageBrandModelsComponent;
}());
ManageBrandModelsComponent = __decorate([
    Component({
        selector: 'app-manage-brand-models',
        templateUrl: './manage-brand-models.component.html',
        styleUrls: ['./manage-brand-models.component.scss']
    }),
    __metadata("design:paramtypes", [FormBuilder, ApiService,
        ToastsManager, Router, ActivatedRoute])
], ManageBrandModelsComponent);
export { ManageBrandModelsComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/configuration/brands/manage-brand-models/manage-brand-models.component.js.map