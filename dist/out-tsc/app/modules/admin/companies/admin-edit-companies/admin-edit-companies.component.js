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
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../../../../services/api.service";
import { ConfirmationService } from "primeng/components/common/api";
import { objectToFormData } from "../../../../utilities/form/objectToFormData";
var AdminEditCompaniesComponent = (function () {
    function AdminEditCompaniesComponent(formBuilder, apiService, confirmationService, toastr, router, route) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.confirmationService = confirmationService;
        this.toastr = toastr;
        this.router = router;
        this.route = route;
        this.saving = false;
        this.loading = true;
        this.validityMask = [/[1-9]/, /\d/];
        this.telephoneMask = ['+', /[1-9]/, /[0-9]?/, /[0-9]?/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.rutMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d|[kK]/];
        this.image = {
            objectURL: '',
            notDefault: false,
            deleted: false
        };
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
            fax: [''],
            users_number: ['', [Validators.required]],
            responsible: this.formBuilder.group({
                first_name: ['', [Validators.required]],
                last_name: ['', [Validators.required]],
                email: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
                rut_passport: ['', [Validators.required]],
                position: ['', [Validators.required]]
            })
        });
        this.companyForm.controls['country'].valueChanges.subscribe(function (value) {
            if (value) {
                _this.apiService.all('states/' + value).subscribe(function (states) { return _this.states = states.data; });
            }
        });
    }
    AdminEditCompaniesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.all('countries').subscribe(function (countries) { return _this.countries = countries.data; });
        this.apiService.all('company-fields/list').subscribe(function (fields) { return _this.fields = fields.data; });
        this.route.params.subscribe(function (params) {
            _this.apiService.one('admin/companies', params['id'], 'responsible').subscribe(function (company) {
                _this.loading = false;
                _this.image = {
                    objectURL: company.data.image.normal,
                    notDefault: company.data.image.notDefault,
                    deleted: false
                };
                _this.initForm(company.data);
            });
        });
    };
    AdminEditCompaniesComponent.prototype.initForm = function (company) {
        this.company = company;
        this.companyForm.reset(company);
    };
    AdminEditCompaniesComponent.prototype.imageChange = function (image) {
        this.image = image;
    };
    AdminEditCompaniesComponent.prototype.onSubmit = function (form, $event) {
        var _this = this;
        $event.preventDefault();
        this.saving = true;
        var data = this.companyForm.value;
        if (data.responsible.email != this.company.responsible.email) {
            this.confirmationService.confirm({
                message: '¿Estas Seguro? Si Cambias el correo del usuario administrador, se invalidara el usuario anterior y se generara una nueva contraseña',
                accept: function () {
                    _this.save();
                }
            });
        }
        else {
            this.save();
        }
    };
    AdminEditCompaniesComponent.prototype.save = function () {
        var _this = this;
        var formData = objectToFormData(this.companyForm.getRawValue());
        if (this.image instanceof File) {
            formData.append('image', this.image);
        }
        else if (this.image.deleted) {
            formData.append('removeImage', true);
        }
        this.apiService.formDataUpdate('admin/companies', this.company.id, formData).subscribe(function (response) {
            _this.saving = false;
            _this.toastr.success('Empresa actualizada con exito');
            _this.router.navigate(['/admin/companies']);
        }, function (error) {
            _this.toastr.error(error);
            _this.saving = false;
        });
    };
    AdminEditCompaniesComponent.prototype.cancelPrompt = function () {
        this.saving = false;
    };
    AdminEditCompaniesComponent.prototype.goBack = function () {
        this.router.navigate(['/admin/companies']);
    };
    return AdminEditCompaniesComponent;
}());
AdminEditCompaniesComponent = __decorate([
    Component({
        selector: 'admin-edit-companies',
        templateUrl: './admin-edit-companies.component.html',
        styleUrls: ['./admin-edit-companies.component.scss']
    }),
    __metadata("design:paramtypes", [FormBuilder, ApiService, ConfirmationService,
        ToastsManager, Router, ActivatedRoute])
], AdminEditCompaniesComponent);
export { AdminEditCompaniesComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/admin/companies/admin-edit-companies/admin-edit-companies.component.js.map