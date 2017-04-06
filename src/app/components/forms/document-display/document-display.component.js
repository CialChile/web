"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DocumentDisplayComponent = (function () {
    function DocumentDisplayComponent() {
        this.canDelete = true;
        this.onDeleteFile = new core_1.EventEmitter();
    }
    DocumentDisplayComponent.prototype.ngOnInit = function () {
    };
    DocumentDisplayComponent.prototype.deleteFile = function () {
        this.onDeleteFile.emit(this.document.id);
    };
    return DocumentDisplayComponent;
}());
__decorate([
    core_1.Input()
], DocumentDisplayComponent.prototype, "document", void 0);
__decorate([
    core_1.Input()
], DocumentDisplayComponent.prototype, "canDelete", void 0);
__decorate([
    core_1.Output()
], DocumentDisplayComponent.prototype, "onDeleteFile", void 0);
DocumentDisplayComponent = __decorate([
    core_1.Component({
        selector: 'app-document-display',
        templateUrl: './document-display.component.html',
        styleUrls: ['./document-display.component.scss']
    })
], DocumentDisplayComponent);
exports.DocumentDisplayComponent = DocumentDisplayComponent;
