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
exports.Quest = void 0;
var typeorm_1 = require("typeorm");
var Quest_User_1 = require("./Quest_User");
var Stage_1 = require("./Stage");
var User_1 = require("./User");
var Quest = /** @class */ (function () {
    function Quest() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Quest.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 50,
            nullable: false
        }),
        __metadata("design:type", String)
    ], Quest.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "text",
            nullable: false
        }),
        __metadata("design:type", String)
    ], Quest.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "text",
            nullable: true
        }),
        __metadata("design:type", String)
    ], Quest.prototype, "image", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Quest_User_1.Quest_User; }, function (quest_User) { return quest_User.quest; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Quest.prototype, "quest_user", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Stage_1.Stage; }, function (stage) { return stage.quest; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Quest.prototype, "stages", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.quests; }),
        __metadata("design:type", User_1.User)
    ], Quest.prototype, "author", void 0);
    Quest = __decorate([
        (0, typeorm_1.Entity)()
    ], Quest);
    return Quest;
}());
exports.Quest = Quest;
//# sourceMappingURL=Quest.js.map