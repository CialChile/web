"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var EtrackUserCanDirective = (function () {
    function EtrackUserCanDirective(_templateRef, _viewContainer) {
        this._templateRef = _templateRef;
        this._viewContainer = _viewContainer;
        this.initialized = false;
        this.strategies = [
            'remove',
            'disable'
        ];
        this.defaultDeniedStrategy = 'remove';
    }
    Object.defineProperty(EtrackUserCanDirective.prototype, "userCan", {
        set: function (value) {
            this.permission = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtrackUserCanDirective.prototype, "userCanDeniedStrategy", {
        set: function (value) {
            this.deniedStrategy = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    EtrackUserCanDirective.prototype.ngAfterContentInit = function () {
        this.performPermissionAction(this.permission == 'any' || this.permission == '' ? true : this.checkPermission());
    };
    EtrackUserCanDirective.prototype.checkPermission = function () {
        var _this = this;
        this.deniedStrategy = this.deniedStrategy ? this.deniedStrategy : this.defaultDeniedStrategy;
        var permissions = JSON.parse(localStorage.getItem('permissions'));
        if (!permissions) {
            permissions = [];
        }
        var permissionExist = permissions.filter(function (permission) {
            return permission == _this.permission;
        });
        return permissionExist.length > 0;
    };
    EtrackUserCanDirective.prototype.performPermissionAction = function (userHavePermission) {
        if (!userHavePermission) {
            switch (this.deniedStrategy) {
                case 'remove':
                    this._viewContainer.clear();
                    break;
                case 'disable':
                    var element = this._viewContainer.createEmbeddedView(this._templateRef);
                    element.rootNodes[0].classList.add('link-disabled');
                    element.rootNodes[0].setAttribute('disabled', true);
                    break;
                default:
                    this._viewContainer.clear();
            }
        }
        else {
            var element = this._viewContainer.createEmbeddedView(this._templateRef);
            element.rootNodes[0].classList.remove('link-disabled');
            element.rootNodes[0].removeAttribute('disabled');
        }
    };
    return EtrackUserCanDirective;
}());
__decorate([
    core_1.Input('userCan')
], EtrackUserCanDirective.prototype, "userCan", null);
__decorate([
    core_1.Input()
], EtrackUserCanDirective.prototype, "userCanDeniedStrategy", null);
EtrackUserCanDirective = __decorate([
    core_1.Directive({
        selector: '[userCan]'
    })
], EtrackUserCanDirective);
exports.EtrackUserCanDirective = EtrackUserCanDirective;
