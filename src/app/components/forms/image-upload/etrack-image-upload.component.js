"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var EtrackImageUploadComponent = (function () {
    function EtrackImageUploadComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.buttonMessage = 'Elige una imagen';
        this.file = {
            objectURL: '',
            notDefault: false,
            deleted: false
        };
        this.fileUpdated = new core_1.EventEmitter();
        this.files = [];
    }
    EtrackImageUploadComponent.prototype.ngOnInit = function () {
    };
    EtrackImageUploadComponent.prototype.fileChange = function (files) {
        var file = files[0];
        if (this.isImage(file)) {
            file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file)));
            file.notDefault = true;
            this.file = file;
            this.fileUpdated.emit(this.file);
        }
        else {
        }
    };
    EtrackImageUploadComponent.prototype.isImage = function (file) {
        return /^image\//.test(file.type);
    };
    ;
    EtrackImageUploadComponent.prototype.deleteFile = function (file) {
        this.file = {
            objectURL: '',
            notDefault: false,
            deleted: true
        };
        this.fileUpdated.emit(this.file);
    };
    return EtrackImageUploadComponent;
}());
__decorate([
    core_1.Input()
], EtrackImageUploadComponent.prototype, "buttonMessage", void 0);
__decorate([
    core_1.Input()
], EtrackImageUploadComponent.prototype, "defaultImageUrl", void 0);
__decorate([
    core_1.Input()
], EtrackImageUploadComponent.prototype, "file", void 0);
__decorate([
    core_1.Output()
], EtrackImageUploadComponent.prototype, "fileUpdated", void 0);
EtrackImageUploadComponent = __decorate([
    core_1.Component({
        selector: 'etrack-image-upload',
        templateUrl: './etrack-image-upload.component.html',
        styleUrls: ['./etrack-image-upload.component.scss']
    })
], EtrackImageUploadComponent);
exports.EtrackImageUploadComponent = EtrackImageUploadComponent;
