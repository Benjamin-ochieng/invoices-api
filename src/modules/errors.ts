import merge from "lodash.merge";

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  CONFLICT = 409,
  UNAUTHORIZED = 401,
  UNPROCESSABLE_ENTITY = 422,
}



export class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;
  public readonly description: string;
  public readonly isOperational: boolean;

  constructor(
    name: string,
    httpCode: HttpStatusCode,
    description: string,
    isOperational: boolean
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.description = description;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

export class ConflictError extends BaseError {
  constructor(entity_name: string) {
    super(
      "Conflict",
      HttpStatusCode.CONFLICT,
      ` The specified ${entity_name} value is already in use`,
      true
    );
  }
}

export class UnauthorizedError extends BaseError {
  constructor() {
    super(
      "Unauthorized",
      HttpStatusCode.UNAUTHORIZED,
      "Incorrect email password combination",
      true
    );
  }
}


export class ValidationError extends BaseError {
  //TODO: add a type for the options in the constructor
  constructor(options) {
    merge(
      super(
        "Validation",
        HttpStatusCode.UNPROCESSABLE_ENTITY,
        "The request failed validation.",
        true
      ),
      options
    );
  }
}