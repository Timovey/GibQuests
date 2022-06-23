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
exports.Quest_User = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Quest_1 = require("./Quest");
var Quest_User = /** @class */ (function () {
    function Quest_User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Quest_User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: false
        }),
        __metadata("design:type", Number)
    ], Quest_User.prototype, "progress", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.quest_user; }, { onDelete: "CASCADE" }),
        __metadata("design:type", User_1.User)
    ], Quest_User.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Quest_1.Quest; }, function (quest) { return quest.quest_user; }, { onDelete: "CASCADE" }),
        __metadata("design:type", Quest_1.Quest)
    ], Quest_User.prototype, "quest", void 0);
    Quest_User = __decorate([
        (0, typeorm_1.Entity)()
    ], Quest_User);
    return Quest_User;
}());
exports.Quest_User = Quest_User;
//# sourceMappingURL=Quest_User.js.map