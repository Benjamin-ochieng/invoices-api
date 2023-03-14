"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var auth_1 = require("./modules/auth");
var middleware_1 = require("./modules/middleware");
var app = (0, express_1["default"])();
var operationalErrorHandler = function (err, req, res, next) {
    if (err.isOperational) {
        res.status(err.httpCode).json({ error: err });
    }
    else
        next(err);
};
app.use((0, cors_1["default"])());
app.use((0, morgan_1["default"])("dev"));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.json({ message: "Hello World!" });
});
app.use("/signup", [(0, middleware_1.validateInputs)("signup"), middleware_1.handleInputErrors], auth_1.signup);
app.use("/signin", [(0, middleware_1.validateInputs)("signin"), middleware_1.handleInputErrors], auth_1.signin);
app.use("/api", auth_1.protect, router_1["default"]);
app.use(operationalErrorHandler);
exports["default"] = app;
//# sourceMappingURL=server.js.map