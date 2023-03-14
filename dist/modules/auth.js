"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.resetPassword = exports.protect = exports.signin = exports.signup = exports.verifyToken = exports.createJWT = exports.hashPassword = exports.comparePassword = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var db_1 = __importDefault(require("../db"));
var errors = __importStar(require("./errors"));
var utils_1 = require("./utils");
var comparePassword = function (password, hash) {
    return bcrypt_1["default"].compare(password, hash);
};
exports.comparePassword = comparePassword;
var hashPassword = function (password) { return bcrypt_1["default"].hash(password, 5); };
exports.hashPassword = hashPassword;
var createJWT = function (user) {
    var token = jsonwebtoken_1["default"].sign({ id: user.id, name: user.userName }, process.env.JWT_SECRET);
    return token;
};
exports.createJWT = createJWT;
var verifyToken = function (token) {
    return new Promise(function (resolve, reject) {
        jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET, function (err, payload) {
            if (err) {
                reject(err);
                return;
            }
            resolve(payload);
        });
    });
};
exports.verifyToken = verifyToken;
var signup = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hash, newUser, token, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, exports.hashPassword)(req.body.password)];
            case 1:
                hash = _a.sent();
                return [4 /*yield*/, db_1["default"].user
                        .create({
                        data: {
                            userName: req.body.userName,
                            password: hash
                        }
                    })["catch"](function (err) {
                        if (err.code === "P2002") {
                            throw new errors.ConflictError("userName");
                        }
                        else {
                            next(err);
                        }
                    })];
            case 2:
                newUser = _a.sent();
                token = (0, exports.createJWT)(newUser);
                res.json({ token: token });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.signup = signup;
var signin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, err, user, _b, err2, isValidUser, token;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, utils_1.tryToCatch)(db_1["default"].user.findUnique, {
                    where: { userName: req.body.userName }
                })];
            case 1:
                _a = _c.sent(), err = _a[0], user = _a[1];
                if (!user)
                    return [2 /*return*/, next(new errors.UnauthorizedError())];
                return [4 /*yield*/, (0, utils_1.tryToCatch)(exports.comparePassword, req.body.password, user.password)];
            case 2:
                _b = _c.sent(), err2 = _b[0], isValidUser = _b[1];
                if (!isValidUser)
                    return [2 /*return*/, next(new errors.UnauthorizedError())];
                token = (0, exports.createJWT)(user);
                res.json({ token: token });
                return [2 /*return*/];
        }
    });
}); };
exports.signin = signin;
var protect = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var bearer, _a, token, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                bearer = req.headers.authorization;
                if (!bearer) {
                    return [2 /*return*/, res.status(401).json({ error: "Unauthorized" }).end()];
                }
                _a = bearer.split(" "), token = _a[1];
                if (!bearer) {
                    return [2 /*return*/, res.status(401).json({ error: "Unauthorized" }).end()];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, exports.verifyToken)(token)];
            case 2:
                user = _b.sent();
                req.user = user;
                next();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(401).json({ error: "Unauthorized" }).end()];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.protect = protect;
var resetPassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hash, updatedUser, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, exports.hashPassword)(req.body.password)];
            case 1:
                hash = _a.sent();
                return [4 /*yield*/, db_1["default"].user.update({
                        where: {
                            id: req.user.id
                        },
                        data: {
                            password: hash
                        },
                        select: {
                            userName: true,
                            updatedAt: true
                        }
                    })];
            case 2:
                updatedUser = _a.sent();
                res.json({ data: updatedUser });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.resetPassword = resetPassword;
//# sourceMappingURL=auth.js.map