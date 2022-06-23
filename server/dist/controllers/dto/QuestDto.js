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
exports.QuestDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var AuthorDto_1 = require("./AuthorDto");
var StageDto_1 = require("./StageDto");
var QuestDto = /** @class */ (function () {
    function QuestDto() {
    }
    __decorate([
        (0, class_validator_1.IsDefined)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], QuestDto.prototype, "title", void 0);
    __decorate([
        (0, class_validator_1.IsDefined)(),
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], QuestDto.prototype, "description", void 0);
    __decorate([
        (0, class_transformer_1.Type)(function () { return AuthorDto_1.AuthorDto; }),
        __metadata("design:type", AuthorDto_1.AuthorDto)
    ], QuestDto.prototype, "author", void 0);
    __decorate([
        (0, class_transformer_1.Type)(function () { return StageDto_1.StageDto; }),
        __metadata("design:type", Array)
    ], QuestDto.prototype, "stages", void 0);
    return QuestDto;
}());
exports.QuestDto = QuestDto;
//# sourceMappingURL=QuestDto.js.map