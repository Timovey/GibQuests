"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRoutes = exports.Route = void 0;
var controllers_1 = require("./controllers");
var Route = /** @class */ (function () {
    function Route(path, method, action) {
        this.path = path;
        this.method = method;
        this.action = action;
    }
    return Route;
}());
exports.Route = Route;
/**
 * All application routes.
 */
var AppRoutes = [
    {
        path: "/user",
        method: "get",
        action: controllers_1.user.get
    },
    {
        path: "/create",
        method: "post",
        action: controllers_1.quest.create
    },
    {
        path: "/register",
        method: "post",
        action: controllers_1.user.register
    },
    {
        path: "/auth",
        method: "post",
        action: controllers_1.user.auth
    },
    {
        path: "/processQuest",
        method: "post",
        action: controllers_1.quest.processQuest
    },
    {
        path: "/getProcessQuest",
        method: "get",
        action: controllers_1.quest.getProcessQuest
    },
    {
        path: "/trackQuest",
        method: "get",
        action: controllers_1.quest.trackQuest
    },
    {
        path: "/updateImage",
        method: "post",
        action: controllers_1.quest.updateImage
    },
    {
        path: "/getQuest",
        method: "get",
        action: controllers_1.quest.getQuest
    },
    {
        path: "/getQuests",
        method: "get",
        action: controllers_1.quest.getQuests
    },
    {
        path: "/deleteQuest",
        method: "delete",
        action: controllers_1.quest.deleteQuest
    },
    {
        path: "/getCreatedQuests",
        method: "get",
        action: controllers_1.quest.getCreatedQuests
    },
    {
        path: "/getImage",
        method: "get",
        action: controllers_1.quest.getImage
    },
    {
        path: "/getQr",
        method: "get",
        action: controllers_1.quest.getQR
    },
    {
        path: "/getCreatedQuest",
        method: "get",
        action: controllers_1.quest.getCreatedQuest
    },
];
function initRoutes(app) {
    AppRoutes.forEach(function (route) {
        app[route.method](route.path, function (request, response, next) {
            route
                .action(request, response)
                .then(function () { return next; })
                .catch(function (err) { return next(err); });
        });
    });
}
exports.initRoutes = initRoutes;
//# sourceMappingURL=routes.js.map