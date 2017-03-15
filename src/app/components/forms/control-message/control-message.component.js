"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var validation_service_1 = require('../validation/validation.service');
var ControlMessageComponent = (function () {
    function ControlMessageComponent() {
    }
    Object.defineProperty(ControlMessageComponent.prototype, "errorMessage", {
        get: function () {
            for (var propertyName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                    return validation_service_1.ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input()
    ], ControlMessageComponent.prototype, "control", void 0);
    ControlMessageComponent = __decorate([
        core_1.Component({
            selector: 'control-messages',
            template: "<div class=\"help-block\" *ngIf=\"errorMessage !== null\">{{errorMessage}}</div>"
        })
    ], ControlMessageComponent);
    return ControlMessageComponent;
}());
exports.ControlMessageComponent = ControlMessageComponent;
