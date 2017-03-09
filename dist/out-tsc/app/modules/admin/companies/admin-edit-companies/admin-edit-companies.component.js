var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ValidationService } from "../../../../components/forms/validation/validation.service";
import { ToastsManager } from "ng2-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../../../../services/api.service";
import { ModalDirective } from "ng2-bootstrap";
export var AdminEditCompaniesComponent = (function () {
    function AdminEditCompaniesComponent(formBuilder, apiService, toastr, router, route) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.toastr = toastr;
        this.router = router;
        this.route = route;
        this.saving = false;
        this.loading = true;
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
    AdminEditCompaniesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.all('country').subscribe(function (countries) { return _this.countries = countries.data; });
        this.apiService.all('company-field/list').subscribe(function (fields) { return _this.fields = fields.data; });
        this.route.params.subscribe(function (params) {
            _this.apiService.one('company', params['id'], 'user').subscribe(function (company) {
                _this.loading = false;
                _this.initForm(company.data);
            });
        });
    };
    AdminEditCompaniesComponent.prototype.initForm = function (company) {
        this.company = company;
        this.companyForm.reset(company);
    };
    AdminEditCompaniesComponent.prototype.onSubmit = function (form, $event) {
        $event.preventDefault();
        this.saving = true;
        var data = this.companyForm.value;
        if (data.user.email != this.company.user.email) {
            this.promptModal.show();
        }
        else {
            this.save();
        }
    };
    AdminEditCompaniesComponent.prototype.save = function () {
        var _this = this;
        var data = this.companyForm.value;
        this.promptModal.hide();
        this.apiService.update('company', this.company.id, data).subscribe(function (response) {
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
        this.promptModal.hide();
    };
    AdminEditCompaniesComponent.prototype.goBack = function () {
        this.router.navigate(['/admin/companies']);
    };
    __decorate([
        ViewChild('prompt'), 
        __metadata('design:type', ModalDirective)
    ], AdminEditCompaniesComponent.prototype, "promptModal", void 0);
    AdminEditCompaniesComponent = __decorate([
        Component({
            selector: 'admin-edit-companies',
            templateUrl: './admin-edit-companies.component.html',
            styleUrls: ['./admin-edit-companies.component.scss']
        }), 
        __metadata('design:paramtypes', [FormBuilder, ApiService, ToastsManager, Router, ActivatedRoute])
    ], AdminEditCompaniesComponent);
    return AdminEditCompaniesComponent;
}());
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/admin/companies/admin-edit-companies/admin-edit-companies.component.js.map