"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WorkerDetailsComponent = (function () {
    function WorkerDetailsComponent(apiService, router, route, toastr) {
        this.apiService = apiService;
        this.router = router;
        this.route = route;
        this.toastr = toastr;
        this.defaultImage = 'assets/img/missing.png';
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
                title: 'Información',
                link: '/client/rrhh/workers/info',
                active: true
            }
        ];
    }
    WorkerDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.workerId = params['id'];
            _this.breadcrumbs[_this.breadcrumbs.length - 1].link = '/client/rrhh/workers/' + params['id'] + '/info';
            _this.apiService.one('client/workers', params['id']).subscribe(function (worker) {
                _this.worker = worker.data;
            });
        });
    };
    WorkerDetailsComponent.prototype.edit = function () {
        this.router.navigate(['/client/rrhh/workers/' + this.workerId]);
    };
    WorkerDetailsComponent.prototype.remove = function () {
        var _this = this;
        this.apiService.destroy('client/workers', this.workerId).subscribe(function (response) {
            _this.toastr.success('Trabajador Eliminado con Exito');
            _this.router.navigate(['/client/rrhh/workers/']);
        }, function (error) {
            _this.toastr.error(error);
        });
    };
    return WorkerDetailsComponent;
}());
WorkerDetailsComponent = __decorate([
    core_1.Component({
        selector: 'app-worker-details',
        templateUrl: 'worker-details.component.html',
        styleUrls: ['worker-details.component.scss']
    })
], WorkerDetailsComponent);
exports.WorkerDetailsComponent = WorkerDetailsComponent;
