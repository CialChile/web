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
    AdminEditCompaniesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.all('countries').subscribe(function (countries) { return _this.countries = countries.data; });
        this.apiService.all('company-fields/list').subscribe(function (fields) { return _this.fields = fields.data; });
        this.route.params.subscribe(function (params) {
            _this.apiService.one('admin/companies', params['id'], 'responsible').subscribe(function (company) {
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
        var data = this.companyForm.value;
        this.promptModal.hide();
        this.apiService.update('admin/companies', this.company.id, data).subscribe(function (response) {
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
    return AdminEditCompaniesComponent;
}());
__decorate([
    core_1.ViewChild('prompt')
], AdminEditCompaniesComponent.prototype, "promptModal", void 0);
AdminEditCompaniesComponent = __decorate([
    core_1.Component({
        selector: 'admin-edit-companies',
        templateUrl: './admin-edit-companies.component.html',
        styleUrls: ['./admin-edit-companies.component.scss']
    })
], AdminEditCompaniesComponent);
exports.AdminEditCompaniesComponent = AdminEditCompaniesComponent;
