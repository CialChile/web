"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ng2_toastr_1 = require("ng2-toastr");
var ToastrDefaultOptions = (function (_super) {
    __extends(ToastrDefaultOptions, _super);
    function ToastrDefaultOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.animate = 'flyRight'; // you can override any options available
        _this.showCloseButton = true;
        return _this;
    }
    return ToastrDefaultOptions;
}(ng2_toastr_1.ToastOptions));
exports.ToastrDefaultOptions = ToastrDefaultOptions;
