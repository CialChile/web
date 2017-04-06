var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
var ImageDisplayComponent = (function () {
    function ImageDisplayComponent() {
        this.canDelete = true;
        this.onDeleteFile = new EventEmitter();
    }
    ImageDisplayComponent.prototype.ngOnInit = function () {
    };
    ImageDisplayComponent.prototype.deleteFile = function () {
        this.onDeleteFile.emit(this.image.id);
    };
    return ImageDisplayComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImageDisplayComponent.prototype, "image", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ImageDisplayComponent.prototype, "canDelete", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ImageDisplayComponent.prototype, "onDeleteFile", void 0);
ImageDisplayComponent = __decorate([
    Component({
        selector: 'app-image-display',
        templateUrl: './image-display.component.html',
        styleUrls: ['./image-display.component.scss']
    }),
    __metadata("design:paramtypes", [])
], ImageDisplayComponent);
export { ImageDisplayComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/components/forms/image-display/image-display.component.js.map