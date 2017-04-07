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
var ManageWorkplacesComponent = (function () {
    function ManageWorkplacesComponent(formBuilder, apiService, toastr, router, route) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.toastr = toastr;
        this.router = router;
        this.route = route;
        this.saving = false;
        this.loading = false;
        this.title = 'Nuevo Lugar de Trabajo';
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
                title: 'Lugares de Trabajo',
                link: '/client/configuration/workplaces',
                active: false
            },
            {
                title: 'Crear',
                link: '/client/configuration/workplaces/create',
                active: true
            }
        ];
        this.workplaceForm = this.formBuilder.group({
            name: ['', [forms_1.Validators.required]],
        });
        this.workplaceForm.controls['name'].valueChanges.subscribe(function (value) {
            if (value) {
                _this.initOverlays(value);
            }
        });
    }
    ManageWorkplacesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectedPosition = new google.maps.LatLng(-33.48643545099988, -70.68603515625);
        this.mapOptions = {
            center: this.selectedPosition,
            zoom: 8
        };
        this.initOverlays('Lugar de trabajo');
        this.infoWindow = new google.maps.InfoWindow();
        this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.title = 'Editar Lugar de Trabajo';
                _this.breadcrumbs[_this.breadcrumbs.length - 1].title = 'Editar';
                _this.breadcrumbs[_this.breadcrumbs.length - 1].link = '/client/configuration/workplaces/' + params['id'];
                _this.workplaceId = params['id'];
                _this.loading = true;
                _this.apiService.one('client/assets/config/workplaces', params['id'], '').subscribe(function (workplace) {
                    _this.loading = false;
                    _this.initForm(workplace.data);
                    _this.selectedPosition = new google.maps.LatLng(workplace.data.latitude, workplace.data.longitude);
                    _this.mapOptions = {
                        center: _this.selectedPosition,
                        zoom: 8
                    };
                    _this.initOverlays(workplace.data.name);
                }, function (error) {
                    _this.loading = false;
                });
            }
        });
    };
    ManageWorkplacesComponent.prototype.initForm = function (workplace) {
        this.workplaceForm.reset(workplace);
    };
    ManageWorkplacesComponent.prototype.initOverlays = function (name) {
        this.mapOverlays = [
            new google.maps.Marker({ position: this.selectedPosition, title: name }),
        ];
    };
    ManageWorkplacesComponent.prototype.handleMapOverlayClick = function (event) {
        var isMarker = event.overlay.getTitle != undefined;
        if (isMarker) {
            var title = event.overlay.getTitle();
            this.infoWindow.setContent('' + title + '');
            this.infoWindow.open(event.map, event.overlay);
            event.map.setCenter(event.overlay.getPosition());
        }
    };
    ManageWorkplacesComponent.prototype.handleMapClick = function (event) {
        this.selectedPosition = event.latLng;
        this.addMarker(event.latLng);
    };
    ManageWorkplacesComponent.prototype.addMarker = function (selectedPosition) {
        this.mapOverlays = [];
        this.mapOverlays.push(new google.maps.Marker({
            position: {
                lat: selectedPosition.lat(),
                lng: selectedPosition.lng()
            }, title: this.workplaceForm.controls['name'].value, draggable: false
        }));
    };
    ManageWorkplacesComponent.prototype.onSubmit = function () {
        var _this = this;
        var data = this.workplaceForm.value;
        data.latitude = this.selectedPosition.lat();
        data.longitude = this.selectedPosition.lng();
        this.saving = true;
        if (this.workplaceId) {
            this.apiService.update('client/assets/config/workplaces', this.workplaceId, data).subscribe(function (response) {
                _this.saving = false;
                _this.toastr.success('Lugar de trabajo actualizadoq con exito');
                _this.router.navigate(['/client/configuration/workplaces']);
            }, function (error) {
                _this.toastr.error(error);
                _this.saving = false;
            });
        }
        else {
            this.apiService.create('client/assets/config/workplaces', data).subscribe(function (response) {
                _this.saving = false;
                _this.toastr.success('Lugar de trabajo creado con exito');
                _this.router.navigate(['/client/configuration/workplaces']);
            }, function (error) {
                _this.toastr.error(error);
                _this.saving = false;
            });
        }
    };
    ManageWorkplacesComponent.prototype.cancel = function () {
        this.router.navigate(['/client/configuration/workplaces']);
    };
    return ManageWorkplacesComponent;
}());
ManageWorkplacesComponent = __decorate([
    core_1.Component({
        selector: 'app-manage-workplaces',
        templateUrl: './manage-workplaces.component.html',
        styleUrls: ['./manage-workplaces.component.scss']
    })
], ManageWorkplacesComponent);
exports.ManageWorkplacesComponent = ManageWorkplacesComponent;
