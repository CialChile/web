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
var ManageBrandsComponent = (function () {
    function ManageBrandsComponent(formBuilder, apiService, toastr, router, route) {
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.toastr = toastr;
        this.router = router;
        this.route = route;
        this.saving = false;
        this.loading = false;
        this.title = 'Nueva Marca';
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
                title: 'Marcas',
                link: '/client/configuration/brands',
                active: false
            },
            {
                title: 'Crear',
                link: '/client/configuration/brands/create',
                active: true
            }
        ];
        this.brandForm = this.formBuilder.group({
            name: ['', [Validators.required]],
        });
    }
    ManageBrandsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.title = 'Editar Marca';
                _this.breadcrumbs[_this.breadcrumbs.length - 1].title = 'Editar';
                _this.breadcrumbs[_this.breadcrumbs.length - 1].link = '/client/configuration/brands/' + params['id'];
                _this.brandId = params['id'];
                _this.loading = true;
                _this.apiService.one('client/assets/config/brands', params['id'], '').subscribe(function (brand) {
                    _this.loading = false;
                    _this.initForm(brand.data);
                }, function (error) {
                    _this.loading = false;
                });
            }
        });
    };
    ManageBrandsComponent.prototype.initForm = function (brand) {
        this.brandForm.reset(brand);
    };
    ManageBrandsComponent.prototype.onSubmit = function () {
        var _this = this;
        var data = this.brandForm.value;
        this.saving = true;
        if (this.brandId) {
            this.apiService.update('client/assets/config/brands', this.brandId, data).subscribe(function (response) {
                _this.saving = false;
                _this.toastr.success('Marca actualizada con exito');
                _this.router.navigate(['/client/configuration/brands']);
            }, function (error) {
                _this.toastr.error(error);
                _this.saving = false;
            });
        }
        else {
            this.apiService.create('client/assets/config/brands', data).subscribe(function (response) {
                _this.saving = false;
                _this.toastr.success('Marca creada con exito');
                _this.router.navigate(['/client/configuration/brands']);
            }, function (error) {
                _this.toastr.error(error);
                _this.saving = false;
            });
        }
    };
    ManageBrandsComponent.prototype.cancel = function () {
        this.router.navigate(['/client/configuration/brands']);
    };
    return ManageBrandsComponent;
}());
ManageBrandsComponent = __decorate([
    Component({
        selector: 'app-manage-brands',
        templateUrl: './manage-brands.component.html',
        styleUrls: ['./manage-brands.component.scss']
    }),
    __metadata("design:paramtypes", [FormBuilder, ApiService,
        ToastsManager, Router, ActivatedRoute])
], ManageBrandsComponent);
export { ManageBrandsComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/configuration/brands/manage-brands/manage-brands.component.js.map