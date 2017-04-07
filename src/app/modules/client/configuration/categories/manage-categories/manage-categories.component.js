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
var ManageCategoriesComponent = (function () {
    function ManageCategoriesComponent(formBuilder, apiService, toastr, router, route) {
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.toastr = toastr;
        this.router = router;
        this.route = route;
        this.saving = false;
        this.loading = false;
        this.title = 'Nueva Categoría';
        this.customFields = [];
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
                title: 'Categorías',
                link: '/client/configuration/categories',
                active: false
            },
            {
                title: 'Crear',
                link: '/client/configuration/categories/create',
                active: true
            }
        ];
        this.categoryForm = this.formBuilder.group({
            name: ['', [forms_1.Validators.required]],
            custom_fields_config: this.formBuilder.array([])
        });
    }
    Object.defineProperty(ManageCategoriesComponent.prototype, "custom_fields_config", {
        get: function () {
            return this.categoryForm.get('custom_fields_config');
        },
        enumerable: true,
        configurable: true
    });
    ;
    ManageCategoriesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.title = 'Editar Categoria';
                _this.breadcrumbs[_this.breadcrumbs.length - 1].title = 'Editar';
                _this.breadcrumbs[_this.breadcrumbs.length - 1].link = '/client/configuration/categories/' + params['id'];
                _this.categoryId = params['id'];
                _this.loading = true;
                _this.apiService.one('client/assets/config/categories', params['id'], '').subscribe(function (category) {
                    _this.loading = false;
                    _this.initForm(category.data);
                }, function (error) {
                    _this.loading = false;
                });
            }
        });
    };
    ManageCategoriesComponent.prototype.initForm = function (category) {
        var _this = this;
        this.customFields = category.custom_fields_config.map(function (customField) {
            return _this.formBuilder.group({
                label: [customField.label, forms_1.Validators.required],
                required: [customField.required]
            });
        });
        if (this.customFields.length) {
            this.categoryForm.setControl('custom_fields_config', this.formBuilder.array(this.customFields));
        }
        this.categoryForm.reset(category);
    };
    ManageCategoriesComponent.prototype.addCustomField = function () {
        var customField = this.formBuilder.group({
            label: ['', forms_1.Validators.required],
            required: [true]
        });
        this.customFields.push(customField);
        this.categoryForm.setControl('custom_fields_config', this.formBuilder.array(this.customFields));
    };
    ManageCategoriesComponent.prototype.removeCustomField = function (index) {
        this.customFields.splice(index, 1);
        this.categoryForm.setControl('custom_fields_config', this.formBuilder.array(this.customFields));
    };
    ManageCategoriesComponent.prototype.onSubmit = function () {
        var _this = this;
        var data = this.categoryForm.value;
        this.saving = true;
        if (this.categoryId) {
            this.apiService.update('client/assets/config/categories', this.categoryId, data).subscribe(function (response) {
                _this.saving = false;
                _this.toastr.success('Categoría actualizada con exito');
                _this.router.navigate(['/client/configuration/categories']);
            }, function (error) {
                _this.toastr.error(error);
                _this.saving = false;
            });
        }
        else {
            this.apiService.create('client/assets/config/categories', data).subscribe(function (response) {
                _this.saving = false;
                _this.toastr.success('Categoría creada con exito');
                _this.router.navigate(['/client/configuration/categories']);
            }, function (error) {
                _this.toastr.error(error);
                _this.saving = false;
            });
        }
    };
    ManageCategoriesComponent.prototype.cancel = function () {
        this.router.navigate(['/client/configuration/categories']);
    };
    return ManageCategoriesComponent;
}());
ManageCategoriesComponent = __decorate([
    core_1.Component({
        selector: 'app-manage-categories',
        templateUrl: './manage-categories.component.html',
        styleUrls: ['./manage-categories.component.scss']
    })
], ManageCategoriesComponent);
exports.ManageCategoriesComponent = ManageCategoriesComponent;
