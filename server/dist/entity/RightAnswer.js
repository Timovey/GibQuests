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
exports.RightAnswer = void 0;
var typeorm_1 = require("typeorm");
var Question_1 = require("./Question");
var RightAnswer = /** @class */ (function () {
    function RightAnswer() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], RightAnswer.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 50,
            nullable: false
        }),
        __metadata("design:type", String)
    ], RightAnswer.prototype, "value", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Question_1.Question; }, function (question) { return question.rightAnswer; }, { onDelete: "CASCADE" }),
        __metadata("design:type", Question_1.Question)
    ], RightAnswer.prototype, "question", void 0);
    RightAnswer = __decorate([
        (0, typeorm_1.Entity)()
    ], RightAnswer);
    return RightAnswer;
}());
exports.RightAnswer = RightAnswer;
//# sourceMappingURL=RightAnswer.js.map