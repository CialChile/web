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
var maskParser_1 = require("../../../../../utilities/form/maskParser");
var AssetConfigComponent = (function () {
    function AssetConfigComponent(formBuilder, apiService, toastr, router, route) {
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.toastr = toastr;
        this.router = router;
        this.route = route;
        // standing data
        this.SKU_TYPES = [
            {
                label: 'Libre',
                value: 'libre'
            },
            {
                label: 'Mascara',
                value: 'mask'
            }
        ];
        this.saving = false;
        this.loading = false;
        this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.title = 'Configuración de activos';
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
                title: 'Activos',
                link: '/client/configuration/assets',
                active: true
            }
        ];
        this.configAssetsForm = this.formBuilder.group({
            sku_type: ['', [forms_1.Validators.required]],
            sku_mask: ['a-99999'],
            sku_mask_test: ['']
        });
    }
    AssetConfigComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscribeSkuTypeChange();
        this.loading = true;
        this.apiService.all('client/assets/config').subscribe(function (config) {
            _this.loading = false;
            if (config) {
                _this.initForm(config.data);
            }
        }, function (error) {
            _this.loading = false;
        });
    };
    AssetConfigComponent.prototype.initForm = function (config) {
        this.configAssetsForm.reset(config);
    };
    AssetConfigComponent.prototype.subscribeSkuTypeChange = function () {
        var _this = this;
        var skutypeChanges$ = this.configAssetsForm.controls.sku_type.valueChanges;
        var skumaskChanges$ = this.configAssetsForm.controls.sku_mask.valueChanges;
        skutypeChanges$.subscribe(function (skuType) {
            if (skuType === _this.SKU_TYPES[1].value) {
                _this.configAssetsForm.controls.sku_mask.setValidators(forms_1.Validators.required);
            }
            if (skuType === _this.SKU_TYPES[0].value) {
                _this.configAssetsForm.controls.sku_mask.setValidators(null);
                _this.configAssetsForm.controls.sku_mask.updateValueAndValidity();
            }
        });
        skumaskChanges$.subscribe(function (skuMask) {
            _this.mask = maskParser_1.parseMask(skuMask);
        });
    };
    AssetConfigComponent.prototype.onSubmit = function () {
        var _this = this;
        var data = this.configAssetsForm.value;
        this.saving = true;
        this.apiService.create('client/assets/config', data).subscribe(function (response) {
            _this.saving = false;
            _this.toastr.success('Configuración actualizada con exito');
        }, function (error) {
            _this.toastr.error(error);
            _this.saving = false;
        });
    };
    return AssetConfigComponent;
}());
AssetConfigComponent = __decorate([
    core_1.Component({
        selector: 'app-asset-config',
        templateUrl: './asset-config.component.html',
        styleUrls: ['./asset-config.component.scss']
    })
], AssetConfigComponent);
exports.AssetConfigComponent = AssetConfigComponent;
