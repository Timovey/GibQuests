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
exports.StageDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var StageActionDto_1 = require("./StageActionDto");
var StageTestDto_1 = require("./StageTestDto");
var StageDto = /** @class */ (function () {
    function StageDto() {
    }
    __decorate([
        (0, class_validator_1.IsDefined)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", Number)
    ], StageDto.prototype, "number", void 0);
    __decorate([
        (0, class_validator_1.IsDefined)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], StageDto.prototype, "type", void 0);
    __decorate([
        (0, class_validator_1.IsDefined)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], StageDto.prototype, "name", void 0);
    __decorate([
        (0, class_transformer_1.Type)(function () { return StageActionDto_1.StageActionDto; }, {
            discriminator: {
                property: '__type',
                subTypes: [
                    { value: StageActionDto_1.StageActionMapDto, name: 'map' },
                    { value: StageActionDto_1.StageActionMediaDto, name: 'media' },
                    { value: StageActionDto_1.StageActionQrDto, name: 'qr' },
                    { value: StageActionDto_1.StageActionTextDto, name: 'text' },
                ],
            },
        }),
        __metadata("design:type", Object)
    ], StageDto.prototype, "action", void 0);
    __decorate([
        (0, class_transformer_1.Type)(function () { return StageTestDto_1.StageTestDto; }),
        __metadata("design:type", StageTestDto_1.StageTestDto)
    ], StageDto.prototype, "test", void 0);
    return StageDto;
}());
exports.StageDto = StageDto;
//# sourceMappingURL=StageDto.js.map