import { body, oneOf, validationResult } from "express-validator";
import { pipe } from "./utils";
import { ValidationError } from "./errors";

export const validateInputs = (method) => {
  switch (method) {
    case "signup": {
      return [
        body("userName", "Username is required").exists(),
        body("password", "Password is required").exists(),
        body("password", "Password must be at least 8 characters").isLength({
          min: 8,
        }),
      ];
    }
    case "signin": {
      return [
        body("userName", "Username is required").isString().exists(),
        body("password", "Password is required").isString().exists(),
        body("password", "Password must be at least 8 characters").isLength({
          min: 8,
        }),
        body("userName", "userName must be at least 2 characters").isLength({
          min: 2,
        }),
      ];
    }
    case "resetPassword": {
      return [
        body("password", "Password must be at least 8 characters")
          .isLength({ min: 8 })
          .isString()
          .exists(),
      ];
    }
    case "updateMe": {
      return [
        body("userName", "Username is required").optional().isString(),
        body("password", "cannot change password from here!").not().exists(),
      ];
    }
    case "createClient": {
      return [
        body("clientName", "Client name is required").exists(),
        body("clientEmail", "Client email is required").exists().isEmail(),
      ];
    }
    case "updateOneClient": {
      return [
        body("clientName", "Client name is required with at least 3 characters")
          .optional()
          .isString()
          .isLength({ min: 3 }),
        body("clientEmail", "A valid email address is required")
          .optional()
          .isEmail(),
        oneOf(
          [
            body("clientName", "Client name is required").isString(),
            body("clientEmail", "A valid email address is required").isEmail(),
          ],
          "Please provide either a client name or email"
        ),
      ];
    }
  }
};

export const handleInputErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  // return res.status(422).json({ errors: extractedErrors });
  return next(new ValidationError(extractedErrors));
  
};
