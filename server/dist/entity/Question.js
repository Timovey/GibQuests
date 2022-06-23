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
exports.Question = exports.QuestionEnumArray = void 0;
var typeorm_1 = require("typeorm");
var Stage_Test_1 = require("./Stage_Test");
exports.QuestionEnumArray = ['Множественный выбор', 'Выбор', 'Вписать ответ', 'Расположить по порядку'];
var Question = /** @class */ (function () {
    function Question() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Question.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: false
        }),
        __metadata("design:type", Number)
    ], Question.prototype, "number", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 50,
            nullable: false
        }),
        __metadata("design:type", String)
    ], Question.prototype, "contain", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: exports.QuestionEnumArray,
            default: 'Выбор',
            nullable: false
        }),
        __metadata("design:type", String)
    ], Question.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Stage_Test_1.Stage_Test; }, function (stageTest) { return stageTest.questions; }, { onDelete: "CASCADE" }),
        __metadata("design:type", Stage_Test_1.Stage_Test
        // @OneToMany(() => Answer, (answer) => answer.question, {cascade: true})
        // answer: Answer
        // @OneToMany(() => RightAnswer, (rightAnswer) => rightAnswer.question, {cascade: true})
        // rightAnswer: RightAnswer
        )
    ], Question.prototype, "stageTest", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", array: true }),
        __metadata("design:type", Object)
    ], Question.prototype, "answers", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", array: true }),
        __metadata("design:type", Object)
    ], Question.prototype, "rightAnswer", void 0);
    Question = __decorate([
        (0, typeorm_1.Entity)()
    ], Question);
    return Question;
}());
exports.Question = Question;
//# sourceMappingURL=Question.js.map