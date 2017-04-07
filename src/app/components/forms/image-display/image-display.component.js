"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ImageDisplayComponent = (function () {
    function ImageDisplayComponent() {
        this.canDelete = true;
        this.onDeleteFile = new core_1.EventEmitter();
    }
    ImageDisplayComponent.prototype.ngOnInit = function () {
    };
    ImageDisplayComponent.prototype.deleteFile = function () {
        this.onDeleteFile.emit(this.image.id);
    };
    return ImageDisplayComponent;
}());
__decorate([
    core_1.Input()
], ImageDisplayComponent.prototype, "image", void 0);
__decorate([
    core_1.Input()
], ImageDisplayComponent.prototype, "canDelete", void 0);
__decorate([
    core_1.Output()
], ImageDisplayComponent.prototype, "onDeleteFile", void 0);
ImageDisplayComponent = __decorate([
    core_1.Component({
        selector: 'app-image-display',
        templateUrl: './image-display.component.html',
        styleUrls: ['./image-display.component.scss']
    })
], ImageDisplayComponent);
exports.ImageDisplayComponent = ImageDisplayComponent;
