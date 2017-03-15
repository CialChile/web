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
export let AdminEditCompaniesComponent = class AdminEditCompaniesComponent {
    constructor(formBuilder, apiService, toastr, router, route) {
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
            responsible: this.formBuilder.group({
                first_name: ['', [Validators.required]],
                last_name: ['', [Validators.required]],
                email: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
                rut_passport: ['', [Validators.required]],
                position: ['', [Validators.required]]
            })
        });
        this.companyForm.controls['country'].valueChanges.subscribe((value) => {
            if (value) {
                this.apiService.all('state/' + value).subscribe(states => this.states = states.data);
            }
        });
    }
    ngOnInit() {
        this.apiService.all('country').subscribe(countries => this.countries = countries.data);
        this.apiService.all('company-field/list').subscribe(fields => this.fields = fields.data);
        this.route.params.subscribe((params) => {
            this.apiService.one('admin/company', params['id'], 'responsible').subscribe((company) => {
                this.loading = false;
                this.initForm(company.data);
            });
        });
    }
    initForm(company) {
        this.company = company;
        this.companyForm.reset(company);
    }
    onSubmit(form, $event) {
        $event.preventDefault();
        this.saving = true;
        let data = this.companyForm.value;
        if (data.responsible.email != this.company.responsible.email) {
            this.promptModal.show();
        }
        else {
            this.save();
        }
    }
    save() {
        let data = this.companyForm.value;
        this.promptModal.hide();
        this.apiService.update('admin/company', this.company.id, data).subscribe((response) => {
            this.saving = false;
            this.toastr.success('Empresa actualizada con exito');
            this.router.navigate(['/admin/companies']);
        }, (error) => {
            this.toastr.error(error);
            this.saving = false;
        });
    }
    cancelPrompt() {
        this.saving = false;
        this.promptModal.hide();
    }
    goBack() {
        this.router.navigate(['/admin/companies']);
    }
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
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/admin/companies/admin-edit-companies/admin-edit-companies.component.js.map