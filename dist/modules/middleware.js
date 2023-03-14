"use strict";
exports.__esModule = true;
exports.handleInputErrors = exports.validateInputs = void 0;
var express_validator_1 = require("express-validator");
var validateInputs = function (method) {
    switch (method) {
        case "signup": {
            return [
                (0, express_validator_1.body)("userName", "Username is required").exists(),
                (0, express_validator_1.body)("password", "Password is required").exists(),
                (0, express_validator_1.body)("password", "Password must be at least 8 characters").isLength({
                    min: 8
                }),
            ];
        }
        case "signin": {
            return [
                (0, express_validator_1.body)("userName", "Username is required").isString().exists(),
                (0, express_validator_1.body)("password", "Password is required").isString().exists(),
            ];
        }
        case "resetPassword": {
            return [
                (0, express_validator_1.body)("password", "Password must be at least 8 characters")
                    .isLength({ min: 8 })
                    .isString()
                    .exists(),
            ];
        }
        case "updateMe": {
            return [
                (0, express_validator_1.body)("userName", "Username is required").optional().isString(),
                (0, express_validator_1.body)("password", "cannot change password from here!").not().exists(),
            ];
        }
        case "createClient": {
            return [
                (0, express_validator_1.body)("clientName", "Client name is required").exists(),
                (0, express_validator_1.body)("clientEmail", "Client email is required").exists().isEmail(),
            ];
        }
        case "updateOneClient": {
            return [
                (0, express_validator_1.body)("clientName", "Client name is required with at least 3 characters")
                    .optional()
                    .isString()
                    .isLength({ min: 3 }),
                (0, express_validator_1.body)("clientEmail", "A valid email address is required")
                    .optional()
                    .isEmail(),
                (0, express_validator_1.oneOf)([
                    (0, express_validator_1.body)("clientName", "Client name is required").isString(),
                    (0, express_validator_1.body)("clientEmail", "A valid email address is required").isEmail(),
                ], "Please provide either a client name or email"),
            ];
        }
    }
};
exports.validateInputs = validateInputs;
var handleInputErrors = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    var extractedErrors = [];
    errors.array().map(function (err) {
        var _a;
        return extractedErrors.push((_a = {}, _a[err.param] = err.msg, _a));
    });
    return res.status(422).json({ errors: extractedErrors });
};
exports.handleInputErrors = handleInputErrors;
//# sourceMappingURL=middleware.js.map