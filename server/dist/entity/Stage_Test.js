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
exports.Stage_Test = void 0;
var typeorm_1 = require("typeorm");
var Stage_1 = require("./Stage");
var Question_1 = require("./Question");
var Stage_Test = /** @class */ (function () {
    function Stage_Test() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Stage_Test.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 50,
            nullable: false
        }),
        __metadata("design:type", String)
    ], Stage_Test.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Stage_1.Stage; }, function (stage) { return stage.stageTest; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Stage_1.Stage)
    ], Stage_Test.prototype, "stage", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Question_1.Question; }, function (question) { return question.stageTest; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Stage_Test.prototype, "questions", void 0);
    Stage_Test = __decorate([
        (0, typeorm_1.Entity)()
    ], Stage_Test);
    return Stage_Test;
}());
exports.Stage_Test = Stage_Test;
//# sourceMappingURL=Stage_Test.js.map