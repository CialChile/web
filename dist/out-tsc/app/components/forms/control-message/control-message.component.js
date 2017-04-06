var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../validation/validation.service';
var ControlMessageComponent = (function () {
    function ControlMessageComponent() {
    }
    Object.defineProperty(ControlMessageComponent.prototype, "errorMessage", {
        get: function () {
            for (var propertyName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                    return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    return ControlMessageComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", FormControl)
], ControlMessageComponent.prototype, "control", void 0);
ControlMessageComponent = __decorate([
    Component({
        selector: 'control-messages',
        template: "<div class=\"help-block\" *ngIf=\"errorMessage !== null\">{{errorMessage}}</div>"
    }),
    __metadata("design:paramtypes", [])
], ControlMessageComponent);
export { ControlMessageComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/components/forms/control-message/control-message.component.js.map