var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { Input } from "@angular/core/src/metadata/directives";
export let EtrackUserCanDirective = class EtrackUserCanDirective {
    constructor(_templateRef, _viewContainer) {
        this._templateRef = _templateRef;
        this._viewContainer = _viewContainer;
        this.initialized = false;
        this.strategies = [
            'remove',
            'disable'
        ];
        this.defaultDeniedStrategy = 'remove';
    }
    set userCan(value) {
        this.permission = value;
    }
    set userCanDeniedStrategy(value) {
        this.deniedStrategy = value;
    }
    ;
    ngAfterContentInit() {
        this.performPermissionAction(this.permission == 'any' || this.permission == '' ? true : this.checkPermission());
    }
    checkPermission() {
        this.deniedStrategy = this.deniedStrategy ? this.deniedStrategy : this.defaultDeniedStrategy;
        let permissions = JSON.parse(localStorage.getItem('permissions'));
        if (!permissions) {
            permissions = [];
        }
        let permissionExist = permissions.filter((permission) => {
            return permission == this.permission;
        });
        return permissionExist.length > 0;
    }
    performPermissionAction(userHavePermission) {
        if (!userHavePermission) {
            switch (this.deniedStrategy) {
                case 'remove':
                    this._viewContainer.clear();
                    break;
                case 'disable':
                    let element = this._viewContainer.createEmbeddedView(this._templateRef);
                    element.rootNodes[0].classList.add('link-disabled');
                    element.rootNodes[0].setAttribute('disabled', true);
                    break;
                default:
                    this._viewContainer.clear();
            }
        }
        else {
            let element = this._viewContainer.createEmbeddedView(this._templateRef);
            element.rootNodes[0].classList.remove('link-disabled');
            element.rootNodes[0].removeAttribute('disabled');
        }
    }
};
__decorate([
    Input('userCan'), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], EtrackUserCanDirective.prototype, "userCan", null);
__decorate([
    Input(), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], EtrackUserCanDirective.prototype, "userCanDeniedStrategy", null);
EtrackUserCanDirective = __decorate([
    Directive({
        selector: '[userCan]'
    }), 
    __metadata('design:paramtypes', [TemplateRef, ViewContainerRef])
], EtrackUserCanDirective);
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/directives/user-can/etrack-user-can.directive.js.map