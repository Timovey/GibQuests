"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessQustDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var ProcessQustDto = /** @class */ (function () {
    function ProcessQustDto() {
    }
    __decorate([
        (0, class_validator_1.IsDefined)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Number)
    ], ProcessQustDto.prototype, "userId", void 0);
    __decorate([
        (0, class_validator_1.IsDefined)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Number)
    ], ProcessQustDto.prototype, "questId", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Number)
    ], ProcessQustDto.prototype, "progress", void 0);
    return ProcessQustDto;
}());
exports.ProcessQustDto = ProcessQustDto;
//# sourceMappingURL=ProcessQustDto.js.map