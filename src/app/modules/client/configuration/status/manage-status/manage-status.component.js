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
var ManageStatusComponent = (function () {
    function ManageStatusComponent(formBuilder, apiService, toastr, router, route) {
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.toastr = toastr;
        this.router = router;
        this.route = route;
        this.saving = false;
        this.loading = false;
        this.title = 'Nuevo Status';
        this.STATUS_TYPES = [
            { value: 0, label: 'Activo' },
            { value: 1, label: 'Documento' }
        ];
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
                title: 'Status',
                link: '/client/configuration/status',
                active: false
            },
            {
                title: 'Crear',
                link: '/client/configuration/status/create',
                active: true
            }
        ];
        this.statusForm = this.formBuilder.group({
            name: ['', [forms_1.Validators.required]],
            type: ['', [forms_1.Validators.required]],
        });
    }
    ManageStatusComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.title = 'Editar Status';
                _this.breadcrumbs[_this.breadcrumbs.length - 1].title = 'Editar';
                _this.breadcrumbs[_this.breadcrumbs.length - 1].link = '/client/configuration/status/' + params['id'];
                _this.statusId = params['id'];
                _this.loading = true;
                _this.apiService.one('client/config/status', params['id'], '').subscribe(function (status) {
                    _this.loading = false;
                    _this.initForm(status.data);
                }, function (error) {
                    _this.loading = false;
                });
            }
        });
    };
    ManageStatusComponent.prototype.initForm = function (status) {
        this.statusForm.reset(status);
    };
    ManageStatusComponent.prototype.onSubmit = function () {
        var _this = this;
        var data = this.statusForm.value;
        this.saving = true;
        if (this.statusId) {
            this.apiService.update('client/config/status', this.statusId, data).subscribe(function (response) {
                _this.saving = false;
                _this.toastr.success('Status actualizado con exito');
                _this.router.navigate(['/client/configuration/status']);
            }, function (error) {
                _this.toastr.error(error);
                _this.saving = false;
            });
        }
        else {
            this.apiService.create('client/config/status', data).subscribe(function (response) {
                _this.saving = false;
                _this.toastr.success('Status creado con exito');
                _this.router.navigate(['/client/configuration/status']);
            }, function (error) {
                _this.toastr.error(error);
                _this.saving = false;
            });
        }
    };
    ManageStatusComponent.prototype.cancel = function () {
        this.router.navigate(['/client/configuration/status']);
    };
    return ManageStatusComponent;
}());
ManageStatusComponent = __decorate([
    core_1.Component({
        selector: 'app-manage-status',
        templateUrl: './manage-status.component.html',
        styleUrls: ['./manage-status.component.scss']
    })
], ManageStatusComponent);
exports.ManageStatusComponent = ManageStatusComponent;
