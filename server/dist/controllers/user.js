"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.register = exports.get = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var dto_1 = require("./dto");
var error_1 = require("../error");
var user_1 = require("../service/user");
var utils_1 = require("./utils");
var jwt = require("jsonwebtoken");
var config = require("config");
var secret = config.get("secret");
var durationSecret = config.get("durationSecret");
function createToken(user) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, jwt.sign({ username: user.username, password: user.password }, secret, { expiresIn: durationSecret })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getUserByDecoded(decoded) {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, user_1.UserService.getUser(decoded.username, decoded.password)];
                case 1:
                    user = _b.sent();
                    _a = user;
                    return [4 /*yield*/, createToken(user)];
                case 2:
                    _a.token = _b.sent();
                    return [2 /*return*/, user];
            }
        });
    });
}
function get(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var username, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!request.query.username) {
                        response.json((0, utils_1.error)('Введите query параметр username'));
                        return [2 /*return*/];
                    }
                    username = request.query.username;
                    return [4 /*yield*/, user_1.UserService.get(username)];
                case 1:
                    res = _a.sent();
                    res ? response.json((0, utils_1.ok)(res)) : response.json((0, utils_1.error)('Не существует пользователя с данным username'));
                    return [2 /*return*/];
            }
        });
    });
}
exports.get = get;
function register(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var user, errors, res, token, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = (0, class_transformer_1.plainToClass)(dto_1.UserDto, request.body);
                    return [4 /*yield*/, (0, class_validator_1.validate)(user, { skipMissingProperties: true })];
                case 1:
                    errors = _a.sent();
                    if (errors.length) {
                        throw new error_1.ArgumentError();
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, user_1.UserService.add(user.name, user.password, user.surname, user.username)];
                case 3:
                    res = _a.sent();
                    return [4 /*yield*/, createToken(user)];
                case 4:
                    token = _a.sent();
                    res.token = token;
                    response.json((0, utils_1.ok)(res));
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    response.json((0, utils_1.error)(e_1.message));
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.register = register;
function auth(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var user, errors, res, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = (0, class_transformer_1.plainToClass)(dto_1.UserDto, request.body);
                    return [4 /*yield*/, (0, class_validator_1.validate)(user, { skipMissingProperties: true })];
                case 1:
                    errors = _a.sent();
                    if (!errors.length) return [3 /*break*/, 2];
                    throw new error_1.ArgumentError();
                case 2:
                    if (!!user.token) return [3 /*break*/, 7];
                    return [4 /*yield*/, user_1.UserService.getUser(user.username, user.password)];
                case 3:
                    res = _a.sent();
                    if (!!res) return [3 /*break*/, 4];
                    response.json((0, utils_1.error)('Такого пользователя нет'));
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, createToken(user)];
                case 5:
                    token = _a.sent();
                    res.token = token;
                    response.json((0, utils_1.ok)(res));
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    jwt.verify(user.token, secret, function (err, decoded) {
                        return __awaiter(this, void 0, void 0, function () {
                            var res;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!err) return [3 /*break*/, 1];
                                        response.json((0, utils_1.error)(err));
                                        return [3 /*break*/, 3];
                                    case 1: return [4 /*yield*/, getUserByDecoded(decoded)];
                                    case 2:
                                        res = _a.sent();
                                        response.json((0, utils_1.ok)(res));
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        });
                    });
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.auth = auth;
//# sourceMappingURL=user.js.map