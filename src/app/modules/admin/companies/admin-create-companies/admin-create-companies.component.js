"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var validation_service_1 = require("../../../../components/forms/validation/validation.service");
var AdminCreateCompaniesComponent = (function () {
    function AdminCreateCompaniesComponent(formBuilder, apiService, toastr, router) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.toastr = toastr;
        this.router = router;
        this.saving = false;
        this.validityMask = [/[1-9]/, /\d/];
        this.companyForm = this.formBuilder.group({
            name: ['', [forms_1.Validators.required]],
            commercial_name: ['', [forms_1.Validators.required]],
            fiscal_identification: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.rutValidator])],
            field_id: ['', [forms_1.Validators.required]],
            country: ['', [forms_1.Validators.required]],
            state: ['', [forms_1.Validators.required]],
            city: ['', [forms_1.Validators.required]],
            zip_code: ['', [forms_1.Validators.required]],
            address: ['', [forms_1.Validators.required]],
            email: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.emailValidator])],
            telephone: ['', [forms_1.Validators.required]],
            fax: ['', [forms_1.Validators.required]],
            users_number: ['', [forms_1.Validators.required]],
            responsible: this.formBuilder.group({
                first_name: ['', [forms_1.Validators.required]],
                last_name: ['', [forms_1.Validators.required]],
                email: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.emailValidator])],
                rut_passport: ['', [forms_1.Validators.required]],
                position: ['', [forms_1.Validators.required]]
            })
        });
        this.companyForm.controls['country'].valueChanges.subscribe(function (value) {
            if (value) {
                _this.apiService.all('states/' + value).subscribe(function (states) { return _this.states = states.data; });
            }
        });
    }
    AdminCreateCompaniesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.all('countries').subscribe(function (countries) { return _this.countries = countries.data; });
        this.apiService.all('company-fields/list').subscribe(function (fields) { return _this.fields = fields.data; });
    };
    AdminCreateCompaniesComponent.prototype.onSubmit = function () {
        var _this = this;
        var data = this.companyForm.value;
        this.saving = true;
        this.apiService.create('admin/companies', data).subscribe(function (response) {
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
    return AdminCreateCompaniesComponent;
}());
AdminCreateCompaniesComponent = __decorate([
    core_1.Component({
        selector: 'admin-create-companies',
        templateUrl: './admin-create-companies.component.html',
        styleUrls: ['./admin-create-companies.component.scss']
    })
], AdminCreateCompaniesComponent);
exports.AdminCreateCompaniesComponent = AdminCreateCompaniesComponent;
