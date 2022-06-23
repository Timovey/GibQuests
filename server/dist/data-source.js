"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.Entities = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
var Quest_1 = require("./entity/Quest");
var Stage_Action_1 = require("./entity/Stage_Action");
var Stage_1 = require("./entity/Stage");
var Quest_User_1 = require("./entity/Quest_User");
var Stage_Test_1 = require("./entity/Stage_Test");
var Question_1 = require("./entity/Question");
exports.Entities = [User_1.User, Quest_1.Quest, Stage_Action_1.Stage_Action, Stage_1.Stage, Quest_User_1.Quest_User, Stage_Test_1.Stage_Test, Question_1.Question];
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "davidavi",
    database: "quests",
    synchronize: true,
    logging: false,
    entities: exports.Entities,
    migrations: ["migration/*js"],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map