"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var control_message_component_1 = require("./control-message/control-message.component");
var common_1 = require("@angular/common");
var etrack_image_upload_component_1 = require("./image-upload/etrack-image-upload.component");
var image_display_component_1 = require("./image-display/image-display.component");
var document_display_component_1 = require("./document-display/document-display.component");
var FormsHelperModule = (function () {
    function FormsHelperModule() {
    }
    return FormsHelperModule;
}());
FormsHelperModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [control_message_component_1.ControlMessageComponent, etrack_image_upload_component_1.EtrackImageUploadComponent, image_display_component_1.ImageDisplayComponent, document_display_component_1.DocumentDisplayComponent],
        exports: [control_message_component_1.ControlMessageComponent, etrack_image_upload_component_1.EtrackImageUploadComponent, image_display_component_1.ImageDisplayComponent]
    })
], FormsHelperModule);
exports.FormsHelperModule = FormsHelperModule;
