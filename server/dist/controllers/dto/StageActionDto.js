"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageActionTextDto = exports.StageActionQrDto = exports.StageActionMediaDto = exports.StageActionMapDto = exports.StageActionDto = void 0;
var StageActionDto = /** @class */ (function () {
    function StageActionDto() {
    }
    return StageActionDto;
}());
exports.StageActionDto = StageActionDto;
var StageActionMapDto = /** @class */ (function (_super) {
    __extends(StageActionMapDto, _super);
    function StageActionMapDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StageActionMapDto;
}(StageActionDto));
exports.StageActionMapDto = StageActionMapDto;
var StageActionMediaDto = /** @class */ (function (_super) {
    __extends(StageActionMediaDto, _super);
    function StageActionMediaDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StageActionMediaDto;
}(StageActionDto));
exports.StageActionMediaDto = StageActionMediaDto;
var StageActionQrDto = /** @class */ (function (_super) {
    __extends(StageActionQrDto, _super);
    function StageActionQrDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StageActionQrDto;
}(StageActionDto));
exports.StageActionQrDto = StageActionQrDto;
var StageActionTextDto = /** @class */ (function (_super) {
    __extends(StageActionTextDto, _super);
    function StageActionTextDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StageActionTextDto;
}(StageActionDto));
exports.StageActionTextDto = StageActionTextDto;
//# sourceMappingURL=StageActionDto.js.map