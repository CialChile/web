"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var validation_service_1 = require("../../../../../components/forms/validation/validation.service");
var ManageWorkerComponent = (function () {
    function ManageWorkerComponent(formBuilder, apiService, toastr, router, route) {
        var _this = this;
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
            first_name: ['', [forms_1.Validators.required]],
            last_name: ['', [forms_1.Validators.required]],
            email: ['', [forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.emailValidator])]],
            position: ['', [forms_1.Validators.required]],
            rut_passport: ['', [forms_1.Validators.required]],
            birthday: ['', [forms_1.Validators.required]],
            telephone: [''],
            active: [true],
            country: ['', [forms_1.Validators.required]],
            state: ['', [forms_1.Validators.required]],
            city: ['', [forms_1.Validators.required]],
            zip_code: ['', [forms_1.Validators.required]],
            address: ['', [forms_1.Validators.required]],
            emergency_telephone: ['', [forms_1.Validators.required]],
            emergency_contact: ['', [forms_1.Validators.required]],
            medical_information: [''],
        });
        this.workerForm.controls['country'].valueChanges.subscribe(function (value) {
            if (value) {
                _this.apiService.all('state/' + value).subscribe(function (states) { return _this.states = states.data; });
            }
        });
    }
    ManageWorkerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.all('country').subscribe(function (countries) { return _this.countries = countries.data; });
        this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.title = 'Editar Trabajador';
                _this.breadcrumbs[_this.breadcrumbs.length - 1].title = 'Editar';
                _this.breadcrumbs[_this.breadcrumbs.length - 1].link = '/client/rrhh/workers/' + params['id'];
                _this.workerId = params['id'];
                _this.apiService.one('client/worker', params['id']).subscribe(function (worker) {
                    _this.initForm(worker.data);
                });
            }
        });
    };
    ManageWorkerComponent.prototype.initForm = function (user) {
        this.workerForm.reset(user);
    };
    ManageWorkerComponent.prototype.onSubmit = function () {
        var _this = this;
        var data = this.workerForm.value;
        this.saving = true;
        if (this.workerId) {
            this.apiService.update('client/worker', this.workerId, data).subscribe(function (response) {
                _this.saving = false;
                _this.toastr.success('Trabajador actualizado con exito');
                _this.router.navigate(['/client/rrhh/workers']);
            }, function (error) {
                _this.toastr.error(error);
                _this.saving = false;
            });
        }
        else {
            this.apiService.create('client/worker', data).subscribe(function (response) {
                _this.saving = false;
                _this.toastr.success('Trabajador creado con exito');
                _this.router.navigate(['/client/rrhh/workers']);
            }, function (error) {
                _this.toastr.error(error);
                _this.saving = false;
            });
        }
    };
    ManageWorkerComponent.prototype.cancel = function () {
        this.router.navigate(['/client/rrhh/workers']);
    };
    ManageWorkerComponent = __decorate([
        core_1.Component({
            selector: 'app-manage-worker',
            templateUrl: 'manage-worker.component.html',
            styleUrls: ['manage-worker.component.scss']
        })
    ], ManageWorkerComponent);
    return ManageWorkerComponent;
}());
exports.ManageWorkerComponent = ManageWorkerComponent;
