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
import { ValidationService } from "../../../../components/forms/validation/validation.service";
import { ToastsManager } from "ng2-toastr";
import { Router } from "@angular/router";
import { ApiService } from "../../../../services/api.service";
export var AdminCreateCompaniesComponent = (function () {
    function AdminCreateCompaniesComponent(formBuilder, apiService, toastr, router) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.toastr = toastr;
        this.router = router;
        this.saving = false;
        this.companyForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            commercial_name: ['', [Validators.required]],
            fiscal_identification: ['', Validators.compose([Validators.required, ValidationService.rutValidator])],
            field_id: ['', [Validators.required]],
            country: ['', [Validators.required]],
            state: ['', [Validators.required]],
            city: ['', [Validators.required]],
            zip_code: ['', [Validators.required]],
            address: ['', [Validators.required]],
            email: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
            telephone: ['', [Validators.required]],
            fax: ['', [Validators.required]],
            users_number: ['', [Validators.required]],
            user: this.formBuilder.group({
                first_name: ['', [Validators.required]],
                last_name: ['', [Validators.required]],
                email: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
                rut_passport: ['', [Validators.required]],
                position: ['', [Validators.required]]
            })
        });
        this.companyForm.controls['country'].valueChanges.subscribe(function (value) {
            if (value) {
                _this.apiService.all('state/' + value).subscribe(function (states) { return _this.states = states.data; });
            }
        });
    }
    AdminCreateCompaniesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.all('country').subscribe(function (countries) { return _this.countries = countries.data; });
        this.apiService.all('company-field/list').subscribe(function (fields) { return _this.fields = fields.data; });
    };
    AdminCreateCompaniesComponent.prototype.onSubmit = function () {
        var _this = this;
        var data = this.companyForm.value;
        this.saving = true;
        this.apiService.create('company', data).subscribe(function (response) {
            _this.saving = false;
            _this.toastr.success('Empresa creada con exito');
            _this.toastr.success('Un correo electrónico ha sido enviado a la dirección de usuario especificado con mas instrucciones para acceder a la cuenta');
            _this.router.navigate(['/admin/companies']);
        }, function (error) {
            _this.toastr.error(error);
            _this.saving = false;
        });
    };
    AdminCreateCompaniesComponent.prototype.cancel = function () {
        this.router.navigate(['/admin/companies']);
    };
    AdminCreateCompaniesComponent = __decorate([
        Component({
            selector: 'admin-create-companies',
            templateUrl: './admin-create-companies.component.html',
            styleUrls: ['./admin-create-companies.component.scss']
        }), 
        __metadata('design:paramtypes', [FormBuilder, ApiService, ToastsManager, Router])
    ], AdminCreateCompaniesComponent);
    return AdminCreateCompaniesComponent;
}());
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/admin/companies/admin-create-companies/admin-create-companies.component.js.map