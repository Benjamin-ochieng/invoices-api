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
exports.deleteInvoice = exports.updateInvoice = exports.getOneInvoice = exports.getManyInvoices = exports.createInvoice = void 0;
var db_1 = __importDefault(require("../db"));
var createInvoice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizedUser, _a, invoiceAmount, invoiceTitle, clientId, invoice;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, db_1["default"].user.findFirst({
                    where: {
                        id: req.user.id,
                        clients: { some: { id: req.body.clientId } }
                    }
                })];
            case 1:
                authorizedUser = _b.sent();
                if (!authorizedUser) {
                    return [2 /*return*/, res.status(401).json({ error: "Unauthorized" })];
                }
                _a = req.body, invoiceAmount = _a.invoiceAmount, invoiceTitle = _a.invoiceTitle, clientId = _a.clientId;
                return [4 /*yield*/, db_1["default"].invoice.create({
                        data: {
                            invoiceAmount: invoiceAmount,
                            invoiceTitle: invoiceTitle,
                            clientId: clientId,
                            userId: req.user.id
                        }
                    })];
            case 2:
                invoice = _b.sent();
                res.status(201).json({ date: invoice });
                return [2 /*return*/];
        }
    });
}); };
exports.createInvoice = createInvoice;
var getManyInvoices = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, invoices;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1["default"].user.findUnique({
                    where: { id: req.user.id },
                    select: { invoices: true }
                })];
            case 1:
                user = _a.sent();
                invoices = user.invoices;
                res.status(200).json({ data: invoices });
                return [2 /*return*/];
        }
    });
}); };
exports.getManyInvoices = getManyInvoices;
var getOneInvoice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var invoice;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1["default"].invoice.findUnique({
                    where: {
                        id_userId: {
                            id: req.params.id,
                            userId: req.user.id
                        }
                    }
                })];
            case 1:
                invoice = _a.sent();
                if (!invoice) {
                    return [2 /*return*/, res.status(404).json({ error: "Invoice not found" })];
                }
                res.status(200).json({ data: invoice });
                return [2 /*return*/];
        }
    });
}); };
exports.getOneInvoice = getOneInvoice;
var updateInvoice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedInvoice;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1["default"].invoice.update({
                    where: {
                        id_userId: {
                            id: req.params.id,
                            userId: req.user.id
                        }
                    },
                    data: req.body
                })];
            case 1:
                updatedInvoice = _a.sent();
                res.status(200).json({ data: updatedInvoice });
                return [2 /*return*/];
        }
    });
}); };
exports.updateInvoice = updateInvoice;
var deleteInvoice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedInvoice;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1["default"].invoice["delete"]({
                    where: {
                        id_userId: {
                            id: req.params.id,
                            userId: req.user.id
                        }
                    }
                })];
            case 1:
                deletedInvoice = _a.sent();
                res.status(200).json({ data: deletedInvoice });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteInvoice = deleteInvoice;
//# sourceMappingURL=invoices.js.map