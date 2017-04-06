var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { ToastsManager } from "ng2-toastr/ng2-toastr";
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
    return ToastrService;
}());
ToastrService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ToastsManager])
], ToastrService);
export { ToastrService };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/services/toastr/toastr.service.js.map