"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ToastrService = (function () {
    function ToastrService(toastr) {
        this.toastr = toastr;
    }
    ToastrService.prototype.showSuccess = function (header, description) {
        this.toastr.success(description, header);
    };
    ToastrService.prototype.showError = function (header, description) {
        this.toastr.error(description, header);
    };
    ToastrService.prototype.showWarning = function (header, description) {
        this.toastr.warning(description, header);
    };
    ToastrService.prototype.showInfo = function (header, description) {
        this.toastr.info(description, header);
    };
    ToastrService = __decorate([
        core_1.Injectable()
    ], ToastrService);
    return ToastrService;
}());
exports.ToastrService = ToastrService;
