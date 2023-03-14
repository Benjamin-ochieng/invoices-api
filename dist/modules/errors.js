"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.UnauthorizedError = exports.ConflictError = exports.BaseError = exports.HttpStatusCode = void 0;
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["OK"] = 200] = "OK";
    HttpStatusCode[HttpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatusCode[HttpStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatusCode[HttpStatusCode["INTERNAL_SERVER"] = 500] = "INTERNAL_SERVER";
    HttpStatusCode[HttpStatusCode["CONFLICT"] = 409] = "CONFLICT";
    HttpStatusCode[HttpStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
})(HttpStatusCode = exports.HttpStatusCode || (exports.HttpStatusCode = {}));
var BaseError = /** @class */ (function (_super) {
    __extends(BaseError, _super);
    function BaseError(name, httpCode, description, isOperational) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, description) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = name;
        _this.httpCode = httpCode;
        _this.description = description;
        _this.isOperational = isOperational;
        Error.captureStackTrace(_this);
        return _this;
    }
    return BaseError;
}(Error));
exports.BaseError = BaseError;
var ConflictError = /** @class */ (function (_super) {
    __extends(ConflictError, _super);
    function ConflictError(entity_name) {
        return _super.call(this, "Conflict", HttpStatusCode.CONFLICT, " The specified ".concat(entity_name, " value is already in use"), true) || this;
    }
    return ConflictError;
}(BaseError));
exports.ConflictError = ConflictError;
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError() {
        return _super.call(this, "Unauthorized", HttpStatusCode.UNAUTHORIZED, "Incorrect email password combination", true) || this;
    }
    return UnauthorizedError;
}(BaseError));
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=errors.js.map