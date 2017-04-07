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
var ManageSubcategoriesComponent = (function () {
    function ManageSubcategoriesComponent(formBuilder, apiService, toastr, router, route) {
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.toastr = toastr;
        this.router = router;
        this.route = route;
        this.saving = false;
        this.loading = false;
        this.title = 'Nueva Subcategoría';
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
                title: 'Modelos',
                link: '/client/configuration/categories/subcategories',
                active: false
            },
            {
                title: 'Crear',
                link: '/client/configuration/categories/subcategories/create',
                active: true
            }
        ];
        this.subcategoryForm = this.formBuilder.group({
            name: ['', [forms_1.Validators.required]],
            category: ['', [forms_1.Validators.required]],
        });
    }
    ManageSubcategoriesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.all('client/assets/config/categories').subscribe(function (categories) { return _this.categories = categories.data.map(function (category) {
            return { label: category.name, value: category.id };
        }); });
        this.route.params.subscribe(function (params) {
            if (params['subcategoryId']) {
                _this.title = 'Editar Subcategoría';
                _this.breadcrumbs[_this.breadcrumbs.length - 1].title = 'Editar';
                _this.breadcrumbs[_this.breadcrumbs.length - 1].link = '/client/configuration/categories/' + params['id'] + '/subcategories/' + params['id'];
                _this.subcategoryId = params['subcategoryId'];
                _this.categoryId = params['id'];
                _this.loading = true;
                _this.apiService.one('client/assets/config/categories/' + params['id'] + '/subcategories', params['subcategoryId'], 'category').subscribe(function (subcategory) {
                    _this.loading = false;
                    subcategory.data.category = subcategory.data.category.id;
                    _this.initForm(subcategory.data);
                }, function (error) {
                    _this.loading = false;
                });
            }
        });
    };
    ManageSubcategoriesComponent.prototype.initForm = function (subcategory) {
        this.subcategoryForm.reset(subcategory);
    };
    ManageSubcategoriesComponent.prototype.onSubmit = function () {
        var _this = this;
        var data = this.subcategoryForm.value;
        this.saving = true;
        if (this.subcategoryId) {
            this.apiService.update('client/assets/config/categories/' + data.category + '/subcategories', this.subcategoryId, data).subscribe(function (response) {
                _this.saving = false;
                _this.toastr.success('Subcategoría actualizada con exito');
                _this.router.navigate(['/client/configuration/categories/subcategories']);
            }, function (error) {
                _this.toastr.error(error);
                _this.saving = false;
            });
        }
        else {
            this.apiService.create('client/assets/config/categories/' + data.category + '/subcategories', data).subscribe(function (response) {
                _this.saving = false;
                _this.toastr.success('Subcategoría creada con exito');
                _this.router.navigate(['/client/configuration/categories/subcategories']);
            }, function (error) {
                _this.toastr.error(error);
                _this.saving = false;
            });
        }
    };
    ManageSubcategoriesComponent.prototype.cancel = function () {
        this.router.navigate(['/client/configuration/categories/subcategories']);
    };
    return ManageSubcategoriesComponent;
}());
ManageSubcategoriesComponent = __decorate([
    core_1.Component({
        selector: 'app-manage-subcategories',
        templateUrl: './manage-subcategories.component.html',
        styleUrls: ['./manage-subcategories.component.scss']
    })
], ManageSubcategoriesComponent);
exports.ManageSubcategoriesComponent = ManageSubcategoriesComponent;
