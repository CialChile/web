"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AssetDetailsComponent = (function () {
    function AssetDetailsComponent(apiService, router, route, toastr) {
        this.apiService = apiService;
        this.router = router;
        this.route = route;
        this.toastr = toastr;
        this.defaultImage = 'assets/img/missing/assets/missing.jpg';
        this.defaultWorkerImage = 'assets/img/missing/worker/missing.png';
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
                title: 'Activos',
                link: '/client/assets',
                active: false
            },
            {
                title: 'Información',
                link: '/client/assets/info',
                active: true
            }
        ];
    }
    AssetDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.infoWindow = new google.maps.InfoWindow();
        this.route.params.subscribe(function (params) {
            _this.assetId = params['id'];
            _this.breadcrumbs[_this.breadcrumbs.length - 1].link = '/client/assets/' + params['id'] + '/info';
            _this.apiService.one('client/assets', params['id'], 'category,brand,brandModel,subcategory,workplace,worker,status,images,coverImage,documents').subscribe(function (asset) {
                if (!asset.data.coverImage) {
                    asset.data.coverImage = {
                        source: 'assets/img/missing/assets/missing.jpg',
                        thumbnail: 'assets/img/missing/assets/missing.jpg',
                        title: asset.data.name
                    };
                }
                _this.asset = asset.data;
                _this.selectedPosition = new google.maps.LatLng(asset.data.latitude, asset.data.longitude);
                _this.mapOptions = {
                    center: _this.selectedPosition,
                    zoom: 8
                };
                _this.initOverlays(asset.data.name);
            });
        });
    };
    AssetDetailsComponent.prototype.edit = function () {
        this.router.navigate(['/client/assets/' + this.assetId]);
    };
    AssetDetailsComponent.prototype.showDocument = function (document) {
        var reader = new FileReader();
        this.apiService.downloadDocument(this.assetId, document.id, document.mime_type)
            .subscribe(function (data) {
            var blob = data.blob();
            reader.readAsDataURL(blob);
        });
        reader.onloadend = function (e) {
            window.open(reader.result);
        };
    };
    AssetDetailsComponent.prototype.initOverlays = function (name) {
        this.mapOverlays = [
            new google.maps.Marker({ position: this.selectedPosition, title: name }),
        ];
    };
    AssetDetailsComponent.prototype.handleMapOverlayClick = function (event) {
        var isMarker = event.overlay.getTitle != undefined;
        if (isMarker) {
            var title = event.overlay.getTitle();
            this.infoWindow.setContent('' + title + '');
            this.infoWindow.open(event.map, event.overlay);
            event.map.setCenter(event.overlay.getPosition());
        }
    };
    AssetDetailsComponent.prototype.remove = function () {
        var _this = this;
        this.apiService.destroy('client/assets', this.assetId).subscribe(function (response) {
            _this.toastr.success('Activo Eliminado con Exito');
            _this.router.navigate(['/client/assets/']);
        }, function (error) {
            _this.toastr.error(error);
        });
    };
    return AssetDetailsComponent;
}());
AssetDetailsComponent = __decorate([
    core_1.Component({
        selector: 'app-asset-details',
        templateUrl: './asset-details.component.html',
        styleUrls: ['./asset-details.component.scss']
    })
], AssetDetailsComponent);
exports.AssetDetailsComponent = AssetDetailsComponent;
