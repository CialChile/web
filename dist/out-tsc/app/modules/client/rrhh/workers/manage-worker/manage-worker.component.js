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
import { ValidationService } from "../../../../../components/forms/validation/validation.service";
export let ManageWorkerComponent = class ManageWorkerComponent {
    constructor(formBuilder, apiService, toastr, router, route) {
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.toastr = toastr;
        this.router = router;
        this.route = route;
        this.saving = false;
        this.title = 'Nuevo Trabajador';
        this.breadcrumbs = [
            {
                title: 'Home',
                link: '/client/dashboard',
                active: false
            },
            {
                title: 'RRHH',
                link: '/client/dashboard',
                active: false
            },
            {
                title: 'Trabajadores',
                link: '/client/rrhh/workers',
                active: false
            },
            {
                title: 'Crear',
                link: '/client/rrhh/workers/create',
                active: true
            }
        ];
        this.workerForm = this.formBuilder.group({
            first_name: ['', [Validators.required]],
            last_name: ['', [Validators.required]],
            email: ['', [Validators.compose([Validators.required, ValidationService.emailValidator])]],
            position: ['', [Validators.required]],
            rut_passport: ['', [Validators.required]],
            birthday: ['', [Validators.required]],
            telephone: [''],
            active: [true],
            country: ['', [Validators.required]],
            state: ['', [Validators.required]],
            city: ['', [Validators.required]],
            zip_code: ['', [Validators.required]],
            address: ['', [Validators.required]],
            emergency_telephone: ['', [Validators.required]],
            emergency_contact: ['', [Validators.required]],
            medical_information: [''],
        });
        this.workerForm.controls['country'].valueChanges.subscribe((value) => {
            if (value) {
                this.apiService.all('state/' + value).subscribe(states => this.states = states.data);
            }
        });
    }
    ngOnInit() {
        this.apiService.all('country').subscribe(countries => this.countries = countries.data);
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.title = 'Editar Trabajador';
                this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar';
                this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/rrhh/workers/' + params['id'];
                this.workerId = params['id'];
                this.apiService.one('client/worker', params['id']).subscribe((worker) => {
                    this.initForm(worker.data);
                });
            }
        });
    }
    initForm(user) {
        this.workerForm.reset(user);
    }
    onSubmit() {
        let data = this.workerForm.value;
        this.saving = true;
        if (this.workerId) {
            this.apiService.update('client/worker', this.workerId, data).subscribe((response) => {
                this.saving = false;
                this.toastr.success('Trabajador actualizado con exito');
                this.router.navigate(['/client/rrhh/workers']);
            }, (error) => {
                this.toastr.error(error);
                this.saving = false;
            });
        }
        else {
            this.apiService.create('client/worker', data).subscribe((response) => {
                this.saving = false;
                this.toastr.success('Trabajador creado con exito');
                this.router.navigate(['/client/rrhh/workers']);
            }, (error) => {
                this.toastr.error(error);
                this.saving = false;
            });
        }
    }
    cancel() {
        this.router.navigate(['/client/rrhh/workers']);
    }
};
ManageWorkerComponent = __decorate([
    Component({
        selector: 'app-manage-worker',
        templateUrl: 'manage-worker.component.html',
        styleUrls: ['manage-worker.component.scss']
    }), 
    __metadata('design:paramtypes', [FormBuilder, ApiService, ToastsManager, Router, ActivatedRoute])
], ManageWorkerComponent);
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/rrhh/workers/manage-worker/manage-worker.component.js.map