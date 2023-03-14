export declare enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
    CONFLICT = 409,
    UNAUTHORIZED = 401
}
export declare class BaseError extends Error {
    readonly name: string;
    readonly httpCode: HttpStatusCode;
    readonly description: string;
    readonly isOperational: boolean;
    constructor(name: string, httpCode: HttpStatusCode, description: string, isOperational: boolean);
}
export declare class ConflictError extends BaseError {
    constructor(entity_name: string);
}
export declare class UnauthorizedError extends BaseError {
    constructor();
}
